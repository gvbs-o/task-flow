import { useState } from 'react'
import { useAppDispatch } from '../hooks/useTasks'
import { createTask } from '../store/tasksSlice'
import { TaskCreate } from '../types/task'

export default function TaskForm() {
  const dispatch = useAppDispatch()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim()) return

    const taskData: TaskCreate = {
      titulo,
      descricao: descricao || null,
    }

    await dispatch(createTask(taskData))
    setTitulo('')
    setDescricao('')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nova Tarefa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o título da tarefa"
            required
          />
        </div>
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Digite a descrição da tarefa"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Criar Tarefa
        </button>
      </form>
    </div>
  )
}
