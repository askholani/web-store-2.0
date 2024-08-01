import { lazy, useContext, useEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import ProductContext from '../context/ProductContext'
import { useQuery } from '../utils/helpers'

const CartList = lazy(() => import('../components/Cart/CartList'))
const CartPrice = lazy(() => import('../components/Cart/CartPrice'))

const CartPage = () => {
  const data = useLoaderData()

  const { prevUrl } = useContext(AuthContext)
  const { deleteCart, getStatusOrder } = useContext(ProductContext)
  const getStatusOrderRef = useRef(getStatusOrder)
  const query = useQuery()
  const shipping = query.get('shipping')

  const [carts, setCarts] = useState(() => {
    if (data.success) {
      return data
    }
  })

  const [cost, setCost] = useState(() => {
    if (data.success) {
      const costInitialData = data.cart.map((value) => ({
        count: value.count,
        price: value.product.price,
        id: value.id,
        color: value.color,
        product: value.product.id,
        image: value.image,
        size: value.size,
      }))
      return {
        total: costInitialData,
        delivery: null,
        discount: null,
      }
    }
  })

  const [statusOrder, setStatusOrder] = useState(null)

  useEffect(() => {
    const handleFetchCart = async () => {
      try {
        const resStatus = await getStatusOrderRef.current({
          status: 'unpaid',
        })
        setStatusOrder(resStatus.success)
      } catch (error) {
        console.error('Error fetching cart or status:', error)
      }
    }

    handleFetchCart()
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
      <section className='flex text-start'>
        <div className='flex flex-col gap-y-2'>
          <span className='font-semibold text-lg'>Choose Shipping Type</span>
          <div className='flex gap-x-2 items-center'>
            <i className='fas fa-cube text-2xl'></i>
            <span className='font-semibold text-lg capitalize'>
              {shipping ? shipping : 'economy'}
            </span>
          </div>
          <div className='flex gap-x-8 pb-3 border-b border-b-slate-300'>
            <span className='opacity-70 line-clamp-2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quod
            </span>
            <Link
              to={'shipping-type'}
              className='border px-1 btn btn-sm font-semibold bg-white hover:bg-white border-slate-400 rounded-md cursor-pointer'>
              CHANGE
            </Link>
          </div>
        </div>
      </section>
      <CartList
        onHandleCartDelete={handleDeleteCart}
        data={carts}
        onHandleProductCount={handleProductCount}
      />
      <CartPrice cost={cost} status={statusOrder} shippingType={shipping} />
    </main>
  )
}

export default CartPage
