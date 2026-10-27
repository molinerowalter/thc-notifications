from pydantic import BaseModel

class UserToRegister(BaseModel):
  first_name: str
  last_name: str
  email: str
  username: str
  country_code: str
  phone: str
  password: str
