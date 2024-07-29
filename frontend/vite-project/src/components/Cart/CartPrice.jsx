import { useContext, useState } from 'react'
import { currencyFormat, pageChange } from '../../utils/helpers'
import ProductContext from '../../context/ProductContext'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const CartPrice = ({ cost }) => {
  const navigate = useNavigate()
  const { user, previousUrl } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const { sendToOrder } = useContext(ProductContext)

  const costSub = cost.total.reduce(
    (acc, curr) => acc + parseInt(curr.price) * curr.count,
    0,
  )

  const subFormat = currencyFormat({
    number: costSub,
    curr: 'IDR',
  }).split(',')[0]

  const total = costSub - 500 + 100
  const totalFormat = currencyFormat({
    number: total,
    curr: 'IDR',
  }).split(',')[0]

  const handleCheckout = async () => {
    setIsLoading(true)

    if (!user) {
      const path = `cart`
      const page = pageChange({ pathTo: path, location })
      previousUrl({ url: page.prevPath })
      navigate('/login?state=true')
      previousUrl(location.pathname)
    }
    const items = [
      ...cost.total.map((item) => ({
        product: item.product,
        color: item.color,
        size: item.size,
        image: item.image,
        quantity: item.count,
      })),
    ]

    const data = {
      items,
      user: user.id,
      status: 'unpaid',
      totalPrice: `${total}`,
      shippingType: 'Pickup',
      shippingAddress: 'Pickup',
      paymentType: 'Cash on Delivery',
    }

    const res = await sendToOrder(data)
    console.log('res', res)
    if (res) {
      setIsLoading(false)
      navigate('/checkout')
    }
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 px-2 py-4 flex flex-col gap-y-4 rounded-t-md shadow-lg border-t border-t-slate-400 z-10 bg-white'>
      <div className='flex flex-col gap-y-1 text-sm'>
        <div className='flex justify-between'>
          <span>Sub-Total</span>
          <span>{subFormat}.000</span>
        </div>
        <div className='flex justify-between'>
          <span>Delivery Free</span>
          <span>Rp 100.000</span>
        </div>
        <div className='flex justify-between'>
          <span>Discount</span>
          <span>Rp 500.000</span>
        </div>
      </div>
      <div className='flex justify-between text-sm'>
        <span>Total Cost</span>
        <span>{totalFormat}.000</span>
      </div>
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className='btn btn-sm h-[3rem] rounded-3xl py-2 font-semibold bg-slate-500 hover:bg-slate-600 text-slate-50 w-full text-lg'>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartPrice
