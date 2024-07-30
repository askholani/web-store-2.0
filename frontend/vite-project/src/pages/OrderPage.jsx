import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import CartComp from '../components/Cart/CartComp'

const OrderPage = () => {
  const { prevUrl } = useContext(AuthContext)

  return (
    <main className='px-2 py-4 flex flex-col gap-y-8'>
      <section className='flex items-center justify-center relative'>
        <Link
          to={prevUrl}
          className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center absolute left-0'>
          <i className='fas fa-arrow-left text-lg'></i>
        </Link>
        <span className='font-semibold text-lg'>My Orders</span>
      </section>
      <section className='flex justify-around text-lg font-semibold opacity-80 border-b-2 border-b-slate-300 pb-4'>
        <Link>Active</Link>
        <Link>Completed</Link>
        <Link>Cancelled</Link>
      </section>
      <section>
        <CartComp type='order' />
      </section>
    </main>
  )
}

export default OrderPage
