import './TodosListFooter.css'
import { useTodos } from '@/hooks/useTodos'

type TodosListFooterProps = {
  itemsLeft?: number
  completedItems?: number
}

export function TodosListFooter({
  itemsLeft = 0,
  completedItems = 0,
}: TodosListFooterProps) {
  const { clearCompletedTodos } = useTodos()
  return (
    <div className="TodosListFooter">
      <span className="TodosListFooter-items-left">{itemsLeft} items left</span>
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
