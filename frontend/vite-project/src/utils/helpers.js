import { useLocation } from 'react-router-dom'

export const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export const determineRoute = (user) => {
  const emailVerification = user.email_verified_at
  const phone = user.phone
  const gender = user.gender

  if (!emailVerification) {
    return '/verification'
  } else if (!phone || !gender) {
    return '/profile'
  } else {
    return '/'
  }
}

export const useQueryItem = () => {
  const query = useQuery()
  const category = query.get('category')
  const sort = query.get('sort')
  const order = query.get('order')

  return { sort, order, category }
}

export const convertSort = (sort) => {
  let newSort = ''
  switch (sort) {
    case 'newst':
      newSort = 'created_at'
      break
    case 'popular':
      newSort = 'likes'
      break
    default:
      break
  }
  return newSort
}

export const deConvertSort = (sort) => {
  let newSort = ''
  switch (sort) {
    case 'created_at':
      newSort = 'newst'
      break
    case 'likes':
      newSort = 'popular '
      break
    default:
      break
  }
  return newSort
}

export const pageChange = ({ pathTo, location }) => {
  const prevPath = `${location.pathname}${location.search}`
  const nextPath = `/${pathTo}`

  return { prevPath, nextPath }
}
