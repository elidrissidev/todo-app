import React from 'react'
import { useMutation, useQueryClient } from 'react-query'

import './TodoItem.css'
import { ReactComponent as IconCross } from '@/assets/icon-cross.svg'
import { completeTodo, removeTodo } from '@/api'
import { Todo } from '@/types'

type TodoItemProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient()

  const completeTodoMutation = useMutation(completeTodo, {
    onSettled: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const removeTodoMutation = useMutation(removeTodo, {
    onMutate: async id => {
      await queryClient.cancelQueries('todos')

      const prevTodos = queryClient.getQueryData<Todo[]>('todos')

      queryClient.setQueryData(
        'todos',
        prevTodos?.filter(todo => todo.id !== id)
      )

      return { prevTodos }
    },
    onError: (_, __, context: any) => {
      queryClient.setQueryData('todos', context.prevTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const toggleCompletion: React.ChangeEventHandler<HTMLInputElement> = e =>
    completeTodoMutation.mutate({ id: todo.id, completed: e.target.checked })

  return (
    <li className="TodoItem">
      <input
        type="checkbox"
        className="Checkbox"
        defaultChecked={todo.is_completed}
        disabled={completeTodoMutation.isLoading}
        onChange={toggleCompletion}
      />
      <span className="TodoItem-title">{todo.title}</span>
      <button
        type="button"
        className="TodoItem-remove"
        onClick={() => removeTodoMutation.mutate(todo.id)}
      >
        <IconCross />
        <span className="visually-hidden">Remove Todo</span>
      </button>
    </li>
  )
}
