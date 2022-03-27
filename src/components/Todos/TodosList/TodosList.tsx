import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import './TodosList.css'
import { TodoItem } from '@/components/Todos/TodoItem'
import { TodosListFooter } from '@/components/Todos/TodosListFooter'
import { useTodos } from '@/hooks/useTodos'
import reorderArray from '@/utils/reorderArray'

export function TodosList() {
  const { todos, isLoadingTodos, filter, reorderTodos } = useTodos()

  const filteredTodos = (todos || []).filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.is_completed
      case 'completed':
        return todo.is_completed
      default:
        return true
    }
  })

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination || // dropped outside the todos list
      result.source.index === result.destination.index // dropped into the same index
    ) {
      return
    }

    const items = reorderArray(
      todos || [],
      result.source.index,
      result.destination.index
    )

    reorderTodos({
      todo_ids: items.map(todo => todo.id),
      source_index: result.source.index,
      destination_index: result.destination.index,
    })
  }

  return (
    <div className="TodosList" aria-busy={isLoadingTodos}>
      {isLoadingTodos && <div className="TodosList-loading">Loading...</div>}
      {!isLoadingTodos && filteredTodos.length === 0 && (
        <div className="TodosList-notfound">Nothing to do</div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos-list">
          {(provided, _) => (
            <ul
              className="TodosList-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {filteredTodos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <TodosListFooter />
    </div>
  )
}
