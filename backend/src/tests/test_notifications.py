import pytest


async def _fake_send(notification):
  return None


@pytest.mark.asyncio
async def test_missing_recipient_returns_404(client):
  response = await client.post("/api/notifications/", json={
    "content": "hello",
    "channel": "EMAIL",
    "sender": "ada",
    "recipient": "nobody",
    "title": "Missing",
  })

  assert response.status_code == 404


@pytest.mark.asyncio
async def test_save_push_token_and_reject_a_second_one(client):
  created = await client.post("/api/notifications/push-token", json={
    "userId": "new.user",
    "token": "new-token",
  })
  duplicate = await client.post("/api/notifications/push-token", json={
    "userId": "grace",
    "token": "another-token",
  })

  assert created.status_code == 201
  assert created.json()["userId"] == "new.user"
  assert duplicate.status_code == 303


@pytest.mark.asyncio
async def test_create_push_notification(client, monkeypatch):
  monkeypatch.setattr(
    "src.routes.notifications.NotificationServiceFactory.send",
    _fake_send,
  )

  response = await client.post("/api/notifications/", json={
    "content": "hello by push",
    "channel": "PUSH",
    "sender": "ada",
    "recipient": "grace",
    "title": "Ping",
  })

  assert response.status_code == 201
  assert response.json()["channel"] == "PUSH"
