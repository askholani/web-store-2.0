import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useSingleErrorMessage from '../../hook/useSingleMessages'
import ResendCodeComp from '../../components/ResendCodeComp'

const VerificationPage = () => {
  const { user, verify, resendCode } = useContext(AuthContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()
  const fieldNames = ['vc1', 'vc2', 'vc3', 'vc4'] // Fields to track for errors
  const [timeRemaining, setTimeRemaining] = useState('')

  const [verificationCodeExpired, setVerificationCodeExpired] = useState(
    user.verification_code_expired,
  )

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const time = new Date(verificationCodeExpired)
      const diffInMilliseconds = time - now

      const diffInSeconds = Math.floor(diffInMilliseconds / 1000)
      const diffInMinutes = Math.floor(diffInSeconds / 60)

      if (diffInSeconds <= 0) {
        setTimeRemaining('00:00')
      } else {
        const minutes = String(diffInMinutes).padStart(2, '0')
        const seconds = String(diffInSeconds % 60).padStart(2, '0')
        setTimeRemaining(`${minutes}:${seconds}`)
      }
    }
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [verificationCodeExpired])

  const formik = useFormik({
    initialValues: {
      vc1: '',
      vc2: '',
      vc3: '',
      vc4: '',
    },
    onSubmit: async (values) => {
      setIsSubmitting(true)
      setApiError(null)
      try {
        const result = await verify(values)
        console.log('result', result)
        if (result.status === 200) {
          setSuccessMessage('verification successful.')
          setTimeout(() => {
            navigate('/profile')
          }, 2000)
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setApiError(null)
        } else {
          setApiError(null)
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    validationSchema: yup.object({
      vc1: yup.string().required('verification code is required'),
      vc2: yup.string().required('verification code is required'),
      vc3: yup.string().required('verification code is required'),
      vc4: yup.string().required('verification code is required'),
    }),
  })

  const handleResend = (data) => {
    setVerificationCodeExpired(data)
  }
  const errorMessageCode = useSingleErrorMessage(formik, fieldNames)

  return (
    <main className='px-2 py-4 flex flex-col gap-y-8'>
      <section className='flex justify-start'>
        <Link
          to={'/profile'}
          className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center'>
          <i className='fas fa-arrow-left text-lg'></i>
        </Link>
      </section>
      <section className='flex flex-col gap-y-4'>
        <h1 className='text-3xl font-semibold'>Verify Code</h1>
        <div className='flex flex-col justify-center'>
          <h2 className='w-full opacity-60'>
            Please enter the code we just sent to email
          </h2>
          <h3 className='font-semibold'>
            {user ? user.email : 'example@gmail.com'}
          </h3>
        </div>
      </section>
      <form onSubmit={formik.handleSubmit} className='flex flex-col gap-y-8'>
        <div className='flex flex-col gap-y-4'>
          <span className='text-4xl font-semibold text opacity-70 tracking-wider'>
            {timeRemaining}
          </span>
          <div className='flex justify-around gap-x-4'>
            <input
              type='text'
              required
              id='vc1'
              name='vc1'
              value={formik.values.vc1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-slate-400 rounded-full py-3 px-4 w-1/4 text-center text-2xl'
              maxLength={1}
            />
            <input
              type='text'
              required
              id='vc2'
              name='vc2'
              value={formik.values.vc2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-slate-400 rounded-full py-3 px-4 w-1/4 text-center text-2xl'
              maxLength={1}
            />
            <input
              type='text'
              required
              id='vc3'
              name='vc3'
              value={formik.values.vc3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-slate-400 rounded-full py-3 px-4 w-1/4 text-center text-2xl'
              maxLength={1}
            />
            <input
              type='text'
              required
              id='vc4'
              name='vc4'
              value={formik.values.vc4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border border-slate-400 rounded-full py-3 px-4 w-1/4 text-center text-2xl'
              maxLength={1}
            />
          </div>
          {errorMessageCode && (
            <span className='text-xs text-red-600 text-center'>
              {errorMessageCode}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-y-10'>
          <ResendCodeComp
            onHandleResend={handleResend}
            onResendCode={resendCode}
          />
          <div className='flex flex-col gap-y-1'>
            <button
              type='submit'
              className='w-full rounded-full text-center bg-slate-700 text-white py-3 font-semibold'
              disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Verify'}
            </button>
          </div>
        </div>
        {apiError && <p className='text-red-500'>{apiError}</p>}
        {successMessage && <p className='text-green-500'>{successMessage}</p>}
      </form>
    </main>
  )
}

export default VerificationPage
