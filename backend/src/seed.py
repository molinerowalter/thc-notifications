import asyncio
from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.auth import hash_password
from src.infrastructure import models
from src.infrastructure.database import AsyncSessionLocal

async def seed(session: AsyncSession) -> None:
  existing = await session.scalar(
    select(models.User).where(models.User.username == "ada")
  )
  if existing is not None:
    return

  password = hash_password("secret!")
  session.add_all([
    models.User(
      username="ada",
      email="ada@example.com",
      first_name="Ada",
      last_name="Lovelace",
      country_code="+54",
      phone="1111111111",
      hashed_password=password,
    ),
    models.User(
      username="grace",
      email="grace@example.com",
      first_name="Grace",
      last_name="Hopper",
      country_code="+54",
      phone="2222222222",
      hashed_password=password,
    ),
  ])
  await session.flush()
  session.add_all([
    models.Firebase(userId="ada", token="ada-token"),
    models.Firebase(userId="grace", token="grace-token"),
    models.Notification(
      title="Hello",
      content="A seeded message",
      channel=models.Channel.EMAIL,
      sender="ada",
      recipient="grace",
      created_at=datetime.now(UTC),
    ),
  ])
  await session.flush()


async def main() -> None:
  async with AsyncSessionLocal() as session:
    await seed(session)
    await session.commit()


if __name__ == "__main__":
  asyncio.run(main())
