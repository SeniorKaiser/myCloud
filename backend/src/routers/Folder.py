from typing import Annotated
from fastapi import APIRouter, Depends
from src.dependencies.Folder import folder_service
from src.Service.Folder.Folder import FolderService
from src.dto.Folder import Folder as FolderDTO, CreateFolderSchema
from src.routers.User import auth
from src.dto.User import User as UserDTO

router = APIRouter(tags=["Folder"], prefix="/folder")

@router.get("/get/{folder_id}", response_model=FolderDTO)
async def get_folder(
    folder_service: Annotated[FolderService, Depends(folder_service)],
    folder_id: str,
    user: dict = Depends(auth)
) -> FolderDTO:
    return await folder_service.get_folder(folder_id, user["id"])

@router.post("/create", response_model=FolderDTO)
async def create_folder(
    folder_service: Annotated[FolderService, Depends(folder_service)],
    folder: CreateFolderSchema,
    user: dict = Depends(auth)
) -> FolderDTO:
    return await folder_service.create_folder(folder, user["id"])

@router.delete("/delete/{folder_id}")
async def delete_folder(
    folder_service: Annotated[FolderService, Depends(folder_service)],
    folder_id: str,
    user: dict = Depends(auth)
) -> FolderDTO:
    return await folder_service.delete_folder(folder_id, user["id"])

@router.put("/rename/{folder_id}")
async def rename_folder(
    folder_service: Annotated[FolderService, Depends(folder_service)],
    folder_id: str,
    name: str,
    user: dict = Depends(auth)
) -> FolderDTO:
    return await folder_service.rename_folder(folder_id, name, user["id"])