import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import nock from 'nock'

import { TodosList } from './TodosList'
import { SUPABASE_API_BASE_URL } from '@/config'

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})

const todos = [
  { id: 1, title: 'Complete online JavaScript course', is_completed: true },
  { id: 2, title: 'Read for 1 hour', is_completed: false },
  { id: 3, title: 'Complete Todo App on Frontend Mentor', is_completed: false },
]

describe('TodoList', () => {
  let queryClient: QueryClient
  let wrapper: React.FC

  beforeAll(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          retry: false,
        },
      },
    })
    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  })

  it('fetches and displays todos from the API', async () => {
    const scope = nock(SUPABASE_API_BASE_URL)
      .get('/rest/v1/todos')
      .query(true)
      .reply(200, todos, { 'Access-Control-Allow-Origin': '*' })

    render(<TodosList />, { wrapper })

    await waitFor(() => scope.done())

    expect(screen.getAllByRole('listitem')).toHaveLength(todos.length)

    screen.getAllByRole('listitem').forEach((li, idx) => {
      expect(li).toHaveTextContent(todos[idx].title)
      expect(within(li).getByRole('checkbox')).toHaveProperty(
        'checked',
        todos[idx].is_completed
      )
    })
  })

  it('displays the correct count of todo items left', async () => {
    const scope = nock(SUPABASE_API_BASE_URL)
      .get('/rest/v1/todos')
      .query(true)
      .reply(200, todos, { 'Access-Control-Allow-Origin': '*' })

    render(<TodosList />, { wrapper })

    await waitFor(() => scope.done())

    const itemsLeft = todos.filter(todo => !todo.is_completed).length

    screen.getByText(`${itemsLeft} items left`)
  })
})
