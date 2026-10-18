import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useTasks = () => {
  const dispatch = useAppDispatch()
  const { tasks, loading, error } = useAppSelector((state) => state.tasks)

  return {
    tasks,
    loading,
    error,
    fetchTasks: () => dispatch({ type: 'tasks/fetchTasks' }),
    createTask: (task: any) => dispatch({ type: 'tasks/createTask', payload: task }),
    updateTask: (id: string, task: any) => dispatch({ type: 'tasks/updateTask', payload: { id, task } }),
    deleteTask: (id: string) => dispatch({ type: 'tasks/deleteTask', payload: id }),
  }
}
