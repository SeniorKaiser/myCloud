from pydantic import BaseModel

class Token(BaseModel):
    access_token: str | None = None
    refresh_token: str | None = None
    type: str = "Bearer"