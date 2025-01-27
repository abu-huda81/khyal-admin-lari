import { getOrdersWithProducts } from '@/actions/orders'
import PageComponent from '@/app/admin/orders/page-component'
import { OrdersWithProducts } from '@/app/admin/orders/types'

const Orders = async () => {
  const ordersWithProducts = await getOrdersWithProducts() as unknown as OrdersWithProducts

  if (!ordersWithProducts)
    return <div className='text-center font-bold text-2xl'>No orders found</div>
    
  return (
    <div>
      <PageComponent ordersWithProducts={ordersWithProducts} />
    </div>
  )
}

export default Orders
