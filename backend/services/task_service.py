from typing import List, Optional
from sqlalchemy.orm import Session
from backend.repositories.task_repository import TaskRepository
from backend.models.task import TaskCreate, TaskUpdate, TaskResponse


class TaskService:
    def __init__(self, db: Session):
        self.repository = TaskRepository(db)

    def create_task(self, task_data: TaskCreate) -> TaskResponse:
        task = self.repository.create(task_data)
        return TaskResponse.model_validate(task)

    def get_all_tasks(self) -> List[TaskResponse]:
        tasks = self.repository.get_all()
        return [TaskResponse.model_validate(task) for task in tasks]

    def get_task_by_id(self, task_id: str) -> Optional[TaskResponse]:
        task = self.repository.get_by_id(task_id)
        if task:
            return TaskResponse.model_validate(task)
        return None

    def update_task(self, task_id: str, task_data: TaskUpdate) -> Optional[TaskResponse]:
        task = self.repository.update(task_id, task_data)
        if task:
            return TaskResponse.model_validate(task)
        return None

    def delete_task(self, task_id: str) -> bool:
        return self.repository.delete(task_id)
