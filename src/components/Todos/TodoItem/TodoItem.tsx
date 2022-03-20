import './TodoItem.css'
import { ReactComponent as IconCross } from '@/assets/icon-cross.svg'
import { Checkbox } from '@/components/Checkbox'
import { useTodos } from '@/hooks/useTodos'
import { Todo } from '@/types'
import classNames from '@/utils/classNames'

type TodoItemProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { completeTodo, isUpdatingTodo, removeTodo } = useTodos()

  return (
    <li
      className={classNames(
        'TodoItem',
        todo.is_completed ? 'TodoItem--done' : undefined
      )}
    >
      <label htmlFor={`todo-${todo.id}-completed`} className="visually-hidden">
        Todo Completed
      </label>
      <Checkbox
        id={`todo-${todo.id}-completed`}
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
