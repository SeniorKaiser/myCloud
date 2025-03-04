from typing import Optional
from fastapi import Response, UploadFile, HTTPException
from src.utils.repository import AbstractRepository
from src.Storage.FileClient import file_storage_client as storage_client
from src.dto.File import File as FileDTO
from src.dto.User import User as UserDTO
from src.utils.redis import redis_client

class FileService:
    def __init__(self, file_repository: AbstractRepository):
        self.file_repository = file_repository()

    async def get_file(self, file_id: str) -> FileDTO:
        return await self.file_repository.get(file_id)

    async def upload_file(self, file: UploadFile, user_id: str, parent_folder: Optional[str]) -> FileDTO:
        file_content = await file.read()
        file_dto = await FileDTO.from_upload_file(file_content, file, user_id, parent_folder)
        await self.file_repository.add(file_dto.model_dump())
        await storage_client.upload_file(file_dto, file_content)
        await redis_client.delete(key=f'user:{user_id}')
        return file_dto
    
    async def download_file(self, file_id: str, user_id: str) -> Response:
        file = await self.get_file(file_id)
        file_content = await storage_client.download_file(file, user_id)
        return Response(
            content=file_content,
            media_type="application/octet-stream",
            headers={"Content-Disposition": f'attachment; filename="{file.name}"'}
        )
        
    async def delete_file(self, id: str, user_id: str) -> FileDTO:
        file = await self.file_repository.get(id)
        if file.user_id != user_id: return HTTPException(status_code=403)
        await self.file_repository.delete(id)
        await storage_client.delete_file(f'{file.id}_{file.name}', user_id)
        await redis_client.delete(key=f'user:{user_id}')
        return file
    
    async def rename_file(self, id: str, name: str, user_id: str) -> FileDTO:
        file = await self.file_repository.get(id)
        await storage_client.rename_file(f'{file.id}_{file.name}', f'{file.id}_{name}.{file.extension}', user_id)
        file.name = f'{name}.{file.extension}'
        res = await self.file_repository.update(id, file.dict())
        await redis_client.delete(key=f'user:{user_id}')
        return res