import './TodosList.css'
import { TodoItem } from '@/components/Todos/TodoItem'
import { TodosListFooter } from '@/components/Todos/TodosListFooter'
import { useTodos } from '@/hooks/useTodos'

export function TodosList() {
  const { todos, isLoadingTodos } = useTodos()
  return (
    <div className="TodosList" aria-busy={isLoadingTodos}>
      {isLoadingTodos && <div className="TodosList-loading">Loading...</div>}
      {!isLoadingTodos && todos?.length === 0 && (
        <div className="TodosList-notfound">Nothing to do</div>
      )}
      <ul className="TodosList-list">
        {todos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <TodosListFooter
        itemsLeft={todos?.filter(todo => !todo.is_completed).length}
        completedItems={todos?.filter(todo => todo.is_completed).length}
      />
    </div>
  )
}
