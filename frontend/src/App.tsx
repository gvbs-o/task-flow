import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Task Flow</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TaskForm />
          <TaskList />
        </div>
      </div>
    </div>
  )
}

export default App
