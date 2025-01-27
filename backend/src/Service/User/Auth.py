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

async def generate_tokens(user_id: str) -> Token:
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    access_token = await create_token({"id": user_id}, expires_delta=access_token_expires)
    refresh_token = await create_token({"id": user_id}, expires_delta=refresh_token_expires)

    return Token(access_token=access_token, refresh_token=refresh_token)

async def get_tokens_from_cookie(request: Request) -> Token:
    accessToken = request.cookies.get(settings.COOKIES_KEY_ACCESS)
    refreshToken = request.cookies.get(settings.COOKIES_KEY_REFRESH)
    return Token(access_token=accessToken, refresh_token=refreshToken)

async def set_tokens_in_cookie(response: Response, token: Token) -> JSONResponse:
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
    
async def checkJWT(accessToken: str | None, refreshToken: str | None) -> Token:
    if accessToken is not None:
        try:
            payload = await decode_token(accessToken)
            print(f"Access token payload: {payload}")
            return Token(access_token=accessToken, refresh_token=refreshToken)
        except JWTError:
            pass

    elif refreshToken is not None:
        try:
            return await refresh(refresh_token=refreshToken)
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    raise HTTPException(status_code=401, detail="Authentication required")

async def refresh(refresh_token: str):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Tokin is missing")
    try:
        payload = await decode_token(refresh_token)
        id = payload.get("id")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    token = await generate_tokens(id)
    return token

async def getJWT(request: Request, response: Response) -> Token:
    token = await get_tokens_from_cookie(request)
    verify_token = await checkJWT(
        accessToken=token.access_token,
        refreshToken=token.refresh_token
    )
    if verify_token.access_token != token.access_token:
        await set_tokens_in_cookie(
            response=response,
            token=verify_token
        )
    return Token(
        access_token=verify_token.access_token,
        refresh_token=verify_token.refresh_token
    )