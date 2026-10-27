from __future__ import annotations
from datetime import UTC, datetime

from sqlalchemy import Enum, ForeignKey, String, Boolean, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.infrastructure.database import Base

import enum

class Channel(str, enum.Enum):
    SMS = "SMS"
    PUSH = "PUSH"
    EMAIL = "EMAIL"

class Notification(Base):
  __tablename__ = "notifications"

  id: Mapped[int] = mapped_column(Integer, primary_key=True)
  title: Mapped[str] = mapped_column(String(50), nullable=False)
  content: Mapped[str] = mapped_column(String(200), nullable=False)
  channel: Mapped[Channel] = mapped_column(
      Enum(
          Channel,
          name="channel"
      ),
      nullable=False,
  )
  sender: Mapped[str] = mapped_column(
      ForeignKey("users.username", onupdate="CASCADE"),
      nullable=False,
  )
  recipient: Mapped[str] = mapped_column(
      ForeignKey("users.username", onupdate="CASCADE"),
      nullable=False,
  )
  created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.now(UTC))


class User(Base):
  __tablename__ = "users"

  id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
  username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
  first_name: Mapped[str] = mapped_column(String(50), nullable=False)
  last_name: Mapped[str] = mapped_column(String(50), nullable=False)
  country_code: Mapped[str] = mapped_column(String(3), nullable=False)
  phone: Mapped[str] = mapped_column(String(10), nullable=False, unique=True)
  email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
  password: Mapped[str] = mapped_column(String(200), nullable=False)
  sent: Mapped[list[Notification]] = relationship(
      foreign_keys=[Notification.sender],
  )
  received: Mapped[list[Notification]] = relationship(
      foreign_keys=[Notification.recipient],
  )