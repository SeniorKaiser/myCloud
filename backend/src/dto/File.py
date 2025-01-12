from typing import Optional
import uuid
from pydantic import BaseModel, Field
from datetime import datetime
from fastapi import UploadFile

class File(BaseModel):
    id: str
    name: str
    size: int = Field(..., gt=0)
    extension: str
    date: datetime
    folder_id: Optional[str] = None
    user_id: str

    @classmethod
    async def from_upload_file(cls, file: UploadFile, user_id: str, folder_id: str = None):
        file_content = await file.read()
        return cls(
            id=str(uuid.uuid4()),
            name=file.filename,
            size=len(file_content),
            extension=file.filename.split(".")[-1],
            date=datetime.utcnow(),
            folder_id=folder_id,
            user_id=user_id
        )