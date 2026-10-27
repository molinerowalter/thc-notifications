from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy import select

from pydantic import EmailStr
from src.schemas.user import UserToRegister
from src.infrastructure.database import get_db
import src.infrastructure.models as models
import hashlib

router = APIRouter()

def user_with_notifications():
  return select(models.User).options(
    selectinload(models.User.sent),
    selectinload(models.User.received),
  )

@router.post("/", response_model=UserToRegister, status_code=status.HTTP_201_CREATED)
async def create_user(user:UserToRegister, db:Annotated[AsyncSession, Depends(get_db)]):
  #check user existence
  current_user = (
    await db.execute(select(models.User).where(models.User.email == user.email or models.User.username == user.username))
  ).scalar_one_or_none()
  
  if current_user is not None:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

  new_user = models.User(
    username=user.username,
    email=user.email,
    first_name=user.first_name,
    last_name=user.last_name,
    country_code=user.country_code,
    phone=user.phone,
    password=user.password
  )
  
  db.add(new_user)
  await db.commit()
  await db.refresh(new_user)
  return new_user
