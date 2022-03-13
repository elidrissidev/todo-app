import './App.css'
import { Header } from '@/components/Header'
import { CreateTodo } from '@/components/Todos/CreateTodo'
import { TodosList } from '@/components/Todos/TodosList'

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <Header />
        <CreateTodo />
        <TodosList />
      </div>
    </div>
  )
}

export default App
