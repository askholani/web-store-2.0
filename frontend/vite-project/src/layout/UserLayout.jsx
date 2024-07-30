import BottomNav from '../components/Navigation/BottomNav'
import Sidebar from '../components/Navigation/Sidebar'

const UserLayout = ({ children }) => {
  return (
    <div className='drawer'>
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {children}
        <BottomNav />
      </div>
      <Sidebar />
    </div>
  )
}

export default UserLayout
