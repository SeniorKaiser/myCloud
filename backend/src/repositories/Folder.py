from src.utils.repository import SQLAlchemyRepository
from src.models.Folder import Folder
from src.utils.database import async_session_maker
from sqlalchemy import select

class FolderRepository(SQLAlchemyRepository):
    model = Folder

    async def get(self, id: str) -> dict:
        async with async_session_maker() as session:
            stmt = select(self.model).where(self.model.id == id)
            res = await session.execute(stmt)
            res = res.scalar_one_or_none()
            return await res.to_read_model(session) if res else None