from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from src.utils.database import Base
from src.dto.User import User as UserDTO

class User(Base):
    __tablename__ = 'users'

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    name = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    date = Column(DateTime, default=datetime.utcnow, nullable=False)
    password = Column(String, unique=True, nullable=False)
    files = relationship('File', back_populates='user')
    folders = relationship('Folder', back_populates='user')

    def to_read_model(self) -> UserDTO:
        return UserDTO(
            id=self.id,
            name=self.name,
            email=self.email,
            date=str(self.date),
        )