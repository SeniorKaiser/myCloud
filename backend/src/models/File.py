from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from src.utils.database import Base
from src.dto.File import File as FileDTO

class File(Base):
    __tablename__ = 'files'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    name = Column(String, nullable=False)
    size = Column(Integer, nullable=False)
    extension = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow, nullable=False)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    folder_id = Column(String, ForeignKey('folders.id'), nullable=True)
    folder = relationship("Folder", back_populates="files", lazy="selectin")
    user = relationship("User", back_populates="files", lazy="selectin")

    def to_read_model(self) -> FileDTO:
        return FileDTO(
            id=self.id,
            name=self.name,
            size=self.size,
            extension=self.extension,
            date=self.date,
            user_id=self.user_id,
            folder_id=self.folder_id
        )