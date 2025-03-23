import uvicorn
from fastapi import FastAPI
from src.routers.User import router as User_Router
from src.routers.File import router as File_Router
from src.routers.Folder import router as Folder_Router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="myCloud",
    description="Сервис для хранения файлов",
)

app.include_router(User_Router)
app.include_router(File_Router)
app.include_router(Folder_Router)

@app.get("/")
def main():
    return "Hello world"

origins = [
    "http://localhost:5173",
    "http://79.141.77.164",
    "http://172.18.0.4",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)
