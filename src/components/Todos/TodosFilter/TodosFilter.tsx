import './TodosFilter.css'
import { useTodos } from '@/hooks/useTodos'

export function TodosFilter() {
  const { setFilter } = useTodos()
  return (
    <div className="TodosFilter">
      <button
        type="button"
        className="TodosFilter-filter"
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        type="button"
        className="TodosFilter-filter"
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button
        type="button"
        className="TodosFilter-filter"
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
  )
}
