import BottomNav from '../components/Navigation/BottomNav'

const UserLayout = ({ children }) => {
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}

export default UserLayout
