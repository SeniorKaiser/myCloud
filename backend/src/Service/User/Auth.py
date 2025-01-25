from fastapi import HTTPException, Request, Response
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
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

def get_tokens_from_cookie(request: Request) -> Token:
    accessToken = request.cookies.get(settings.COOKIES_KEY_ACCESS)
    refreshToken = request.cookies.get(settings.COOKIES_KEY_REFRESH)
    return Token(access_token=accessToken, refresh_token=refreshToken)

def set_tokens_in_cookie(response: Response, token: Token) -> JSONResponse:
    access_token_expires = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    refresh_token_expires = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60

    response.set_cookie(settings.COOKIES_KEY_ACCESS,
                        token.access_token,
                        max_age=access_token_expires,
                        httponly=True
                        )
    response.set_cookie(settings.COOKIES_KEY_REFRESH,
                        token.refresh_token,
                        max_age=refresh_token_expires,
                        httponly=True
                        )