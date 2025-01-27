import { createClient } from '@/supabase/server'
import { redirect } from 'next/navigation'
import UsersPageComponent from './page-component'

export default async function Users() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth')
  }

  // Fetch users
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching users:', error)
    return <div>Error loading users</div>
  }

  return <UsersPageComponent users={users} />
}