from src.utils.repository import SQLAlchemyRepository
from src.models.Folder import Folder

class FolderRepository(SQLAlchemyRepository):
    model = Folder
