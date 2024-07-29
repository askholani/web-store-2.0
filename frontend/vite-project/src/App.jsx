import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ProtectedRoute from './components/ProtectedRoute'
import LoaderPage from './pages/LoaderPage'
import { lazy, Suspense, useEffect } from 'react'
import ProductProviderRoutes from './routes/ProductProviderRoutes'
import { useQuery } from './utils/helpers'

const LoginPage = lazy(() => import('./pages/Auth/LoginPage'))
const VerificationPage = lazy(() => import('./pages/Auth/VerificationPage'))
const ProfilePage = lazy(() => import('./pages/ProgilePage'))
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'))

function App() {
  const query = useQuery()
  const navigate = useNavigate()
  const location = useLocation()

  const state = query.get('state')

  useEffect(() => {
    if (location.pathname === '/' && state !== 'true') {
      navigate('/product')
    }
  }, [location, navigate, state])

  return (
    <>
      <Suspense fallback={<LoaderPage />}>
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
          {/* <Route path='/exp' element={<ExperimentPage />} /> */}
        </Routes>
      </Suspense>
    </>
  )
}

export default App
