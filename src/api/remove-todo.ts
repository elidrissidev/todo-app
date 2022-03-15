import apiClient from '@/lib/axios'

export async function removeTodo(id: number): Promise<null> {
  const res = await apiClient.delete('/rest/v1/todos', {
    params: {
      id: `eq.${id}`,
    },
  })
  return res.data
}
