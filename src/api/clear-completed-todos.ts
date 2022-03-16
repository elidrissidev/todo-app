import apiClient from '@/lib/axios'

export function clearCompletedTodos(): Promise<null> {
  return apiClient.delete('/rest/v1/todos', {
    params: {
      is_completed: 'is.true',
    },
  })
}
