import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Task, TaskCreate, TaskUpdate } from '../types/task'
import { api } from '../services/api'

interface TasksState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    return await api.getTasks()
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: TaskCreate) => {
    return await api.createTask(task)
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, task }: { id: string; task: TaskUpdate }) => {
    return await api.updateTask(id, task)
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await api.deleteTask(id)
    return id
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch tasks'
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create task'
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update task'
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete task'
      })
  },
})

export default tasksSlice.reducer
