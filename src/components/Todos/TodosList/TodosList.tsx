import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import './TodosList.css'
import { TodoItem } from '@/components/Todos/TodoItem'
import { TodosListFooter } from '@/components/Todos/TodosListFooter'
import { useTodos } from '@/hooks/useTodos'

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function TodosList() {
  const { todos, isLoadingTodos, filter } = useTodos()

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

    const items = reorder(
      todos || [],
      result.source.index,
      result.destination.index
    )

    console.log(items)
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
