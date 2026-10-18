import { Task, TaskCreate, TaskUpdate } from '../types/task'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/api/tasks`)
    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }
    return response.json()
  },

  async getTask(id: string): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch task')
    }
    return response.json()
  },

  async createTask(task: TaskCreate): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      throw new Error('Failed to create task')
    }
    return response.json()
  },

  async updateTask(id: string, task: TaskUpdate): Promise<Task> {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      throw new Error('Failed to update task')
    }
    return response.json()
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete task')
    }
  },
}
