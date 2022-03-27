import apiClient from '@/lib/axios'

export type ReorderTodosRequest = {
  todo_ids: number[]
  source_index: number
  destination_index: number
}

export function reorderTodos(data: ReorderTodosRequest): Promise<void> {
  return apiClient.post('/rest/v1/rpc/reorder_todos', {
    todo_ids: data.todo_ids,
  })
}
