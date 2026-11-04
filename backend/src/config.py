from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  model_config = SettingsConfigDict(
    env_file='.env',
    env_file_encoding='utf-8'
  )

  frontend_url: str
  database_url: str

  secret_key: SecretStr
  algorithm: str = 'HS256'
  access_token_expire_minutes: int = 30

  mail_server: str = "localhost"
  mail_port: int = 587
  mail_username: str = "user"
  mail_password: SecretStr = SecretStr("password")
  mail_use_tls: bool = True
  mail_from: str = "noreply@localhost"

  twilio_account_sid: str
  twilio_auth_token: str
  twilio_country_code: str
  twilio_phone: str

settings = Settings()