import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='drawer-side'>
      <label
        htmlFor='my-drawer'
        aria-label='close sidebar'
        className='drawer-overlay'></label>
      <ul className='menu bg-base-200 text-base-content min-h-full w-80 p-4'>
        <li className='mb-4'>
          <div className='flex justify-center'>
            <span className='text-2xl bg-slate-600 w-8 h-8 rounded-full text-white flex justify-center font-semibold'>
              k
            </span>
            <span className='text-2xl'>fashion</span>
          </div>
        </li>
        <li>
          <Link to={'/profile'} className='grid grid-cols-12'>
            <i className='fas fa-user col-span-2 text-lg'></i>
            <span className='col-span-10 text-lg font-semibold'>Profile</span>
          </Link>
        </li>
        <li>
          <Link to={'/order'} className='grid grid-cols-12'>
            <i className='fas fa-shipping-fast col-span-2 text-lg'></i>
            <span className='col-span-10 text-lg font-semibold'>Order</span>
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className='grid grid-cols-12'>
            <i className='fas fa-sign-out-alt col-span-2 text-lg'></i>
            <a className='col-span-10 text-lg font-semibold'>Logout</a>
          </button>
        </li>
        <li>
          <Link to={'/setting'} className='grid grid-cols-12'>
            <i className='fas fa-cog col-span-2 text-lg'></i>
            <a className='col-span-10 text-lg font-semibold'>Setting</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
export default Sidebar
