import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import './TodoItem.css'
import { ReactComponent as IconCross } from '@/assets/icon-cross.svg'
import { Checkbox } from '@/components/Checkbox'
import { useTodos } from '@/hooks/useTodos'
import { Todo } from '@/types'
import classNames from '@/utils/classNames'

type TodoItemProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { completeTodo, isUpdatingTodo, removeTodo } = useTodos()

  const ref = useRef<HTMLLIElement>(null)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'TODO_ITEM',
      collect: monitor => ({ isDragging: monitor.isDragging() }),
      end(_, monitor) {
        const dropResult = monitor.getDropResult<{ id: number }>()

        if (dropResult?.id === todo.id) {
          return
        }

        // perform mutation
      },
    }),
    [todo.id]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'TODO_ITEM',
      drop: () => ({ id: todo.id }),
    }),
    [todo.id]
  )

  drag(drop(ref))

  return (
    <li
      ref={ref}
      className={classNames(
        'TodoItem',
        todo.is_completed ? 'TodoItem--done' : undefined
      )}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <label htmlFor={`todo-${todo.id}-completed`} className="visually-hidden">
        Todo Completed
      </label>
      <Checkbox
        id={`todo-${todo.id}-completed`}
        defaultChecked={todo.is_completed}
        disabled={isUpdatingTodo}
        onChange={e =>
          completeTodo({ id: todo.id, completed: e.target.checked })
        }
      />
      <span className="TodoItem-title">{todo.title}</span>
      <button
        type="button"
        className="TodoItem-remove"
        onClick={() => removeTodo(todo.id)}
      >
        <IconCross />
        <span className="visually-hidden">Remove Todo</span>
      </button>
    </li>
  )
}
