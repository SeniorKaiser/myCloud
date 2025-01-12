from fastapi import HTTPException
from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from src.dto.User import User
from src.dto.Token import Token
from src.utils.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

async def create_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def generate_tokens(user: User) -> Token:
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    access_token = await create_token({"id": user.id}, expires_delta=access_token_expires)
    refresh_token = await create_token({"id": user.id}, expires_delta=refresh_token_expires)

    return Token(access_token=access_token, refresh_token=refresh_token)
