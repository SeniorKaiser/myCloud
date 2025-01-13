import uvicorn
from fastapi import FastAPI
from src.routers.User import router as User_Router
from src.routers.File import router as File_Router
from src.routers.Folder import router as Folder_Router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="myCloud",
    description="Сервис для хранения файлов",
    version="0.0.3",
)

app.include_router(User_Router)
app.include_router(File_Router)
app.include_router(Folder_Router)

@app.get("/")
def main():
    return "Hello world"

origins = [
    "http://localhost:5173",  # React/Vue/Angular на локальном хосте
    "http://79.141.77.164",  # Альтернативный локальный хост
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 🔹 Разрешенные источники
    allow_credentials=True,  # 🔹 Разрешить передачу cookies и авторизацию
    allow_methods=["*"],  # 🔹 Разрешенные методы (GET, POST, PUT, DELETE и т. д.)
    allow_headers=["*"],  # 🔹 Разрешенные заголовки
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
#git add .
#git status проверка сохраненых папок
#git rm -r --cached venv убрать папку venv
#git commit -m ""
#git push origin main