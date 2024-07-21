import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { pageChange } from '../../utils/helpers'

const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { previousUrl } = useContext(AuthContext)

  const handlePageChange = ({ path }) => {
    const page = pageChange({ pathTo: path, location: location })
    previousUrl({ url: page.prevPath })
    localStorage.setItem('prevUrl', page.prevPath)
    console.log('page', page.prevPath)
    navigate(page.nextPath)
  }
  return (
    <div className='btm-nav bg-slate-700 rounded-full mx-auto w-[90%]'>
      <a href='#'>
        <div className='rounded-full bg-slate-50 w-12 h-12 flex justify-center items-center'>
          <i className='fas fa-home text-xl'></i>
        </div>
      </a>
      <a href='#'>
        <div className='rounded-full bg-slate-50 w-12 h-12 flex justify-center items-center'>
          <i className='fas fa-shopping-bag text-xl'></i>
        </div>
      </a>
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
