from fastapi import UploadFile
from src.utils.repository import AbstractRepository
from src.utils.storage import storage_client
from src.dto.File import File as FileDTO


class FileService:
    def __init__(self, file_repository: AbstractRepository):
        self.file_repository = file_repository()

    async def get_file(self, file_id: str) -> FileDTO:
        return await self.file_repository.get(file_id)

    async def upload_file(self, file: UploadFile, user_id: str) -> FileDTO:
        file_dto = await FileDTO.from_upload_file(file, user_id)
        await self.file_repository.add(file_dto.model_dump())
        await storage_client.upload_file(file, user_id)
        return file_dto
        
    async def delete_file(self, id: str) -> FileDTO:
        res = await self.file_repository.get(id)
        await self.file_repository.delete(id)
        await storage_client.delete_file(res.name)
        return res
    
    async def rename_file(self, id: str, name: str) -> FileDTO:
        file = await self.file_repository.get(id)
        await storage_client.rename_file(f'{file.user_id}_{file.name}', f'{file.user_id}_{name}.{file.extension}')
        file.name = f'{name}.{file.extension}'
        print(file)
        res = await self.file_repository.update(id, file.dict())
        return res