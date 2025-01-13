from src.utils.repository import SQLAlchemyRepository
from src.models.User import User
from src.utils.database import async_session_maker
from sqlalchemy import select



class UserRepository(SQLAlchemyRepository):
    model = User

    async def get_by_name_password(self, name: str, password):
        async with async_session_maker() as session:
            stmt = select(self.model).where(self.model.name == name and self.model.password == password)
            res = await session.execute(stmt)
            res = res.scalar_one_or_none()
            return res.to_read_model() if res else None