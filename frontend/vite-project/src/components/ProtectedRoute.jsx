import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import VerificationPage from '../pages/Auth/VerificationPage'

const ProtectedRoute = ({ element: Component }) => {
  const location = useLocation()
  const { user, isPending } = useContext(AuthContext)

  console.log('location', location)

  if (isPending) {
    return <div>Loading...</div>
  }

  if (user) {
    if (user.email_verified_at === null) {
      return <VerificationPage />
    }
    return Component
  }
  return <Navigate to='/login' />
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
}

export default ProtectedRoute
