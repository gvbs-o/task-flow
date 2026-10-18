from datetime import datetime
from sqlalchemy import Column, String, DateTime
from backend.db.base import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True)
    titulo = Column(String, nullable=False)
    descricao = Column(String, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
