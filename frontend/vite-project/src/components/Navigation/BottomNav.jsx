import { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { pageChange } from '../../utils/helpers'
import ProductContext from '../../context/ProductContext'

const BottomNav = () => {
  const { getStatusOrder } = useContext(ProductContext)
  const { user } = useContext(AuthContext)
  const getStatusOrderRef = useRef(getStatusOrder)
  const [statusOrder, setStatusOrder] = useState(null)
  console.log('statusOrder', statusOrder)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleGetStatus = async () => {
      if (user) {
        const statusOrder = await getStatusOrderRef.current({
          id: user.id,
          status: 'unpaid',
        })
        setStatusOrder(statusOrder.success)
      } else {
        setStatusOrder(false)
      }
    }
    handleGetStatus()
  }, [user])

  const { previousUrl } = useContext(AuthContext)
  // console.log('statusOrder', statusOrder)

  const handlePageChange = ({ path }) => {
    const page = pageChange({ pathTo: path, location: location })
    previousUrl({ url: page.prevPath })
    localStorage.setItem('prevUrl', page.prevPath)
    navigate(page.nextPath)
  }

  // console.log('location', location)

  return (
    <div className='btm-nav bg-slate-700 rounded-full mx-auto w-[90%]'>
      <Link to={'/product'}>
        <div
          className={`rounded-full ${
            location.pathname === '/product'
              ? ' bg-slate-50 text-slate-700'
              : 'text-white border border-white'
          } w-12 h-12 flex justify-center items-center`}>
          <i className='fas fa-home text-xl'></i>
        </div>
      </Link>
      <button
        disabled={statusOrder === null ? true : false}
        onClick={() =>
          handlePageChange({
            path: `${statusOrder ? 'product/cart/checkout' : 'product/cart'}`,
          })
        }>
        <div
          className={`rounded-full ${
            location.pathname === '/checkout' || location.pathname === '/cart'
              ? 'bg-slate-50 text-slate-700'
              : 'text-white border border-white'
          } w-12 h-12 flex justify-center items-center`}>
          <i className='fas fa-shopping-bag text-xl'></i>
        </div>
      </button>
      <div onClick={() => handlePageChange({ path: 'product/wishlist' })}>
        <div
          className={`rounded-full ${
            location.pathname === '/wishlist'
              ? ' bg-slate-50 text-slate-700'
              : 'text-white border border-white'
          } w-12 h-12 flex justify-center items-center`}>
          <i className='fas fa-heart text-xl'></i>
        </div>
      </div>
      <a href='#'>
        <div
          className={`rounded-full ${
            location.pathname === '/chat'
              ? ' bg-slate-50 text-slate-700'
              : 'text-white border border-white'
          } w-12 h-12 flex justify-center items-center`}>
          <i className='fas fa-comment-dots text-xl'></i>
        </div>
      </a>
      <a href='#'>
        <label
          htmlFor='my-drawer'
          className={`rounded-full ${
            location.pathname === '/user'
              ? ' bg-slate-50 text-slate-700'
              : 'text-white border border-white'
          } w-12 h-12 flex justify-center items-center drawer-button`}>
          <i className='fas fa-bars text-xl'></i>
        </label>
      </a>
    </div>
  )
}

export default BottomNav
