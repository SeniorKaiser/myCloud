
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from src.utils.settings import settings

# SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./app.db"
SQLALCHEMY_DATABASE_URL = f'postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASS}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}'

# Создание подключения
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=False)
async_session_maker = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)
Base = declarative_base()

async def create_tables_if_not_exist():
    async with engine.begin() as conn:
        # Создаёт только те таблицы, которые отсутствуют
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(create_tables_if_not_exist())
# Асинхронная зависимость для получения сессии базы данных
async def get_db():
    async with async_session_maker() as db:
        try:
            yield db
        finally:
            await db.close()