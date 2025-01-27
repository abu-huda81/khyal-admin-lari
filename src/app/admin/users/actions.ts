'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'
import { UserInsert, UserUpdate } from './users.types'

export async function createUser(userData: UserInsert) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/users')
  return data
}

export async function updateUser(id: string, userData: UserUpdate) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/users')
  return data
}

export async function deleteUser(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/users')
}