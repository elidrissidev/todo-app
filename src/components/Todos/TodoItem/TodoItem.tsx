import './TodoItem.css'
import { ReactComponent as IconCross } from '@/assets/icon-cross.svg'
import { useTodos } from '@/hooks/useTodos'
import { Todo } from '@/types'

type TodoItemProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { completeTodo, isUpdatingTodo, removeTodo } = useTodos()

  return (
    <li className="TodoItem">
      <input
        type="checkbox"
        className="Checkbox"
        defaultChecked={todo.is_completed}
        disabled={isUpdatingTodo}
        onChange={e =>
          completeTodo({ id: todo.id, completed: e.target.checked })
        }
      />
      <span className="TodoItem-title">{todo.title}</span>
      <button
        type="button"
        className="TodoItem-remove"
        onClick={() => removeTodo(todo.id)}
      >
        <IconCross />
        <span className="visually-hidden">Remove Todo</span>
      </button>
    </li>
  )
}
