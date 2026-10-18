from datetime import datetime
from typing import Literal
from pydantic import BaseModel


class TaskCreate(BaseModel):
    titulo: str
    descricao: str | None = None
    status: Literal["pending", "in_progress", "completed"] = "pending"


class TaskUpdate(BaseModel):
    titulo: str | None = None
    descricao: str | None = None
    status: Literal["pending", "in_progress", "completed"] | None = None


class TaskResponse(BaseModel):
    id: str
    titulo: str
    descricao: str | None = None
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
