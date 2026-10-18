from typing import List, Optional
from sqlalchemy.orm import Session
from backend.db.models.task import Task
from backend.models.task import TaskCreate, TaskUpdate
import uuid


class TaskRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, task_data: TaskCreate) -> Task:
        task = Task(
            id=str(uuid.uuid4()),
            titulo=task_data.titulo,
            descricao=task_data.descricao,
            status=task_data.status,
        )
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def get_all(self) -> List[Task]:
        return self.db.query(Task).all()

    def get_by_id(self, task_id: str) -> Optional[Task]:
        return self.db.query(Task).filter(Task.id == task_id).first()

    def update(self, task_id: str, task_data: TaskUpdate) -> Optional[Task]:
        task = self.get_by_id(task_id)
        if not task:
            return None

        update_data = task_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)

        self.db.commit()
        self.db.refresh(task)
        return task

    def delete(self, task_id: str) -> bool:
        task = self.get_by_id(task_id)
        if not task:
            return False

        self.db.delete(task)
        self.db.commit()
        return True
