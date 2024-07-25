import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import ProductContext from '../context/ProductContext'
import CartList from '../components/Cart/CartList'

const CartPage = () => {
  const { prevUrl } = useContext(AuthContext)
  const { fetchCarts } = useContext(ProductContext)
  const fetchCartsRef = useRef(fetchCarts)
  const [carts, setCarts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const handleFetchCart = async () => {
      const res = await fetchCartsRef.current()
      console.log('res', res)
      if (res && isMounted) {
        setIsLoading(false)
      }
      setCarts(res)
      console.log('res', res)
    }

    handleFetchCart()

    return () => {
      isMounted = false
    }
  }, [])

  const url = prevUrl.length === 0 ? localStorage.getItem('prevUrl') : prevUrl
  return (
    <main className='px-2 py-4 flex flex-col gap-y-8'>
      <section className='flex items-center justify-center relative'>
        <Link
          to={url}
          className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center absolute left-0'>
          <i className='fas fa-arrow-left text-lg'></i>
        </Link>
        <span className='font-semibold text-lg'>My Cart</span>
      </section>
      <CartList data={carts} isLoading={isLoading} />
    </main>
  )
}

export default CartPage
