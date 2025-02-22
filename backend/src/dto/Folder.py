from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from .File import File

class Folder(BaseModel):
    id: str
    name: str
    date: datetime
    user_id: str
    files: List[File] = []
    parent_folder: Optional[str] = None

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date.isoformat(),
            "user_id": self.user_id,
            "files": [file.to_dict() for file in self.files],
            "parent_folder": self.parent_folder,
        }

class CreateFolderSchema(BaseModel):
    name: str
    parent_folder: Optional[str] = None