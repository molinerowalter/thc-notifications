import pytest
from fastapi import status

NEW_USER = {
  "email": "new@example.com",
  "first_name": "New",
  "last_name": "User",
  "username": "new.user",
  "country_code": "+54",
  "phone": "3333333333",
  "password": "secret!",
}


@pytest.mark.asyncio
async def test_create_user(client):
  response = await client.post("/api/users/", json=NEW_USER)

  assert response.status_code == status.HTTP_201_CREATED
  body = response.json()
  assert body["username"] == NEW_USER["username"]
  assert body["email"] == NEW_USER["email"]
  assert "hashed_password" in body


@pytest.mark.asyncio
async def test_duplicate_user_is_rejected(client):
  response = await client.post("/api/users/", json={
    **NEW_USER,
    "email": "ada@example.com",
    "username": "someone.else",
    "phone": "4444444444",
  })

  assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.asyncio
async def test_signin_returns_a_token(client):
  response = await client.post("/api/users/signin", json={
    "username": "ada",
    "password": "secret!",
  })

  assert response.status_code == 200
  assert response.json()["access_token"]
  assert response.json()["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_signin_rejects_unknown_user_and_wrong_password(client):
  unknown = await client.post("/api/users/signin", json={
    "username": "nobody",
    "password": "secret!",
  })
  wrong_password = await client.post("/api/users/signin", json={
    "username": "ada",
    "password": "wrong!",
  })

  assert unknown.status_code == 401
  assert wrong_password.status_code == 401


@pytest.mark.asyncio
async def test_list_and_get_user(client):
  listed = await client.get("/api/users/")
  fetched = await client.get("/api/users/ada")
  missing = await client.get("/api/users/nobody")

  assert listed.status_code == 200
  assert {user["username"] for user in listed.json()} >= {"ada", "grace"}
  assert fetched.status_code == 200
  assert fetched.json()["sent"][0]["recipient"] == "grace"
  assert missing.status_code == 404


@pytest.mark.asyncio
async def test_created_user_does_not_leak_to_the_next_test(client):
  response = await client.get("/api/users/new.user")

  assert response.status_code == 404
