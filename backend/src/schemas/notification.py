from pydantic import BaseModel, EmailStr
from datetime import datetime
from enum import Enum

class ChannelEnum(str, Enum):
  SMS ='SMS'
  PUSH = 'PUSH'
  EMAIL = 'EMAIL'

class NotificationBase(BaseModel):
  content: str
  channel: ChannelEnum
  sender: str
  recipient: str
  title: str | None = None

class NotificationResponse(NotificationBase):
  id: int
  created_at: datetime

class NotificationUserData(BaseModel):
  username: str
  email: EmailStr
  country_code: str
  phone: str

class NotificationToBeSent(BaseModel):
  content: str
  channel: ChannelEnum
  sender: NotificationUserData
  recipient: NotificationUserData
  title: str | None = None
  token: str | None = None

class PushToken(BaseModel):
  token: str
  userId: str