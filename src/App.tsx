import './App.css'
import { Header } from '@/components/Header'
import { CreateTodo } from '@/components/Todos/CreateTodo'

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <Header />
        <CreateTodo />
      </div>
    </div>
  )
}

export default App
