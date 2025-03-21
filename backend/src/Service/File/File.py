import mimetypes
from urllib.parse import quote
from typing import Optional
from fastapi import Response, UploadFile, HTTPException
from src.Service.File.Utils import convert_to_webp
from src.utils.repository import AbstractRepository
from src.Storage.FileClient import file_storage_client as storage_client
from src.dto.File import File as FileDTO
from src.dto.User import User as UserDTO
from src.utils.redis import redis_client

class FileService:
    def __init__(self, file_repository: AbstractRepository):
        self.file_repository = file_repository()

    async def get_file(self, file_id: str) -> FileDTO:
        try:
            file = await redis_client.get(f"file:{file_id}")
            if file: return FileDTO.from_dict(data=file)
            else:
                file = await self.file_repository.get(file_id)
                await redis_client.set(key=f"file:{file_id}", value=file.to_dict())
                return file
        except Exception as e:
            print(f"Error in get_file: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    async def upload_file(self, file: UploadFile, user: UserDTO, parent_folder: Optional[str]) -> FileDTO:
        file_content = await file.read()
        if len(file_content) + sum([file.size for file in user.files]) > (20 * 1024**3):
            raise HTTPException(status_code=413)
        file_dto = await FileDTO.from_upload_file(file_content, file, user.id, parent_folder)
        await self.file_repository.add(file_dto.model_dump())
        await storage_client.upload_file(file_dto, file_content)
        await redis_client.delete(key=f'user:{ user.id}')
        return file_dto
    
    async def download_file(self, file_id: str, user_id: str) -> Response:
        file = await self.get_file(file_id)
        file_content = await storage_client.download_file(file, user_id)
        encoded_filename = quote(file.name)
        content_disposition = f"attachment; filename*=UTF-8''{encoded_filename}"

        return Response(
            content=file_content,
            media_type="application/octet-stream",
            headers={"Content-Disposition": content_disposition}
        )
        
    async def delete_file(self, id: str, user_id: str) -> FileDTO:
        file = await self.get_file(id)
        if file.user_id != user_id: return HTTPException(status_code=403)
        await self.file_repository.delete(id)
        await storage_client.delete_file(f'{file.id}_{file.name}', user_id)
        await redis_client.delete(key=f'user:{user_id}')
        await redis_client.delete(key=f'file:{id}')
        return file
    
    async def rename_file(self, id: str, name: str, user_id: str) -> FileDTO:
        file = await self.get_file(id)
        await storage_client.rename_file(f'{file.id}_{file.name}', f'{file.id}_{name}.{file.extension}', user_id)
        file.name = f'{name}.{file.extension}'
        res = await self.file_repository.update(id, file.dict())
        await redis_client.delete(key=f'user:{user_id}')
        await redis_client.delete(key=f'file:{id}')
        return res
    
    async def get_image(self, id: str, user_id: str) -> Response:
        file = await self.get_file(id)
        file_content = await storage_client.download_file(file, user_id)
        print(f'uploads/{user_id}/files/{file.id}_{file.name}')
        mime_type, _ = mimetypes.guess_type(file.name)
        if mime_type and mime_type.startswith("image/"):
            webp_bytes = await convert_to_webp(file_content)
            return Response(
                content=webp_bytes,
                media_type="image/webp",
                headers={"Cache-Control": "public, max-age=86400"}
            )
        return Response(content=file_content, media_type=mime_type)