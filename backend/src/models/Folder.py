import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, String, ForeignKey, select
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.asyncio import AsyncSession
from src.utils.database import Base
from src.dto.Folder import Folder as FolderDTO

class Folder(Base):
    __tablename__ = 'folders'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    name = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow, nullable=False)
    user_id = Column(String, ForeignKey('users.id'), nullable=False)
    parent_folder = Column(String, ForeignKey('folders.id'))
    files = relationship("File", back_populates="folder", lazy="selectin")
    user = relationship("User", back_populates="folders")
    children = relationship("Folder", backref=backref("parent", remote_side=[id]), lazy="selectin")
    
    async def to_read_model(self, session: AsyncSession = None) -> FolderDTO:
        result = await session.execute(select(Folder).where(Folder.parent_folder == self.id))
        children = result.scalars().all()
        return FolderDTO(
            id=self.id,
            name=self.name,
            date=self.date,
            user_id=self.user_id,
            files=[file.to_read_model() for file in self.files],
            parent_folders=self.parent_folder,
            folders=[await child.to_read_model(session) for child in children]
        )