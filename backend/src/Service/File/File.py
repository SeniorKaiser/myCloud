from typing import Optional
from fastapi import Response, UploadFile, HTTPException
from src.utils.repository import AbstractRepository
from src.Storage.FileClient import file_storage_client as storage_client
from src.dto.File import File as FileDTO

class FileService:
    def __init__(self, file_repository: AbstractRepository):
        self.file_repository = file_repository()

    async def get_file(self, file_id: str) -> FileDTO:
        return await self.file_repository.get(file_id)

    async def upload_file(self, file: UploadFile, user_id: str, folder_id: Optional[str]) -> FileDTO:
        file_content = await file.read()
        file_dto = await FileDTO.from_upload_file(file_content, file, user_id, folder_id)
        print(file_dto)
        await self.file_repository.add(file_dto.model_dump())
        await storage_client.upload_file(file_dto, file_content)
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
        res = await self.file_repository.get(id)
        if res.user_id != user_id: return HTTPException(status_code=403)
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