from typing import Annotated, Optional
from fastapi import APIRouter, Depends, UploadFile, File
from src.Service.File.File import FileService
from src.dependencies.File import file_service
from src.dto.File import File as FileDTO
from src.dto.User import User as UserDTO
from src.routers.User import auth

router = APIRouter(tags=["Files"], prefix='/files')

@router.get("/get/{file_id}")
async def get_file(
    file_service: Annotated[FileService, Depends(file_service)],
    file_id: str,
):
    return await file_service.get_file(file_id)

@router.post("/upload")
async def upload_file(
    file_service: Annotated[FileService, Depends(file_service)],
    file: UploadFile = File(...),
    folder_id: Optional[str] = None,
    user: UserDTO = Depends(auth),
) -> FileDTO:
    return await file_service.upload_file(file=file, user_id=user.id, folder_id=folder_id)

@router.delete("/delete/{file_id}")
async def delete_file(
    file_service: Annotated[FileService, Depends(file_service)],
    file_id: str,
) -> FileDTO:
    return await file_service.delete_file(file_id)

@router.put("/rename/{file_id}")
async def delete_file(
    file_service: Annotated[FileService, Depends(file_service)],
    file_id: str,
    new_name: str,
) -> FileDTO:
    return await file_service.rename_file(file_id, new_name)