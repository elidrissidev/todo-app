import './TodosListFooter.css'
import { useTodos } from '@/hooks/useTodos'

export function TodosListFooter() {
  const { todos, clearCompletedTodos, setFilter, filter } = useTodos()

  const itemsLeft = todos?.filter(todo => !todo.is_completed).length
  const completedItems = todos?.filter(todo => todo.is_completed).length

  return (
    <div className="TodosListFooter">
      <span className="TodosListFooter-items-left">{itemsLeft} items left</span>
      <div className="TodosListFooter-filters">
        <button
          type="button"
          className="TodosFilter-filter"
          onClick={() => setFilter('all')}
          aria-label="Filter by all todos"
          aria-pressed={filter === 'all'}
        >
          All
        </button>
        <button
          type="button"
          className="TodosFilter-filter"
          onClick={() => setFilter('active')}
          aria-label="Filter by active todos"
          aria-pressed={filter === 'active'}
        >
          Active
        </button>
        <button
          type="button"
          className="TodosFilter-filter"
          onClick={() => setFilter('completed')}
          aria-label="Filter by completed todos"
          aria-pressed={filter === 'completed'}
        >
          Completed
        </button>
      </div>
      <button
        type="button"
        className="TodosListFooter-clear-completed"
        onClick={() => clearCompletedTodos()}
        disabled={completedItems === 0}
      >
        Clear Completed
      </button>
    </div>
  )
}
