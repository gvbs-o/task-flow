import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/useTasks'
import { fetchTasks, deleteTask, updateTask } from '../store/tasksSlice'
import { TaskStatus } from '../types/task'

export default function TaskList() {
  const dispatch = useAppDispatch()
  const { tasks, loading, error } = useAppSelector((state) => state.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      await dispatch(deleteTask(id))
    }
  }

  const handleStatusChange = async (id: string, newStatus: TaskStatus) => {
    await dispatch(updateTask({ id, task: { status: newStatus } }))
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'in_progress':
        return 'Em Andamento'
      case 'completed':
        return 'Concluída'
      default:
        return status
    }
  }

  if (loading && tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">Carregando tarefas...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-500">Erro: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tarefas</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Nenhuma tarefa encontrada</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{task.titulo}</h3>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                  className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(task.status)}`}
                >
                  <option value="pending">Pendente</option>
                  <option value="in_progress">Em Andamento</option>
                  <option value="completed">Concluída</option>
                </select>
              </div>
              {task.descricao && (
                <p className="text-gray-600 mb-3">{task.descricao}</p>
              )}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{new Date(task.created_at).toLocaleDateString('pt-BR')}</span>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
