from typing import Annotated, Optional
from fastapi import APIRouter, Depends, Response, UploadFile, File
from src.Service.File.File import FileService
from src.dependencies.File import file_service
from src.dto.File import File as FileDTO
from src.dto.User import User as UserDTO
from src.routers.User import auth

router = APIRouter(tags=["Files"], prefix='/files')

# @router.get("/get/{file_id}")
# async def get_file(
#     file_service: Annotated[FileService, Depends(file_service)],
#     file_id: str,
# ):
#     return await file_service.get_file(file_id)

@router.post("/upload")
async def upload_file(
    file_service: Annotated[FileService, Depends(file_service)],
    file: UploadFile = File(...),
    parent_folder: Optional[str] = None,
    user: UserDTO = Depends(auth),
) -> FileDTO:
    return await file_service.upload_file(file=file, user=user, parent_folder=parent_folder)

@router.get("/download/{file_id}")
async def download_file(
    file_id: str,
    file_service: Annotated[FileService, Depends(file_service)],
    user: UserDTO = Depends(auth),
) -> Response:
    return await file_service.download_file(file_id=file_id, user_id=user.id)

@router.delete("/delete/{file_id}")
async def delete_file(
    file_service: Annotated[FileService, Depends(file_service)],
    file_id: str,
    user: UserDTO = Depends(auth),
) -> FileDTO:
    return await file_service.delete_file(file_id, user_id=user.id)

@router.put("/rename/{file_id}")
async def rename_file(
    file_service: Annotated[FileService, Depends(file_service)],
    file_id: str,
    new_name: str,
    user: UserDTO = Depends(auth),
) -> FileDTO:
    return await file_service.rename_file(file_id, new_name, user_id=user.id)