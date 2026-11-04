from abc import ABC, abstractmethod

from fastapi import HTTPException, status
from src.schemas.notification import NotificationToBeSent

from src.config import settings

import aiosmtplib
from email.message import EmailMessage

from firebase_admin import messaging

from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

class NotificationService(ABC):
  @abstractmethod
  async def send_notification(self, notification: NotificationToBeSent) -> None:
    pass

class SMSNotificationService(NotificationService):
  async def send_notification(self, notification: NotificationToBeSent) -> None:
    if notification.content and len(notification.content) > 160:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="SMS content exceeds 160 characters")
    client = Client(settings.twilio_account_sid, settings.twilio_auth_token)
    try:
        message = client.messages.create(
            body="sms_appointment_reminders",
            from_=f"{settings.twilio_country_code}{settings.twilio_phone}",
            to="+542235457610"
        )
        return {"status": "success", "sid": message.sid}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

class EmailNotificationService(NotificationService):
  async def send_notification(self, notification: NotificationToBeSent) -> None:
    message = EmailMessage()
    message['Subject'] = notification.title
    message['From'] = notification.sender.email
    message['To'] = notification.recipient.email
    message.set_content(notification.content)
    await aiosmtplib.send(
      message,
      hostname=settings.mail_server,
      port=settings.mail_port,
      username=settings.mail_username,
      password=settings.mail_password.get_secret_value(),
      start_tls=True,
    )

class PushNotificationService(NotificationService):
  async def send_notification(self, notification: NotificationToBeSent) -> None:
    try:
      message = messaging.Message(
        notification=messaging.Notification(title=notification.title, body=notification.content),
        token=notification.token
      )
      messaging.send(message)
      return {"status": "Enviado exitosamente"}
    except:
      raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error Sending PUSH")
    

class NotificationServiceFactory:
  factory = dict[str, NotificationService]()

  async def send(notification: NotificationToBeSent) -> None:
    if notification.channel not in NotificationServiceFactory.factory:
      if notification.channel == "SMS":
        NotificationServiceFactory.factory[notification.channel] = SMSNotificationService()
      elif notification.channel == "EMAIL":
        NotificationServiceFactory.factory[notification.channel] = EmailNotificationService()
      elif notification.channel == "PUSH":
        NotificationServiceFactory.factory[notification.channel] = PushNotificationService()
      else:
        raise ValueError(f"Unsupported notification type: {notification.channel}")

    service = NotificationServiceFactory.factory[notification.channel]
    await service.send_notification(notification)