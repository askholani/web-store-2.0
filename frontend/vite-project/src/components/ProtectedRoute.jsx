import PropTypes from 'prop-types'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ProtectedRoute = ({ element: Component }) => {
  const { user, isPending } = useContext(AuthContext)

  if (isPending) {
    return <div>Loading...</div>
  }

  return user ? Component : <Navigate to='/login' />
}

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
}

export default ProtectedRoute
