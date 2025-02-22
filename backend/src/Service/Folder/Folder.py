from fastapi import HTTPException
from src.utils.repository import AbstractRepository
from src.dto.Folder import Folder as FolderDTO, CreateFolderSchema

class FolderService():
    def __init__(self, folder_repository: AbstractRepository):
        self.folder_repository = folder_repository()

    async def get_folder(self, id: str, user_id: str) -> FolderDTO:
        folder = await self.folder_repository.get(id)
        if folder.user_id != user_id: raise HTTPException(status_code=403)
        return folder
    
    async def create_folder(self, folder: CreateFolderSchema, user_id: str) -> FolderDTO:
        folder = FolderDTO(name=folder.name, parent_folder=folder.parent_folder, user_id=user_id)
        folder_id = await self.folder_repository.add(folder.dict())
        folder_created = await self.folder_repository.get(folder_id)
        return folder_created
    
    async def delete_folder(self, id: str, user_id: str) -> FolderDTO:
        folder = await self.folder_repository.get(id)
        if folder.user_id != user_id: raise HTTPException(status_code=403)
        await self.folder_repository.delete(id)
        return folder
    
    async def rename_folder(self, id: str, name: str, user_id: str) -> FolderDTO:
        folder = await self.folder_repository.get(id)
        if folder.user_id != user_id: raise HTTPException(status_code=403)
        folder.name = name
        res = await self.folder_repository.update(id, folder.dict())
        return res