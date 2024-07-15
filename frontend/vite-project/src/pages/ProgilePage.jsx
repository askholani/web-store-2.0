import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Profile from '../components/Profile'

const ProfilePage = () => {
  const { user, completeProfile } = useContext(AuthContext)
  return (
    <main className='px-2 py-4 flex flex-col gap-y-8'>
      <section className='flex justify-start'>
        <Link
          to={'/'}
          className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center'>
          <i className='fas fa-arrow-left text-lg'></i>
        </Link>
      </section>
      <section className='flex flex-col gap-y-4'>
        <h1 className='text-3xl font-semibold'>Complete Your Profile</h1>
        <h2 className='w-full opacity-60'>
          Don&apos;t worry, only you can see your personal data. No one else
          will be able to see it.
        </h2>
      </section>
      <Profile user={user} onComplete={completeProfile} />
    </main>
  )
}

export default ProfilePage
