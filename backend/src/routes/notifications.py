from typing import Annotated
from datetime import datetime, UTC
from fastapi import APIRouter, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from src.schemas.notification import NotificationResponse, NotificationBase
from src.infrastructure.database import get_db
import src.infrastructure.models as models

router=APIRouter()

@router.post("/", response_model=NotificationResponse, status_code=status.HTTP_201_CREATED)
async def create_notification(notification: NotificationBase, db: Annotated[AsyncSession, Depends(get_db)]):
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