import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import RegisterPage from './pages/Auth/RegisterPage'
import '@fortawesome/fontawesome-free/css/all.min.css'
import LoginPage from './pages/Auth/LoginPage'
import VerificationPage from './pages/Auth/VerificationPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoaderPage from './pages/LoaderPage'
import { useEffect, useState } from 'react'

function App() {
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    handleStart()
    const timeout = setTimeout(handleComplete, 1000) // Adjust timeout as needed

    return () => clearTimeout(timeout)
  }, [location])
  console.log(loading)
  return (
    <>
      {loading && <LoaderPage />}
      <Routes>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route
          path='/verification'
          element={<ProtectedRoute element={<VerificationPage />} />}></Route>
      </Routes>
    </>
  )
}

export default App
