'use server'

import { createClient } from '@/supabase/server'

export const authenticate = async (email: string, password: string) => {
  const supabase = await createClient()
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  } catch (error) {
    console.log('AUTHENTICATION ERROR', error)
    throw error
  }
}

export const getLatestUsers = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) throw new Error(`Error fetching latest users: ${error.message}`)

  return data.map((value, index, array) => {
    if ('id' in value && 'email' in value && 'created_at' in value) {
      return {
        id: value.id,
        email: value.email,
        date: value.created_at,
      }
    } else {
      throw new Error(
        `Invalid data at index ${index}: ${JSON.stringify(value)}`
      )
    }
  })
}
