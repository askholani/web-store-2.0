import { lazy, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import ProductContext from '../context/ProductContext'

const OrderList = lazy(() => import('../components/OrderList'))
const AlertConfirmation = lazy(() =>
  import('../components/Alert/AlertConfirmation'),
)

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const { fetchOrder, fetchPaymentToken, deleteOrder } =
    useContext(ProductContext)
  const { user } = useContext(AuthContext)
  const [order, setOrder] = useState(null)
  const [alertConfirmation, setAlertConfirmation] = useState(false)
  const [paymentToken, setPaymentToken] = useState(null)

  const fetchOrderRef = useRef(fetchOrder)

  useEffect(() => {
    const handleOrder = async () => {
      const res = await fetchOrderRef.current()
      if (res) {
        setIsLoading(false)
        setOrder(res.order)
      }
      console.log('res', res)
    }
    handleOrder()
  }, [])

  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'

    let scriptTag = document.createElement('script')
    scriptTag.src = midtransScriptUrl

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = 'your-client-key-goes-here'
    scriptTag.setAttribute('data-client-key', myMidtransClientKey)

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  // console.log('order', order)

  const handlePayment = async () => {
    if (paymentToken) {
      console.log('paymentToken', paymentToken)
      window.snap.pay(paymentToken, {
        onSuccess: function (result) {
          console.log('rest', result)
        },
        onPending: function (result) {
          console.log('rest', result)
        },
        onError: function (result) {
          console.log('rest', result)
        },
      })
    }

    const items = order.items.map((item) => {
      return {
        id: item.id,
        category: item.product.category,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        url: `product/${item.id}-${item.product.name}`,
      }
    })

    const customer = {
      name: user.name,
      email: user.email,
      phone: user.phone,
    }

    const transaction = {
      amount: parseInt(order.total_price * 1000),
    }

    const response = await fetchPaymentToken({ items, customer, transaction })
    console.log('response', response)
    if (response.success) {
      window.snap.pay(response.data, {
        onSuccess: function (result) {
          console.log('rest', result)
        },
        onPending: function (result) {
          console.log('rest', result)
        },
        onError: function (result) {
          console.log('rest', result)
        },
      })
      setPaymentToken(response.data)
    }
  }

  const handleCancelPayment = async () => {
    const result = await deleteOrder(order.id)
    if (result) {
      setAlertConfirmation(!alertConfirmation)
      navigate('/cart')
    }
  }

  const handleShowAlert = () => {
    setAlertConfirmation(!alertConfirmation)
  }

  return (
    <>
      {alertConfirmation && (
        <AlertConfirmation
          onHanldeShowAlert={handleShowAlert}
          onHandleDelete={handleCancelPayment}
          message='Are you sure you want to cancel this order?'
        />
      )}
      <main className='px-2 py-4 flex flex-col gap-y-8'>
        <section className='flex items-center justify-center relative'>
          <button
            onClick={handleShowAlert}
            className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center absolute left-0'>
            <i className='fas fa-arrow-left text-lg'></i>
          </button>
          <span className='font-semibold text-lg'>Checkout</span>
        </section>
        <section className='flex flex-col gap-y-3 text-start'>
          <div className='flex flex-col gap-y-2'>
            <span className='font-semibold text-lg'>Shipping Address</span>
            <div className='flex gap-x-2 items-center'>
              <i className='fas fa-map-marker-alt text-2xl'></i>
              <span className='font-semibold text-lg'>Home</span>
            </div>
            <div className='flex gap-x-8 pb-3 border-b border-b-slate-300'>
              <span className='opacity-70 line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                quod
              </span>
              <button className='border px-1 btn btn-sm font-semibold bg-white hover:bg-white border-slate-400 rounded-md'>
                CHANGE
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span className='font-semibold text-lg'>Choose Shipping Type</span>
            <div className='flex gap-x-2 items-center'>
              <i className='fas fa-cube text-2xl'></i>
              <span className='font-semibold text-lg'>Economy</span>
            </div>
            <div className='flex gap-x-8 pb-3 border-b border-b-slate-300'>
              <span className='opacity-70 line-clamp-2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                quod
              </span>
              <button className='border px-1 btn btn-sm font-semibold bg-white hover:bg-white border-slate-400 rounded-md'>
                CHANGE
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            <span className='font-semibold text-lg'>Order List</span>
            <OrderList isLoading={isLoading} data={order} />
          </div>
        </section>
        <section className='fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-t-slate-200 py-4 px-4'>
          <button
            onClick={handlePayment}
            className='btn btn-sm h-[3rem] rounded-3xl py-2 font-semibold bg-slate-500 hover:bg-slate-600 text-slate-50 w-full text-lg'>
            Continue to Payment
          </button>
        </section>
      </main>
    </>
  )
}

export default CheckoutPage
