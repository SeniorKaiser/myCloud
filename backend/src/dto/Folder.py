from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
from .File import File

class Folder(BaseModel):
    id: str
    name: str
    date: datetime
    parent_folder: Optional[str] = None
    files: List[File] = Field(default_factory=list)
    user_id: str

class CreateFolderSchema(BaseModel):
    name: str
    parent_folder: Optional[str] = None
    user_id: str