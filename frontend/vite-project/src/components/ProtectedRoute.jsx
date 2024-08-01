import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import VerificationPage from '../pages/Auth/VerificationPage'

// const ProtectedRoute = ({ element: Component }) => {
const ProtectedRoute = () => {
  const { user, isPending } = useContext(AuthContext)

  if (isPending) {
    return <div>Loading...</div>
  }

  if (user) {
    if (user.email_verified_at === null) {
      return <VerificationPage />
    }
    // return Component
    return <Outlet />
  }
  return <Navigate to='/login' />
}

// ProtectedRoute.propTypes = {
//   element: PropTypes.node.isRequired,
// }

export default ProtectedRoute
