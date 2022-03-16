import './TodosList.css'
import { TodoItem } from '@/components/Todos/TodoItem'
import { useTodos } from '@/hooks/useTodos'

export function TodosList() {
  const { todos } = useTodos()
  return (
    <div className="TodosList">
      <ul className="TodoList-list">
        {todos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <TodoListFooter
        itemsLeft={todos?.filter(todo => !todo.is_completed).length}
        completedItems={todos?.filter(todo => todo.is_completed).length}
      />
    </div>
  )
}

type TodoListFooterProps = {
  itemsLeft?: number
  completedItems?: number
}

function TodoListFooter({
  itemsLeft = 0,
  completedItems = 0,
}: TodoListFooterProps) {
  const { clearCompletedTodos } = useTodos()
  return (
    <div className="TodoList-footer">
      <span className="TodoList-items-left">{itemsLeft} items left</span>
      <button
        type="button"
        className="TodoList-clear-completed"
        onClick={() => clearCompletedTodos()}
        disabled={completedItems === 0}
      >
        Clear Completed
      </button>
    </div>
  )
}
