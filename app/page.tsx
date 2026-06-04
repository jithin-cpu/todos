import { createClient } from '@/utils/supabase/server'
import { addTodo } from './actions'
import TodoItem from '@/components/TodoItem'

export default async function Page() {
  const supabase = await createClient()

  const { data: todos } = await supabase.from('todos').select().order('id')

  return (
    <div style={{ padding: '40px 20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '20px' }}>Todos</h1>
      
      <form action={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
        <input 
          type="text" 
          name="name" 
          placeholder="What needs to be done?" 
          required 
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '4px', border: 'none', background: '#000', color: '#fff', cursor: 'pointer' }}>
          Add
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos?.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  )
}
