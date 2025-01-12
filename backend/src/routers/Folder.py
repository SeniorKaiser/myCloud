from typing import Annotated
from fastapi import APIRouter, Depends
from src.dependencies.Folder import folder_service
from src.Service.Folder.Folder import FolderService
from src.dto.Folder import Folder as FolderDTO, CreateFolderSchema


router = APIRouter(tags=["Folder"], prefix="/folder")

@router.get("/get/{folder_id}")
async def get_folder(
    folder_service: Annotated[FolderService, Depends(folder_service)],
    folder_id: str,
) -> FolderDTO:
    return await folder_service.get_folder(folder_id)

@router.post("/create")
async def create_folder(
    folder_service: Annotated[FolderService, Depends(folder_service)],
    folder: CreateFolderSchema
) -> FolderDTO:
    return await folder_service.create_folder(folder)

@router.delete("/delete/{folder_id}")
async def delete_folder(
    folder_service: Annotated[FolderService, Depends(folder_service)],
    folder_id: str
) -> FolderDTO:
    return await folder_service.delete_folder(folder_id)

@router.put("/rename/{folder_id}")
async def delete_folder(
    folder_service: Annotated[FolderService, Depends(folder_service)],
    folder_id: str,
    name: str,
) -> FolderDTO:
    return await folder_service.rename_folder(folder_id, name)