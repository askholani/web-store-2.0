import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'
import axiosInstance, { axiosInstanceFile } from '../api/axiosAuth'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { determineRoute } from '../utils/helpers'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isPending, setPending] = useState(true)
  const [prevUrl, setPrevUrl] = useState('')

  const previousUrl = ({ url }) => {
    setPrevUrl(url)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // console.log('hallo')
      axiosInstance
        .post('/me')
        .then((response) => {
          setUser(response.data.user)
          setPending(false)
        })
        .catch(() => {
          setPending(false)
          localStorage.removeItem('token')
        })
    } else {
      setPending(false)
    }
  }, [])

  const location = useLocation()
  const currentUrl = location.pathname
  if (user && currentUrl === '/login') {
    const path = determineRoute(user)
    setTimeout(() => {
      navigate(path)
    }, 0)
  }

  const login = async (email, password) => {
    const response = await axiosInstance.post('/login', { email, password })
    localStorage.setItem('token', response.data.access_token)
    setUser(response.data.user)
    return response
  }

  const register = async (name, email, password) => {
    const response = await axiosInstance.post('/register', {
      name,
      email,
      password,
    })
    localStorage.setItem('token', response.data.access_token)
    setUser(response.data.user)
    return response
  }

  const resendCode = async () => {
    const response = await axiosInstance.get('/resend')
    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const verify = async (code) => {
    const combineCode = Object.values(code).join('')
    const data = {
      code: combineCode,
    }
    const response = await axiosInstance.post('/verify', data)
    return response
  }

  const completeProfile = async (name, phone, gender, photo) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('gender', gender)
    formData.append('photo', photo)
    const response = await axiosInstanceFile.post('/profile/complete', formData)

    return response
  }

  const getNewProduct = async (type = null, quantities = null) => {
    console.log('type', type)
    console.log('quantities', quantities)
    const response = await axiosInstance.get('/images', {
      params: {
        type: type,
        quantities: quantities,
      },
    })
    return response
  }

  const storeNewProduct = async (data) => {
    const response = await axiosInstance.post('/images/store', {
      data,
    })
    return response
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        resendCode,
        isPending,
        verify,
        completeProfile,
        getNewProduct,
        storeNewProduct,
        prevUrl,
        previousUrl,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthContext
