from src.repositories.Folder import FolderRepository
from src.Service.Folder.Folder import FolderService

def folder_service():
    return FolderService(FolderRepository)