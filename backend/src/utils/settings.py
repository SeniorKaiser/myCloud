from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    COOKIES_KEY_ACCESS: str
    COOKIES_KEY_REFRESH: str
    ACCESS_KEY_S3: str
    SECRET_KEY_S3: str
    # DB_USER: str
    # DB_PASS: str
    # DB_HOST: str
    # DB_PORT: str
    # DB_NAME: str

    model_config = SettingsConfigDict(
        env_file=".env"
    )

settings = Settings()