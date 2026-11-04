from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.exception_handlers import (
   http_exception_handler,
   request_validation_exception_handler
)
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from contextlib import asynccontextmanager

from src.routes import users, notifications
from src.schemas.user import UserToRegister 
from src.infrastructure.database import engine
from src.config import settings

import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate("firebase-admin-sdk.json")
firebase_admin.initialize_app(cred)


app = FastAPI()

# Configura los orígenes que tienen permiso para hablar con tu backend
origins = [settings.frontend_url, "http://127.0.0.1:5173"]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,  # O usa ["*"] para permitir cualquier origen en desarrollo
  allow_credentials=True,
  allow_methods=["*"],  # Permite todos los métodos (GET, POST, OPTIONS, etc.)
  allow_headers=["*"],  # Permite todos los headers
)

app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["notifications"])

@asynccontextmanager
async def lifespan(app: FastAPI):
  yield
  await engine.dispose()

@app.exception_handler(HTTPException)
async def general_http_exception_handler(
  request: Request,
  exception: HTTPException,
):
  if request.url.path.startswith("/api"):
    return await http_exception_handler(request, exception)

  message = (
    exception.detail
    if exception.detail
    else "An error occurred. Please check your request and try again."
  )

  raise HTTPException(status_code=exception.status_code, detail=message)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exception: RequestValidationError):
  if request.url.path.startswith("/api"):
    return await request_validation_exception_handler(request, exception)
  raise HTTPException(
    status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
    detail="Invalid Request. Please check your input and try again.",
  )