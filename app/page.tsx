import { createClient } from '@/utils/supabase/server'
import { addTodo, clearCompletedTodos } from './actions'
import TodoItem from '@/components/TodoItem'

export default async function Page() {
  const supabase = await createClient()

  const { data: todos } = await supabase.from('todos').select().order('id')

  return (
    <div className="todo-container">
      <div className="header-container">
        <h1 className="header-title">
          TOD
          <span className="header-title-check">
            O
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        </h1>
      </div>

      <div className="tabs-container">
        <div className="tab active">Personal</div>
        <div className="tab">Professional</div>
      </div>

      <form action={addTodo} className="input-form">
        <input
          type="text"
          name="name"
          placeholder="What do you need to do?"
          required
          className="input-field"
        />
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>

      <div className="list-card">
        <ul className="todo-list">
          {todos?.map((todo: any) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {(!todos || todos.length === 0) && (
            <li style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No tasks yet. Add one above!
            </li>
          )}
        </ul>

        {todos && todos.length > 0 && (
          <div className="list-footer">
            <form action={clearCompletedTodos}>
              <button type="submit" className="clear-button">
                Clear Completed
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
