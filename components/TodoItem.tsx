'use client'

import { useTransition } from 'react'
import { toggleTodo } from '@/app/actions'

export default function TodoItem({ todo }: { todo: any }) {
  const [isPending, startTransition] = useTransition()

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <input
        type="checkbox"
        checked={todo.is_complete}
        onChange={() => {
          startTransition(() => {
            toggleTodo(todo.id, todo.is_complete)
          })
        }}
        disabled={isPending}
        style={{ cursor: 'pointer', width: '18px', height: '18px' }}
      />
      <span style={{ 
        textDecoration: todo.is_complete ? 'line-through' : 'none',
        color: todo.is_complete ? '#888' : 'inherit',
        fontSize: '18px'
      }}>
        {todo.name}
      </span>
    </li>
  )
}
