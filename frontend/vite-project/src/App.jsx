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
import UserLayout from './layout/UserLayout'
import ExperimentPage from './pages/ExperimentPage'
import ProductProviderRoutes from './routes/ProductProviderRoutes'

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    handleStart()
    const timeout = setTimeout(handleComplete, 1000) // Adjust timeout as needed

    return () => clearTimeout(timeout)
  }, [location])

  if (location.pathname === '/') {
    navigate('/product')
    return
  }

  return (
    <>
      {loading && <LoaderPage />}
      {!loading && (
        <Routes>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route
            path='/verification'
            element={<ProtectedRoute element={<VerificationPage />} />}></Route>
          <Route
            path='/profile'
            element={
              <ProtectedRoute element={<ProfilePage />}></ProtectedRoute>
            }></Route>
          <Route
            path='/*'
            element={
              <UserLayout>
                <ProductProviderRoutes />
              </UserLayout>
            }
          />
          <Route path='/exp' element={<ExperimentPage />}></Route>
        </Routes>
      )}
    </>
  )
}

export default App
