import apiClient from '@/lib/axios'
import { Todo } from '@/types'

export async function getTodos(): Promise<Todo[]> {
  const res = await apiClient.get<Todo[]>('/rest/v1/todos', {
    params: {
      select: '*',
      order: 'created_at',
    },
  })
  return res.data
}
