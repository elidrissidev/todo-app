import './TodosList.css'
import { ReactComponent as IconCross } from '@/assets/icon-cross.svg'
import useTodos from '@/hooks/useTodos'
import { Checkbox } from '../Checkbox'

export function TodosList() {
  const { todos } = useTodos()
  return (
    <div className="TodosList">
      <ul className="TodoList-list">
        {todos?.map(todo => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            completed={todo.is_completed}
          />
        ))}
      </ul>
      <TodoListFooter
        itemsLeft={todos?.filter(todo => !todo.is_completed).length}
      />
    </div>
  )
}

type TodoItemProps = {
  title: string
  completed: boolean
}

function TodoItem({ title, completed }: TodoItemProps) {
  return (
    <li className="TodoList-item">
      <Checkbox defaultChecked={completed} />
      <span className="TodoList-item-title">{title}</span>
      <button type="button" className="TodoList-item-remove">
        <IconCross />
        <span className="visually-hidden">Remove Todo</span>
      </button>
    </li>
  )
}

type TodoListFooterProps = {
  itemsLeft?: number
}

function TodoListFooter({ itemsLeft = 0 }: TodoListFooterProps) {
  return (
    <div className="TodoList-footer">
      <span className="TodoList-items-left">{itemsLeft} items left</span>
      <button type="button" className="TodoList-clear-completed">
        Clear Completed
      </button>
    </div>
  )
}
