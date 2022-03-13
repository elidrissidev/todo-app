import { useQuery, useMutation } from 'react-query'

import { getTodos, completeTodo } from '@/api'
import { Todo } from '@/types'

function useTodos() {
  const { data } = useQuery<Todo[]>('todos', getTodos)

  const completeTodoMutation = useMutation(completeTodo)

  return { todos: data, completeTodoMutation }
}

export default useTodos
