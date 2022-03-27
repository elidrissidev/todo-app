import './App.css'
import { Header } from '@/components/Header'
import { CreateTodo } from '@/components/Todos/CreateTodo'
import { TodosList } from '@/components/Todos/TodosList'
import { TodosProvider } from '@/hooks/useTodos'
import { TodosFilter } from './components/Todos/TodosFilter'

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <Header />
        <main>
          <TodosProvider>
            <CreateTodo />
            <TodosList />
            <TodosFilter />
            <span className="DragDropHint">Drag and drop to reorder list</span>
          </TodosProvider>
        </main>
      </div>
    </div>
  )
}

export default App
