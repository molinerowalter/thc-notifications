from pydantic import BaseModel, EmailStr, ConfigDict
from typing import List
from src.schemas.notification import NotificationResponse

class UserBase(BaseModel):
  email: EmailStr

class UserCredentials(BaseModel):
  username: str
  password: str

class UserPublic(UserBase):
  first_name: str
  last_name: str
  username: str

class UserToRegister(UserPublic):
  country_code: str
  phone: str
  password: str

class CreatedUser(UserPublic):
  model_config = ConfigDict(from_attributes=True)

  country_code: str
  phone: str
  hashed_password: str

class UserPrivate(UserPublic):
  model_config = ConfigDict(from_attributes=True)
  
  country_code: str
  phone: str
  sent: List[NotificationResponse]
  received: List[NotificationResponse]

class Token(BaseModel):
  access_token: str
  token_type: str
