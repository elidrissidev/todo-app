import React from 'react'

import './TodosList.css'
import { ReactComponent as IconCross } from '@/assets/icon-cross.svg'
import useTodos from '@/hooks/useTodos'
import { Todo } from '@/types'

export function TodosList() {
  const { todos, completeTodoMutation } = useTodos()
  return (
    <div className="TodosList">
      <ul className="TodoList-list">
        {todos?.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleCompleted={completeTodoMutation.mutate}
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
  todo: Todo
  onToggleCompleted: (data: { id: number; completed: boolean }) => void
}

function TodoItem({ todo, onToggleCompleted }: TodoItemProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    onToggleCompleted({ id: todo.id, completed: e.target.checked })

  return (
    <li className="TodoList-item">
      <input
        type="checkbox"
        className="Checkbox"
        defaultChecked={todo.is_completed}
        onChange={handleChange}
      />
      <span className="TodoList-item-title">{todo.title}</span>
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
