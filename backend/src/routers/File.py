from typing import Annotated
from fastapi import APIRouter, Depends, UploadFile, File
from src.Service.File.File import FileService
from src.dependencies.File import file_service
from src.dto.File import File as FileDTO

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
) -> FileDTO:
    return await file_service.upload_file(file, 'aac04b7d-3e6f-45d7-9f73-bc9647aa0a95')

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