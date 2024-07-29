import { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { pageChange } from '../../utils/helpers'
import ProductContext from '../../context/ProductContext'

const BottomNav = () => {
  const { getStatusOrder } = useContext(ProductContext)
  const { user } = useContext(AuthContext)
  const getStatusOrderRef = useRef(getStatusOrder)
  const [statusOrder, setStatusOrder] = useState(null)

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
      }
    }
    handleGetStatus()
  }, [user])

  const { previousUrl } = useContext(AuthContext)
  console.log('statusOrder', statusOrder)

  const handlePageChange = ({ path }) => {
    const page = pageChange({ pathTo: path, location: location })
    previousUrl({ url: page.prevPath })
    localStorage.setItem('prevUrl', page.prevPath)
    navigate(page.nextPath)
  }

  return (
    <div className='btm-nav bg-slate-700 rounded-full mx-auto w-[90%]'>
      <a href='#'>
        <div className='rounded-full bg-slate-50 w-12 h-12 flex justify-center items-center'>
          <i className='fas fa-home text-xl'></i>
        </div>
      </a>
      <button
        disabled={statusOrder === null ? true : false}
        onClick={() =>
          handlePageChange({ path: `${statusOrder ? 'checkout' : 'cart'}` })
        }>
        <div className='rounded-full bg-slate-50 w-12 h-12 flex justify-center items-center'>
          <i className='fas fa-shopping-bag text-xl'></i>
        </div>
      </button>
      <div onClick={() => handlePageChange({ path: 'wishlist' })}>
        <div className='rounded-full bg-slate-50 w-12 h-12 flex justify-center items-center'>
          <i className='fas fa-heart text-xl'></i>
        </div>
      </div>
      <a href='#'>
        <div className='rounded-full bg-slate-50 w-12 h-12 flex justify-center items-center'>
          <i className='fas fa-comment-dots text-xl'></i>
        </div>
      </a>
      <a href='#'>
        <div className='rounded-full bg-slate-50 w-12 h-12 flex justify-center items-center'>
          <i className='fas fa-user text-xl'></i>
        </div>
      </a>
    </div>
  )
}

export default BottomNav
