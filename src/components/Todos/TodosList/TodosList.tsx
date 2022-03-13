import { useQuery } from 'react-query'

import './TodosList.css'
import { getTodos } from '@/api'
import { TodoItem } from '@/components/Todos/TodoItem'
import { Todo } from '@/types'

export function TodosList() {
  const { data: todos } = useQuery<Todo[]>('todos', getTodos)
  return (
    <div className="TodosList">
      <ul className="TodoList-list">
        {todos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <TodoListFooter
        itemsLeft={todos?.filter(todo => !todo.is_completed).length}
      />
    </div>
  )
}

type TodoListFooterProps = {
  itemsLeft?: number
}

function TodoListFooter({ itemsLeft = 0 }: TodoListFooterProps) {
  return (
    <div className="TodoList-footer">
      <span className="TodoList-items-left">{itemsLeft} items left</span>
      <button type="button" className="TodoList-clear-completed">
        Clear Completed
      </button>
    </div>
  )
}
