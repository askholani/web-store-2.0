import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import RegisterPage from './pages/Auth/RegisterPage'
import '@fortawesome/fontawesome-free/css/all.min.css'
import LoginPage from './pages/Auth/LoginPage'
import VerificationPage from './pages/Auth/VerificationPage'
import ProfilePage from './pages/ProgilePage'
import ProtectedRoute from './components/ProtectedRoute'
import LoaderPage from './pages/LoaderPage'
import { useEffect, useState } from 'react'
import ExperimentPage from './pages/ExperimentPage'
import ProductProviderRoutes from './routes/ProductProviderRoutes'
import { useQuery } from './utils/helpers'

function App() {
  const query = useQuery()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const path = location.pathname

  const state = query.get('state')

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    handleStart()
    const timeout = setTimeout(handleComplete, 1000) // Adjust timeout as needed

    return () => clearTimeout(timeout)
  }, [path])

  useEffect(() => {
    if (location.pathname === '/' && state !== 'true') {
      navigate('/product')
    }
  }, [location, navigate, state])

  return (
    <>
      {loading && <LoaderPage />}
      {!loading && (
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/verification'
            element={<ProtectedRoute element={<VerificationPage />} />}
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute element={<ProfilePage />}></ProtectedRoute>
            }
          />

          <Route path='/*' element={<ProductProviderRoutes />} />
          <Route path='/exp' element={<ExperimentPage />} />
        </Routes>
      )}
    </>
  )
}

export default App
