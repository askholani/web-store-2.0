import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import InputComp from './InputComp'
import AuthContext from '../context/AuthContext'

const Register = () => {
  const { register } = useContext(AuthContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      checked: false,
    },
    onSubmit: async (values) => {
      setIsSubmitting(true)
      setApiError(null)
      try {
        const result = await register(
          values.name,
          values.email,
          values.password,
        )
        if (result.status === 201) {
          setSuccessMessage('Registration successful! Redirecting to login...')
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      } catch (error) {
        setApiError(error.message || 'An error occurred')
        console.error('Error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      checked: yup
        .boolean()
        .oneOf([true], 'You must agree to the Terms & Conditions')
        .required(),
    }),
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col gap-y-6 text-sm'>
      <div className='flex flex-col gap-y-4'>
        <InputComp formikD={formik} name='name' type='text' />
        <InputComp formikD={formik} name='email' type='email' />
        <InputComp formikD={formik} name='password' type='password' />
        <div className='flex flex-col gap-y-2'>
          <div className='flex gap-x-2'>
            <input
              required
              type='checkbox'
              name='checked'
              className='w-5 h-5 rounded-sm'
              checked={formik.values.checked}
              onChange={formik.handleChange}
            />
            <div className='flex font-semibold gap-x-1 opacity-70'>
              <span>Agree with</span>
              <span className='underline'>Terms & Condition</span>
            </div>
          </div>
          {formik.touched.checked && formik.errors.checked && (
            <span className='text-xs text-red-600 text-start'>
              {formik.errors.checked}
            </span>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='w-full rounded-full text-center bg-slate-700 text-white py-3 font-semibold'
        disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Sign Up'}
      </button>
      {apiError && <p className='text-red-500'>{apiError}</p>}
      {successMessage && <p className='text-green-500'>{successMessage}</p>}
    </form>
  )
}

export default Register
