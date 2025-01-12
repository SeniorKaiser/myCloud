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
    files: List[File] = Field(default_factory=list)
    folder: List[Folder] = Field(default_factory=list)

class UserReg(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = Field(default_factory=None)
    email: Optional[EmailStr]  = Field(default_factory=None)
    password: Optional[str] = Field(default_factory=None)