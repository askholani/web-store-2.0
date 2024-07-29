import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import ProductContext from '../context/ProductContext'
import CartList from '../components/Cart/CartList'
import CartPrice from '../components/Cart/CartPrice'

const CartPage = () => {
  const { prevUrl, user } = useContext(AuthContext)
  const { fetchCarts, deleteCart } = useContext(ProductContext)
  const fetchCartsRef = useRef(fetchCarts)
  const [carts, setCarts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cost, setCost] = useState({
    total: [],
    delivery: null,
    discount: null,
  })

  useEffect(() => {
    let isMounted = true
    const handleFetchCart = async () => {
      const res = await fetchCartsRef.current()
      if (res && isMounted) {
        setIsLoading(false)
        const costInitialData = res.cart.map((value) => ({
          count: value.count,
          price: value.product.price,
          id: value.id,
          color: value.color,
          product: value.product.id,
          image: value.image,
          size: value.size,
        }))
        setCost((prev) => ({ ...prev, total: costInitialData }))
      }
      console.log('res', res)
      setCarts(res)
    }

    handleFetchCart()

    return () => {
      isMounted = false
    }
  }, [])

  const handleProductCount = (data) => {
    setCost((prev) => {
      const existingProductIndex = prev.total.findIndex(
        (item) => item.id === data.id,
      )

      const updatedTotal =
        existingProductIndex !== -1
          ? prev.total.map((item, index) =>
              index === existingProductIndex
                ? { ...item, count: data.count }
                : item,
            )
          : [...prev.total, { ...data, count: data.count }]

      return {
        ...prev,
        total: updatedTotal,
      }
    })
  }

  const handleDeleteCart = async ({ id }) => {
    const res = await deleteCart(id)
    console.log('res', res)
    if (res) {
      const newCostTotal = cost.total.filter((item) => item.id !== id)
      const newCarts = carts.cart.data.filter((item) => item.id !== id)
      setCarts((prev) => ({ ...prev, cart: { ...prev.cart, data: newCarts } }))
      setCost((prev) => ({ ...prev, total: newCostTotal }))
    }
  }

  const url = prevUrl.length === 0 ? localStorage.getItem('prevUrl') : prevUrl
  return (
    <main className='px-2 pt-4 flex flex-col gap-y-8 pb-48'>
      <section className='flex items-center justify-center relative'>
        <Link
          to={url}
          className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center absolute left-0'>
          <i className='fas fa-arrow-left text-lg'></i>
        </Link>
        <span className='font-semibold text-lg'>My Cart</span>
      </section>
      <CartList
        onHandleCartDelete={handleDeleteCart}
        data={carts}
        isLoading={isLoading}
        onHandleProductCount={handleProductCount}
      />
      <CartPrice cost={cost} user={user} />
    </main>
  )
}

export default CartPage
