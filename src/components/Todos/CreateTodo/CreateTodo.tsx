import './CreateTodo.css'

export function CreateTodo() {
  return (
    <div className="CreateTodo">
      <form className="CreateTodo-form">
        <label htmlFor="todo-completed" className="visually-hidden">
          Todo Completed
        </label>
        <input type="checkbox" id="todo-completed" className="Checkbox" />
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
