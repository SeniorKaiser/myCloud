from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from .Folder import Folder 
from .File import File
from typing import List, Optional

class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    date: datetime
    files: List[File] = []
    folders: List[Folder] = []

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "date": self.date.isoformat(),
            "files": [file.to_dict() for file in self.files],
            "folders": [folder.to_dict() for folder in self.folders],
        }
    
    def from_dict(cls, data: dict):
        return cls(**data)

class UserReg(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = Field(default_factory=None)
    email: Optional[EmailStr]  = Field(default_factory=None)
    password: Optional[str] = Field(default_factory=None)

class UserFilesFolders(BaseModel):
    id: str
    files: List[File] = []
    folders: List[Folder] = []

    def to_dict(self):
        return {
            "id": self.id,
            "files": [file.to_dict() for file in self.files],
            "folders": [folder.to_dict() for folder in self.folders],
        }
        
