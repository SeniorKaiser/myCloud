from typing import Optional
from fastapi import Response
from fastapi.security import OAuth2PasswordRequestForm
from src.Service.User.Utils import calculate_similarity
from src.utils.repository import AbstractRepository
from src.dto.User import User as UserDTO, UserFilesFolders
from src.dto.File import File as FileDTO
from src.dto.Folder import Folder as FolderDTO
from src.Storage.UserClient import user_storage_client
from src.utils.redis import redis_client
from src.Service.User.Auth import *

class UserService:
    def __init__(self, user_repository: AbstractRepository):
        self.user_repository = user_repository()

    async def registration(self, user: UserDTO) -> UserDTO:
        user.password = await get_password_hash(user.password)
        id = await self.user_repository.add(user.model_dump())
        await user_storage_client.create_user_disk(id)
        user = await self.user_repository.get(id)
        return user
    
    async def login(self, response: Response, form_data: OAuth2PasswordRequestForm) -> Token :
        user = await self.user_repository.get_by_name_password(form_data.username, await get_password_hash(form_data.password))
        if not user: raise HTTPException(status_code=404)
        token = await generate_tokens(user.id)
        await set_tokens_in_cookie(response=response, token=token)
        return token

    async def auth(self, request: Request, response: Response) -> UserDTO:
        token = await getJWT(request=request, response=response)
        payload = await decode_token(token.access_token)
        user = await self.get_user(payload.get("id"))
        return user

    async def get_user(self, id: str) -> UserDTO:
        try:
            user = await redis_client.get(f"user:{id}")
            if user: return user
            else:
                user = await self.user_repository.get(id)
                await redis_client.set(key=f"user:{id}", value=user.to_dict())
                return user
        except Exception as e:
            print(f"Error in get_user: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")
        
    async def delete_user(self, id: str) -> UserDTO:
        user = await self.user_repository.get(id)
        if not user: raise HTTPException(status_code=404) 
        await self.user_repository.delete(id)
        await user_storage_client.delete_user_disk(id)
        return user
    
    async def disk(self, user_id: str, folder_id: Optional[str] = None) -> UserFilesFolders:
        user = await self.user_repository.get(user_id)
        if not user: raise HTTPException(status_code=404)
        folders = [folder for folder in user.folders if folder.parent_folder == folder_id]
        files = [file for file in user.files if file.parent_folder == folder_id]
        return UserFilesFolders(id=folder_id, files=files, folders=folders)
    
    async def disk_size(self, user_id: str) -> int:
        user = await self.user_repository.get(user_id)
        if not user: raise HTTPException(status_code=404)
        size = sum([file.size for file in user.files])
        return size
    
    async def disk_search(self, user_id: str, param: str) -> UserFilesFolders:
        user = await self.user_repository.get(user_id)
        if not user:
            raise HTTPException(status_code=404)
        all_items = []
        
        for folder in user.folders:
            similarity = calculate_similarity(folder, param)
            all_items.append((folder, similarity))
        for file in user.files:
            similarity = calculate_similarity(file, param)
            all_items.append((file, similarity))

        sorted_items = sorted(all_items, key=lambda x: x[1], reverse=True)
        sorted_folders = [item[0] for item in sorted_items if isinstance(item[0], FolderDTO)]
        sorted_files = [item[0] for item in sorted_items if isinstance(item[0], FileDTO)]
        return UserFilesFolders(id=user.id, files=sorted_files, folders=sorted_folders)
