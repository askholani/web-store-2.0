import { Link } from 'react-router-dom'
import { lazy } from 'react'

const Register = lazy(() => import('../../components/Register'))

const RegisterPage = () => {
  return (
    <main className='px-2 py-16 flex flex-col gap-y-8'>
      <section className='flex flex-col gap-y-4'>
        <h1 className='text-3xl font-semibold'>Create Account</h1>
        <div className='flex justify-center opacity-60'>
          <h2 className='w-4/5'>
            Fill your information bellow or register with your social account.
          </h2>
        </div>
      </section>
      <Register />
      <section className='flex flex-col gap-y-10'>
        <div className='flex w-full flex-col'>
          <div className='divider opacity-60'>Or sign up with</div>
        </div>
        <div className='flex gap-x-2 justify-center'>
          <a className='w-14 h-14 rounded-full border-2  flex justify-center items-center'>
            <i className='fa-brands fa-google text-2xl'></i>
          </a>
          <a className='w-14 h-14 rounded-full border-2 flex justify-center items-center'>
            <i className='fa-brands fa-facebook-f text-2xl'></i>
          </a>
        </div>
        <div className='flex justify-center gap-x-1'>
          <span>Already have an account?</span>
          <Link to={'/login'} className='underline'>
            Sign In
          </Link>
        </div>
      </section>
    </main>
  )
}
export default RegisterPage
