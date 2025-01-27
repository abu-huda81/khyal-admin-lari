import { Database } from '@/supabase/types'

export type UserType = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type UsersPageProps = {
  users: UserType[]
}