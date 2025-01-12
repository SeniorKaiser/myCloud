from src.utils.repository import AbstractRepository
from src.Storage.FolderClient import folder_client_storage
from src.dto.Folder import Folder as FolderDTO, CreateFolderSchema
from src.Service.Folder.Utils import get_folder_path

class FolderService():
    def __init__(self, folder_repository: AbstractRepository):
        self.folder_repository = folder_repository()

    async def get_folder(self, id: str) -> FolderDTO:
        return await self.folder_repository.get(id)
    
    async def create_folder(self, folder: CreateFolderSchema) -> FolderDTO:
        folder_id = await self.folder_repository.add(folder.dict())
        folder = await self.folder_repository.get(folder_id)
        path = await get_folder_path(folder_id)
        await folder_client_storage.create_folder(folder, path)
        return folder
    
    async def delete_folder(self, id: str) -> FolderDTO:
        folder = await self.folder_repository.get(id)
        await self.folder_repository.delete(id)
        path = await get_folder_path(folder.id)
        await folder_client_storage.delete_folder(folder, path)
        return folder
    
    async def rename_folder(self, id: str, name: str) -> FolderDTO:
        folder = await self.folder_repository.get(id)
        await folder_client_storage.rename_folder(folder.name, name)
        folder.name = name
        res = await self.folder_repository.update(id, folder.dict())
        return res