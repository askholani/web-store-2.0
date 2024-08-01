// NavigationComponent.js
import { Link, Outlet, useNavigation } from 'react-router-dom'

export function NavigationComponentCoba() {
  const navigation = useNavigation()
  console.log('navigation', navigation)

  if (navigation.state === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className='flex gap-x-8'>
        <Link to={'data'}>data</Link>
        <Link to={''}>back</Link>
      </div>
      <p>Current state: {navigation.state}</p>
      {navigation.state === 'loading' && <p>Loading...</p>}
      <Outlet />
    </div>
  )
}
