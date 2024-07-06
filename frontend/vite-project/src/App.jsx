import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/Auth/RegisterPage'
import '@fortawesome/fontawesome-free/css/all.min.css'
import LoginPage from './pages/Auth/LoginPage'
import VerificationPage from './pages/Auth/VerificationPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
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
