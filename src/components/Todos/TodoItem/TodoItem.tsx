import React from 'react'

import { useMutation } from 'react-query'

import './TodoItem.css'
import { ReactComponent as IconCross } from '@/assets/icon-cross.svg'
import { completeTodo } from '@/api'
import { Todo } from '@/types'

type TodoItemProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const completeTodoMutation = useMutation(completeTodo)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    completeTodoMutation.mutate({ id: todo.id, completed: e.target.checked })

  return (
    <li className="TodoItem">
      <input
        type="checkbox"
        className="Checkbox"
        defaultChecked={todo.is_completed}
        disabled={completeTodoMutation.isLoading}
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
