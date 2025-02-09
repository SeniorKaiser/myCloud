import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, String, ForeignKey
from sqlalchemy.orm import relationship
from src.utils.database import Base
from src.dto.Folder import Folder as FolderDTO

class Folder(Base):
    __tablename__ = 'folders'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    name = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow, nullable=False)
    parent_folder = Column(String, ForeignKey('folders.id'))
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    subfolders = relationship("Folder", back_populates="parent", remote_side=[id], lazy="selectin")
    files = relationship("File", back_populates="folder", lazy="selectin")
    user = relationship("User", back_populates="folders")

    def to_read_model(self) -> FolderDTO:
        return FolderDTO(
            id=self.id,
            name=self.name,
            date=self.date,
            parent_folder=self.parent_folder,
            user_id=self.user_id,
            files=[file.to_read_model() for file in self.files] if self.files else [],
            subfolders=[subfolder.to_read_model() for subfolder in self.subfolders] if self.subfolders else []
        )