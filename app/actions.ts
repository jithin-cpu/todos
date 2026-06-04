'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addTodo(formData: FormData) {
  const name = formData.get('name') as string
  if (!name) return

  const supabase = await createClient()
  await supabase.from('todos').insert({ name, is_complete: false })

  revalidatePath('/')
}

export async function toggleTodo(id: number, is_complete: boolean) {
  const supabase = await createClient()
  await supabase.from('todos').update({ is_complete: !is_complete }).eq('id', id)
  
  revalidatePath('/')
}
