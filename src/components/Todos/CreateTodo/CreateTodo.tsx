import React, { useState } from 'react'

import './CreateTodo.css'
import { useTodos } from '@/hooks/useTodos'

export function CreateTodo() {
  const { createTodo } = useTodos()

  const [isCompleted, setIsCompleted] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    if (!title) {
      return
    }

    createTodo({ title, is_completed: isCompleted })

    setIsCompleted(false)
    setTitle('')
  }

  return (
    <div className="CreateTodo">
      <form className="CreateTodo-form" onSubmit={handleSubmit}>
        <label htmlFor="todo-completed" className="visually-hidden">
          Todo Completed
        </label>
        <input
          type="checkbox"
          id="todo-completed"
          className="Checkbox"
          onChange={() => setIsCompleted(value => !value)}
          checked={isCompleted}
        />
        <label htmlFor="todo-title" className="visually-hidden">
          Create a new todo
        </label>
        <input
          type="text"
          id="todo-title"
          className="CreateTodo-input"
          placeholder="Create a new todo..."
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
      </form>
    </div>
  )
}
