from fastapi import Response
from fastapi.security import OAuth2PasswordRequestForm
from src.utils.repository import AbstractRepository
from src.dto.User import User as UserDTO
from src.Storage.UserClient import user_storage_client
from src.Service.User.Auth import *
from src.utils.settings import settings

class UserService:
    def __init__(self, user_repository: AbstractRepository):
        self.user_repository = user_repository()

    async def registration(self, user: UserDTO) -> UserDTO:
        user.password = await get_password_hash(user.password)
        id = await self.user_repository.add(user.model_dump())
        # await user_storage_client.create_user_disk(id)
        user = await self.user_repository.get(id)
        return user
    
    async def login(self, response: Response, form_data: OAuth2PasswordRequestForm) -> Token :
        user = await self.user_repository.get_by_name_password(form_data.username, await get_password_hash(form_data.password))
        if not user: raise HTTPException(status_code=404)
        token = await generate_tokens(user)
        response.set_cookie(
            key=settings.COOKIE_KEY_REFRESH,
            value=token.refresh_token,
            httponly=True,
            secure=False,
            samesite="Lax",
            expires=(datetime.utcnow() + timedelta(days=7)).strftime("%a, %d-%b-%Y %H:%M:%S GMT"),
        )
        response.set_cookie(
            key=settings.COOKIE_KEY_ACCESS,
            value=token.access_token,
            httponly=True,
            secure=False,
            samesite="Lax",
            expires=(datetime.utcnow() + timedelta(days=7)).strftime("%a, %d-%b-%Y %H:%M:%S GMT"),
        )
        return token

    # async def auth(self, Token):
    #     return await decode_token(Token.access_token)

    async def get_user(self, id: str) -> UserDTO:
        try:
            return await self.user_repository.get(id)
        except:
            raise HTTPException(status_code=404)
        
    async def delete_user(self, id: str) -> UserDTO:
        user = await self.user_repository.get(id)
        if not user: raise HTTPException(status_code=404) 
        await self.user_repository.delete(id)
        await user_storage_client.delete_user_disk(id)
        return user