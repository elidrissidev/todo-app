import React, { createContext, useContext, useMemo, useState } from 'react'
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

import {
  createTodo,
  CreateTodoRequest,
  completeTodo,
  CompleteTodoRequest,
  getTodos,
  removeTodo,
  clearCompletedTodos,
  ReorderTodosRequest,
  reorderTodos,
} from '@/api'
import { Todo } from '@/types'
import reorderArray from '@/utils/reorderArray'

interface TodosContextValue {
  todos?: Todo[]
  filter: Filter
  isLoadingTodos: boolean
  isUpdatingTodo: boolean
  createTodo: UseMutateFunction<Todo, Error, CreateTodoRequest>
  completeTodo: UseMutateFunction<Todo, Error, CompleteTodoRequest>
  removeTodo: UseMutateFunction<null, Error, number>
  clearCompletedTodos: UseMutateFunction<null, Error>
  reorderTodos: UseMutateFunction<void, Error, ReorderTodosRequest>
  setFilter: (filter: Filter) => void
}

export type Filter = 'all' | 'active' | 'completed'

const TodosContext = createContext<TodosContextValue | null>(null)

export const TodosProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState<Filter>('all')

  const queryClient = useQueryClient()

  const { data: todos, isLoading: isLoadingTodos } = useQuery<Todo[]>(
    'todos',
    getTodos
  )

  const createTodoMutation = useMutation<Todo, Error, CreateTodoRequest>(
    createTodo,
    {
      onMutate: async ({ title, is_completed }) => {
        await queryClient.cancelQueries('todos')

        const prevTodos = queryClient.getQueryData<Todo[]>('todos')

        queryClient.setQueryData('todos', [
          {
            id: -1,
            title,
            is_completed,
            created_at: new Date().toISOString(),
          },
          ...(prevTodos || []),
        ])

        return { prevTodos }
      },
      onError: (_, __, context: any) => {
        queryClient.setQueryData('todos', context.prevTodos)
      },
      onSettled: () => queryClient.invalidateQueries('todos'),
    }
  )

  const completeTodoMutation = useMutation<Todo, Error, CompleteTodoRequest>(
    completeTodo,
    {
      onMutate: async ({ id, completed }) => {
        await queryClient.cancelQueries('todos')

        const prevTodos = queryClient.getQueryData<Todo[]>('todos')

        queryClient.setQueryData(
          'todos',
          prevTodos?.map(todo =>
            todo.id === id ? { ...todo, is_completed: completed } : todo
          )
        )

        return { prevTodos }
      },
      onError: (_, __, context: any) => {
        queryClient.setQueryData('todos', context.prevTodos)
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos')
      },
    }
  )

  const removeTodoMutation = useMutation<null, Error, number>(removeTodo, {
    onMutate: async (id: number) => {
      await queryClient.cancelQueries('todos')

      const prevTodos = queryClient.getQueryData<Todo[]>('todos')

      queryClient.setQueryData(
        'todos',
        prevTodos?.filter(todo => todo.id !== id)
      )

      return { prevTodos }
    },
    onError: (_, __, context: any) => {
      queryClient.setQueryData('todos', context.prevTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const clearCompletedTodosMutation = useMutation<null, Error>(
    clearCompletedTodos,
    {
      onMutate: async () => {
        await queryClient.cancelQueries('todos')

        const prevTodos = queryClient.getQueryData<Todo[]>('todos')

        queryClient.setQueryData(
          'todos',
          prevTodos?.filter(todo => !todo.is_completed)
        )

        return { prevTodos }
      },
      onError: (_, __, context: any) => {
        queryClient.setQueryData('todos', context.prevTodos)
      },
      onSettled: () => queryClient.invalidateQueries('todos'),
    }
  )

  const reorderTodosMutation = useMutation<void, Error, ReorderTodosRequest>(
    reorderTodos,
    {
      onMutate: async ({ source_index, destination_index }) => {
        await queryClient.cancelQueries('todos')

        const prevTodos = queryClient.getQueryData<Todo[]>('todos')

        queryClient.setQueryData(
          'todos',
          reorderArray(prevTodos || [], source_index, destination_index)
        )

        return { prevTodos }
      },
      onError: (_, __, context: any) => {
        queryClient.setQueryData('todos', context.prevTodos)
      },
      onSettled: () => queryClient.invalidateQueries('todos'),
    }
  )

  const value = useMemo(
    () => ({
      todos,
      filter,
      isLoadingTodos,
      isUpdatingTodo: completeTodoMutation.isLoading,
      isCreatingTodo: createTodoMutation.isLoading,
      createTodo: createTodoMutation.mutate,
      completeTodo: completeTodoMutation.mutate,
      removeTodo: removeTodoMutation.mutate,
      clearCompletedTodos: clearCompletedTodosMutation.mutate,
      reorderTodos: reorderTodosMutation.mutate,
      setFilter,
    }),
    [
      todos,
      filter,
      isLoadingTodos,
      completeTodoMutation.isLoading,
      createTodoMutation.isLoading,
      createTodoMutation.mutate,
      completeTodoMutation.mutate,
      removeTodoMutation.mutate,
      clearCompletedTodosMutation.mutate,
      reorderTodosMutation.mutate,
    ]
  )

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}

export function useTodos() {
  const context = useContext(TodosContext)

  if (!context) {
    throw new Error('useTodos must be called within a TodosProvider')
  }

  return context
}
