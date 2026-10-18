export type TaskStatus = 'pending' | 'in_progress' | 'completed'

export interface Task {
  id: string
  titulo: string
  descricao: string | null
  status: TaskStatus
  created_at: string
  updated_at: string
}

export interface TaskCreate {
  titulo: string
  descricao?: string
  status?: TaskStatus
}

export interface TaskUpdate {
  titulo?: string
  descricao?: string
  status?: TaskStatus
}
