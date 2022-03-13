import { useQuery } from 'react-query'

import { getTodos } from '@/api'
import { Todo } from '@/types'

function useTodos() {
  const { data } = useQuery<Todo[]>('todos', getTodos)

  return { todos: data }
}

export default useTodos
