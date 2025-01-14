from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    COOKEY_KEY_ACCESS: str
    COOKEY_KEY_REFRESH: str
    ACCESS_KEY_S3: str
    SECRET_KEY_S3: str

    model_config = SettingsConfigDict(
        env_file=Path("/root/myCloud/.env")
    )

settings = Settings()