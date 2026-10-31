from pydantic import BaseModel
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
  title: str

class NotificationResponse(NotificationBase):
  id: int
  created_at: datetime