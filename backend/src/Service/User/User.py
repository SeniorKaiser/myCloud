from fastapi import Depends, Response
from fastapi.security import OAuth2PasswordRequestForm
from src.utils.repository import AbstractRepository
from src.dto.User import User as UserDTO
from src.Storage.UserClient import user_storage_client
from src.Service.User.Auth import *

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
        token = await generate_tokens(user.id)
        set_tokens_in_cookie(response=response, token=token)
        return token

    async def auth(self, token: Token = Depends(getJWT)) -> UserDTO:
        payload = await decode_token(token.access_token)
        return await self.get_user(payload.get("id"))

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