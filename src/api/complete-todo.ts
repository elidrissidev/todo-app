import apiClient from '@/lib/axios'
import { Todo } from '@/types'

export type CompleteTodoRequest = {
  id: number
  completed: boolean
}

export async function completeTodo({
  id,
  completed,
}: CompleteTodoRequest): Promise<Todo> {
  const res = await apiClient.patch<Todo>(
    '/rest/v1/todos',
    { is_completed: completed },
    {
      params: {
        id: `eq.${id}`,
      },
      headers: {
        Prefer: 'return=representation',
      },
    }
  )
  return res.data
}
