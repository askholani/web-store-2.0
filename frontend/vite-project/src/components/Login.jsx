import { useFormik } from 'formik'
import * as yup from 'yup'
import { useContext, useState } from 'react'
import InputComp from './InputComp'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { determineRoute } from '../utils/helpers'

const Login = () => {
  const { login } = useContext(AuthContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsSubmitting(true)
      setApiError(null)
      try {
        const result = await login(values.email, values.password)
        if (result.status === 200) {
          setSuccessMessage('Login successful.')
          const route = determineRoute(result.data.user)
          setTimeout(() => {
            navigate(route)
          }, 2000)
        }
      } catch (error) {
        setApiError(error.message || 'An error occurred')
      } finally {
        setIsSubmitting(false)
      }
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
      password: yup.string().required('Password is required'),
      checked: yup.boolean(),
    }),
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col gap-y-6 text-sm'>
      <div className='flex flex-col gap-y-4'>
        <InputComp formikD={formik} name='email' type='email' />
        <InputComp formikD={formik} name='password' type='password' />
        <div className='flex justify-end'>
          <a href='' className='font-semibold underline'>
            Forgot Password?
          </a>
        </div>
      </div>
      <button
        type='submit'
        className='w-full rounded-full text-center bg-slate-700 text-white py-3 font-semibold'
        disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Sign In'}
      </button>
      {apiError && <p className='text-red-500'>{apiError}</p>}
      {successMessage && <p className='text-green-500'>{successMessage}</p>}
    </form>
  )
}

export default Login
