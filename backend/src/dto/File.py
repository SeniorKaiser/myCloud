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
    parent_folder: Optional[str] = None
    user_id: str
    storage_url: str = ''

    @classmethod
    async def from_upload_file(cls, file_content: bytes, file: UploadFile, user_id: str, parent_folder: str = None):
        return cls(
            id=str(uuid.uuid4()),
            name=file.filename,
            size=len(file_content),
            extension=file.filename.split(".")[-1],
            date=datetime.utcnow(),
            parent_folder=parent_folder,
            user_id=user_id,
            storage_url=''
        )
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "size": self.size,
            "date": self.date.isoformat(),
            "extension": self.extension,
            "parent_folder": self.parent_folder,
            "user_id": self.user_id,
            "storage_url": self.storage_url
        }