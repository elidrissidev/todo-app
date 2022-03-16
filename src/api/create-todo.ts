import apiClient from '@/lib/axios'
import { Todo } from '@/types'

export type CreateTodoRequest = {
  title: string
  is_completed: boolean
}

export async function createTodo(data: CreateTodoRequest): Promise<Todo> {
  const res = await apiClient.post<Todo>('/rest/v1/todos', data, {
    headers: {
      Prefer: 'return=representation',
    },
  })
  return res.data
}
