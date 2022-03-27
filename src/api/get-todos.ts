import apiClient from '@/lib/axios'
import { Todo } from '@/types'

export async function getTodos(): Promise<Todo[]> {
  const res = await apiClient.get<Todo[]>('/rest/v1/todos', {
    params: {
      select: 'id,title,is_completed,position',
      order: 'position,created_at.desc',
    },
  })
  return res.data
}
