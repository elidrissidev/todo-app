import './App.css'
import { Header } from '@/components/Header'
import { CreateTodo } from '@/components/Todos/CreateTodo'
import { TodosList } from '@/components/Todos/TodosList'
import { TodosProvider } from '@/hooks/useTodos'

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <Header />
        <TodosProvider>
          <CreateTodo />
          <TodosList />
        </TodosProvider>
      </div>
    </div>
  )
}

export default App
