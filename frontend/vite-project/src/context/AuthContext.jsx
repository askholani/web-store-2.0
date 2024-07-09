import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'
import axiosInstance, { axiosInstanceFile } from '../api/axiosAuth'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isPending, setPending] = useState(true)

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
    console.log('user', user)
    const path = user.emal_verified_at !== null ? '/profile' : '/verification'
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
    console.log('response', response)

    return response
  }
  // const completeProfile = async (name, phone, gender, photo) => {
  //   const formData = new FormData()

  //   console.log('photo:', photo)
  //   console.log('name:', name)
  //   console.log('phone:', phone)
  //   console.log('gender:', gender)

  //   formData.append('name', name)
  //   formData.append('phone', phone)
  //   formData.append('gender', gender)
  //   formData.append('photo', photo)

  //   // Log all entries in the FormData object
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value}`)
  //   }

  //   try {
  //     const token = localStorage.getItem('token')
  //     const response = await fetch(
  //       'http://127.0.0.1:8000/api/profile/complete',
  //       {
  //         method: 'POST',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           // No need to set 'Content-Type' header to multipart/form-data
  //           // It will be set automatically by the browser
  //         },
  //         body: formData,
  //       },
  //     )

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`)
  //     }

  //     const responseData = await response.json()
  //     console.log('responseData', responseData)
  //   } catch (error) {
  //     console.error('Error completing profile:', error)
  //   }
  // }

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
      }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthContext
