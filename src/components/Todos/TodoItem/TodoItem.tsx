import React from 'react'

import './TodoItem.css'
import { ReactComponent as IconCross } from '@/assets/icon-cross.svg'
import { Todo } from '@/types'

type TodoItemProps = {
  todo: Todo
  onToggleCompleted: (data: { id: number; completed: boolean }) => void
}

export function TodoItem({ todo, onToggleCompleted }: TodoItemProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    onToggleCompleted({ id: todo.id, completed: e.target.checked })

  return (
    <li className="TodoItem">
      <input
        type="checkbox"
        className="Checkbox"
        defaultChecked={todo.is_completed}
        onChange={handleChange}
      />
      <span className="TodoItem-title">{todo.title}</span>
      <button type="button" className="TodoItem-remove">
        <IconCross />
        <span className="visually-hidden">Remove Todo</span>
      </button>
    </li>
  )
}
