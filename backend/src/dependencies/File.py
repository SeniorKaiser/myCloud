from src.repositories.File import FileRepository
from src.Service.File.File import FileService

def file_service():
    return FileService(FileRepository)