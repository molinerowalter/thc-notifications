from typing import Annotated
from datetime import datetime, UTC
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from src.schemas.notification import NotificationResponse, NotificationBase, NotificationUserData, NotificationToBeSent, PushToken
from src.infrastructure.database import get_db
import src.infrastructure.models as models

from src.services.notifications import NotificationServiceFactory

router=APIRouter()

@router.post("/", response_model=NotificationResponse, status_code=status.HTTP_201_CREATED)
async def create_notification(notification: NotificationBase, db: Annotated[AsyncSession, Depends(get_db)]):
  sender_response = await db.execute(select(models.User).where(models.User.username == notification.sender))
  recipient_response= await db.execute(select(models.User).where(models.User.username == notification.recipient))

  sender = sender_response.scalar_one_or_none()
  recipient = recipient_response.scalar_one_or_none()

  if not recipient:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Recipient '{notification.recipient}' not found")

  push_token_result = await db.execute(select(models.Firebase).where(func.lower(models.Firebase.userId) == recipient.username)) if notification.channel == "PUSH" else None
  push_token = push_token_result.scalar_one_or_none()

  if push_token is None and notification.channel == "PUSH":
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipient's Push notifications token is missing")


  sender_data = NotificationUserData(
    username=sender.username,
    email=sender.email,
    country_code=sender.country_code,
    phone=sender.phone,
  )

  recipient_data = NotificationUserData(
    username=recipient.username,
    email=recipient.email,
    country_code=recipient.country_code,
    phone=recipient.phone,
  )

  notification_to_send = NotificationToBeSent(
    title=getattr(notification, "title", None),
    content=notification.content,
    channel=notification.channel,
    sender=sender_data,
    recipient=recipient_data,
    token=push_token.token
  )

  try:
    await NotificationServiceFactory.send(notification_to_send);
    new_notification = models.Notification(
      title= getattr(notification, "title", None),
      channel= notification.channel,
      content= notification.content,
      sender= notification.sender,
      recipient= notification.recipient,
      created_at=datetime.now(UTC)
    )
  
    db.add(new_notification)
    await db.commit()
    await db.refresh(new_notification)
  
    return new_notification
  except Exception as e:
    status_code = getattr(e, 'status_code', status.HTTP_500_INTERNAL_SERVER_ERROR)
    detail = getattr(e, 'detail', str(e))
    raise HTTPException(status_code=status_code, detail=detail)

@router.post("/push-token", response_model=PushToken, status_code=status.HTTP_201_CREATED)
async def save_push_token(user: PushToken, db: Annotated[AsyncSession, Depends(get_db)]):
  result = await db.execute(select(models.Firebase).where(func.lower(models.Firebase.userId) == user.userId ))
  found_user = result.scalar_one_or_none()

  if (found_user is not None):
    raise HTTPException(status_code=status.HTTP_303_SEE_OTHER, detail="User already has a token")

  certificate = models.Firebase(
    userId= user.userId,
    token= user.token
  )

  db.add(certificate)
  await db.commit()
  await db.refresh(certificate)

  return certificate

  