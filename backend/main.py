import uvicorn
from fastapi import FastAPI
from src.routers.User import router as User_Router
from src.routers.File import router as File_Router
from src.routers.Folder import router as Folder_Router
from src.utils.redis import redis_client
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="myCloud",
    description="Сервис для хранения файлов",
    version="0.0.1",
)

app.include_router(User_Router)
app.include_router(File_Router)
app.include_router(Folder_Router)

@app.get("/")
def main():
    return "Hello world"

origins = [
    "http://localhost:5173",  # React/Vue/Angular на локальном хосте
    "http://127.0.0.1:5173",  # Альтернативный локальный хост
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 🔹 Разрешенные источники
    allow_credentials=True,  # 🔹 Разрешить передачу cookies и авторизацию
    allow_methods=["*"],  # 🔹 Разрешенные методы (GET, POST, PUT, DELETE и т. д.)
    allow_headers=["*"],  # 🔹 Разрешенные заголовки
)


if __name__ == '__main__':
    uvicorn.run("main:app", host='127.0.0.1', port=8000, reload=True, workers=3)

#git add .
#git status проверка сохраненых папок
#git rm -r --cached venv убрать папку venv
#git commit -m ""
#git push origin main