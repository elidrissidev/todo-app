import './CreateTodo.css'
import { Checkbox } from '../Checkbox'

export function CreateTodo() {
  return (
    <div className="CreateTodo">
      <form className="CreateTodo-form">
        <label htmlFor="todo-completed" className="visually-hidden">
          Todo Completed
        </label>
        <Checkbox id="todo-completed" />
        <label htmlFor="todo-title" className="visually-hidden">
          Create a new todo
        </label>
        <input
          type="text"
          id="todo-title"
          className="CreateTodo-input"
          placeholder="Create a new todo..."
        />
      </form>
    </div>
  )
}
