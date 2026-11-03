from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime, timedelta
from typing import Annotated, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select, func

from src.schemas.user import UserToRegister, UserPrivate, Token, CreatedUser, UserCredentials
from src.infrastructure.database import get_db
from src.auth import hash_password, verify_password, create_access_token
from src.config import settings
import src.infrastructure.models as models

router = APIRouter()

def user_with_notifications():
  return select(models.User).options(
    selectinload(models.User.sent),
    selectinload(models.User.received),
  )

@router.post("/", response_model=CreatedUser, status_code=status.HTTP_201_CREATED)
async def create_user(user:UserToRegister, db:Annotated[AsyncSession, Depends(get_db)]):
  #check user existence
  current_user = (
    await db.execute(select(models.User).where(func.lower(models.User.email) == user.email.lower() or models.User.username == user.username))
  ).scalar_one_or_none()
  
  if current_user is not None:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

  new_user = models.User(
    username=user.username,
    email=user.email.lower(),
    first_name=user.first_name,
    last_name=user.last_name,
    country_code=user.country_code,
    phone=user.phone,
    hashed_password=hash_password(user.password)  
  )
  
  db.add(new_user)
  await db.commit()
  await db.refresh(new_user)
  return new_user

@router.post("/signin", response_model=Token)
async def signin(user_sign: UserCredentials, db:Annotated[AsyncSession, Depends(get_db)]) -> UserPrivate:
  current_user = (await db.execute(select(models.User).where(models.User.username == user_sign.username))).scalar_one_or_none()
  valid_password = verify_password(current_user.hashed_password, user_sign.password)
  if (current_user is None or not valid_password):
    raise HTTPException(status_code=status.HTTP_401_NOT_FOUND, detail="Please check your username and password and try again", headers={"WWW-Authenticate": "Bearer"})
  access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
  access_token = create_access_token(data={"sub": str(current_user.username)}, expires_delta=access_token_expires)
  
  return Token(access_token=access_token, token_type="bearer")

@router.get("/", response_model=List[UserPrivate])
async def agenda(db: Annotated[AsyncSession, Depends(get_db)]):
  result = await db.execute(user_with_notifications()) 

  return result.scalars().all()

@router.get("/{username}", response_model=UserPrivate)
async def get_user(username: str, db: Annotated[AsyncSession, Depends(get_db)]):
  result = await db.execute(user_with_notifications().where(func.lower(models.User.username) == username.lower()))

  user_search = result.scalars().one_or_none()

  if (user_search is None): 
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

  return user_search