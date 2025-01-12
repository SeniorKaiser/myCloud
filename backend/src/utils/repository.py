from abc import ABC, abstractmethod
from sqlalchemy import delete, insert, select, update
from src.utils.database import async_session_maker

class AbstractRepository(ABC):
    @abstractmethod
    async def add():
        raise NotImplementedError
    
    @abstractmethod
    async def find_all():
        raise NotImplementedError
    
    @abstractmethod
    async def get():
        raise NotImplementedError
    
    @abstractmethod
    async def delete():
        raise NotImplementedError


class SQLAlchemyRepository:
    model = None

    async def add(self, data: dict) -> str:
        async with async_session_maker() as session:
            stmt = insert(self.model).values(**data).returning(self.model.id)
            res = await session.execute(stmt)
            await session.commit()
            return res.scalar_one()

    async def find_all(self) -> dict:
        async with async_session_maker() as session:
            stmt = select(self.model)
            res = await session.execute(stmt)
            res = [row[0].to_read_model() for row in res.all()]
            return res
        
    async def get(self, id: str) -> dict:
        async with async_session_maker() as session:
            stmt = select(self.model).where(self.model.id == id)
            res = await session.execute(stmt)
            res = res.scalar_one_or_none()
            return res.to_read_model() if res else None
        
    async def delete(self, id: str) -> dict:
        async with async_session_maker() as session:
            stmt_delete = delete(self.model).where(self.model.id == id)
            res = await session.execute(stmt_delete)
            await session.commit()
            return res
        
    async def update(self, id: str, data: dict) -> dict:
        async with async_session_maker() as session:
            stmt = (
                update(self.model)
                .where(self.model.id == id)
                .values(**data)
                .returning(self.model)
            )
            res = await session.execute(stmt)
            await session.commit()
            res = res.scalar_one_or_none()
            return res
