from src.utils.repository import SQLAlchemyRepository
from src.models.File import File


class FileRepository(SQLAlchemyRepository):
    model = File

