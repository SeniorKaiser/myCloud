
from sqlalchemy.future import select
from src.models.Folder import Folder
from src.utils.database import async_session_maker

async def get_folder_path(folder_id: str) -> str:
    path = []

    async with async_session_maker() as session:
        while folder_id is not None:
            # Получаем данные о папке
            stmt = select(Folder).where(Folder.id == folder_id)
            res = await session.execute(stmt)
            folder = res.scalar_one_or_none()

            if folder is None:
                break  # Если папки нет в БД, выходим

            path.append(folder.name)  # Добавляем имя папки в путь
            folder_id = folder.parent_folder  # Переходим к родительской папке

    return "/".join(reversed(path))  # Собираем путь в правильном порядке