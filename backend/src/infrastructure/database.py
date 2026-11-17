from sqlalchemy.engine.url import make_url
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase
from src.config import settings

TEST_DATABASE_NAME = "notifications_test"

engine = create_async_engine(
  settings.database_url
)

AsyncSessionLocal = async_sessionmaker(
  engine,
  class_=AsyncSession,
  expire_on_commit=False,
)

class Base(DeclarativeBase):
  pass

async def get_db():
  async with AsyncSessionLocal() as session:
    yield session


def resolve_testing_database_url() -> str:
  url = make_url(settings.testing_database_url)
  if url.database in (None, "", "postgres"):
    url = url.set(database=TEST_DATABASE_NAME)
  return url.render_as_string(hide_password=False)

resolved_testing_database_url = resolve_testing_database_url()
testing_engine = create_async_engine(
  resolved_testing_database_url,
  connect_args={"connect_timeout": 5},
)
TestingSessionLocal = async_sessionmaker(
  testing_engine,
  class_=AsyncSession,
  expire_on_commit=False,
)

async def get_testing_db():
  async with TestingSessionLocal() as session:
    yield session