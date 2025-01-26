'use server'

import { createClient } from '@/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendNotification } from './notifications'

export const getOrdersWithProducts = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('order')
    .select('*, order_items:order_item(*, product(*)), user(*)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return data
}

export const updateOrderStatus = async (orderId: number, status: string) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('order')
    .update({ status })
    .eq('id', orderId)

  if (error) throw new Error(error.message)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const userId = session?.user.id!

  await sendNotification(userId, status + ' 🚀')

  revalidatePath('/admin/orders')
}

export const getMonthlyOrders = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('order').select('created_at')

  if (error) throw new Error(error.message)

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const ordersByMonth = data.reduce(
    (acc: Record<string, number>, order: { created_at: string }) => {
      const date = new Date(order.created_at)
      const month = monthNames[date.getUTCMonth()] // Get the month name

      // Increment the count for this month
      if (!acc[month]) acc[month] = 0
      acc[month]++

      return acc
    },
    {}
  )

  return Object.keys(ordersByMonth).map((month) => ({
    name: month,
    orders: ordersByMonth[month],
  }))
}


// create
// or replace function public.handle_new_user () returns trigger as $$
// begin
//   if new.raw_user_meta_data->>'avatar_url' is null or new.    raw_user_meta_data->>'avatar_url' = '' then
//   new.raw_user_meta_data = jsonb_set(new.raw_user_meta_data,'{avatar_url}','"https://xsgames.co/randomusers/avatar.php?g=male"'::jsonb);
//   end if;
//   insert into public.users (id, email, avatar_url)
//   values (new.id, new.email, new.raw_user_meta_data->>'avatar_url');
//   return new;
// end;
// $$ language plPgsqlsecurity definer