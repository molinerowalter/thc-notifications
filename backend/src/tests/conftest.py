import asyncio
import re
import selectors
import sys
from collections.abc import AsyncIterator

import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy import text
from sqlalchemy.engine.url import make_url
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine

from src.config import settings
from src.infrastructure import models  # noqa: F401
from src.infrastructure.database import (
  Base,
  get_db,
  resolved_testing_database_url,
  testing_engine,
)
from src.main import app as fastapi_app
from src.seed import seed

_DATABASE_NAME = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")


def pytest_asyncio_loop_factories(config, item):
  def factory():
    if sys.platform == "win32":
      return asyncio.SelectorEventLoop(selectors.SelectSelector())
    return asyncio.new_event_loop()

  return {"selector": factory}


def _database_name() -> str:
  name = make_url(resolved_testing_database_url).database
  if not name or not _DATABASE_NAME.fullmatch(name):
    pytest.exit("TESTING_DATABASE_URL has an invalid database name", returncode=1)
  return name


def _admin_url() -> str:
  return (
    make_url(settings.testing_database_url)
    .set(database="postgres")
    .render_as_string(hide_password=False)
  )


async def _admin_execute(statement: str) -> None:
  admin_engine = create_async_engine(
    _admin_url(),
    isolation_level="AUTOCOMMIT",
    connect_args={"connect_timeout": 5},
  )
  try:
    async with admin_engine.connect() as connection:
      await connection.execute(text(statement))
  finally:
    await admin_engine.dispose()


@pytest.fixture(scope="session")
async def test_database():
  name = _database_name()
  await _admin_execute(f'DROP DATABASE IF EXISTS "{name}" WITH (FORCE)')
  await _admin_execute(f'CREATE DATABASE "{name}"')
  async with testing_engine.begin() as connection:
    await connection.run_sync(Base.metadata.create_all)

  yield

  await testing_engine.dispose()
  await _admin_execute(f'DROP DATABASE IF EXISTS "{name}" WITH (FORCE)')


@pytest.fixture
async def db_session(test_database) -> AsyncIterator[AsyncSession]:
  async with testing_engine.connect() as connection:
    transaction = await connection.begin()
    session = AsyncSession(
      bind=connection,
      expire_on_commit=False,
      join_transaction_mode="create_savepoint",
    )

    async def override_get_db() -> AsyncIterator[AsyncSession]:
      yield session

    fastapi_app.dependency_overrides[get_db] = override_get_db
    try:
      await seed(session)
      await session.commit()
      yield session
    finally:
      fastapi_app.dependency_overrides.pop(get_db, None)
      await session.close()
      await transaction.rollback()


@pytest.fixture
async def client(db_session) -> AsyncIterator[AsyncClient]:
  transport = ASGITransport(app=fastapi_app)
  async with AsyncClient(transport=transport, base_url="http://test") as http_client:
    yield http_client
