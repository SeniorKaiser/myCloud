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

class CreateFolderSchema(BaseModel):
    name: str
    parent_folder: Optional[str] = None
    user_id: str