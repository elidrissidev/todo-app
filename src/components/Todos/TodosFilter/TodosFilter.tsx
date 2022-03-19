import './TodosFilter.css'
import { useTodos } from '@/hooks/useTodos'

export function TodosFilter() {
  const { setFilter, filter } = useTodos()
  return (
    <div className="TodosFilter">
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
  )
}
