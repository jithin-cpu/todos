'use client'

import { useTransition } from 'react'
import { toggleTodo, deleteTodo } from '@/app/actions'

export default function TodoItem({ todo }: { todo: any }) {
  const [isPending, startTransition] = useTransition()

  return (
    <li className={`todo-item ${todo.is_complete ? 'completed' : ''}`}>
      <div 
        className="todo-checkbox-wrapper"
        onClick={() => {
          if (!isPending) {
            startTransition(() => {
              toggleTodo(todo.id, todo.is_complete)
            })
          }
        }}
      >
        {todo.is_complete ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        )}
      </div>
      
      <span className="todo-text">
        {todo.name}
      </span>
      
      <button 
        className="delete-button"
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            deleteTodo(todo.id)
          })
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </li>
  )
}
