import { useLocation } from 'react-router-dom'
import * as Yup from 'yup'

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

export const handleSortPage = async ({
  location,
  navigate,
  sort,
  order,
  paramCategory,
  fetchData,
  queryItem,
  user,
}) => {
  let sortData = convertSort(sort)
  let newPath = ''

  if (paramCategory) {
    newPath =
      location.pathname +
      `?page=1` +
      `&category=${paramCategory}&sort=${sort}&order=${order}`
  } else {
    newPath = location.pathname + `?page=1` + `&sort=${sortData}&order=${order}`
  }

  navigate(newPath)
  const newQueryItem = {
    ...queryItem,
    sort: sortData,
    order: order,
  }

  if (location.pathname === '/product') {
    const data = {
      pageData: 1,
      query: newQueryItem,
    }
    const rest = await fetchData(data)
    return rest
  } else {
    const rest = await fetchData({ user, query: newQueryItem })
    console.log('rest', rest)
    return rest
  }
}

export const cartSchema = Yup.object().shape({
  product: Yup.string().required('product id is required'),
  image: Yup.string().required('Image is required'),
  size: Yup.string().required('Size is required'),
  color: Yup.string().required('Color is required'),
  count: Yup.number()
    .required('Count is required')
    .positive('Count must be greater than 0')
    .integer('Count must be an integer'),
  wishlist: Yup.number().nullable(),
  user: Yup.number().required('user id is required'),
})

export const validateData = async (data, schema) => {
  try {
    await schema.validate(data, { abortEarly: false })
    return { valid: true, error: null }
  } catch (validationError) {
    const error = validationError.inner.map((err) => ({
      path: err.path,
      message: err.message,
    }))
    return { valid: false, error }
  }
}
export const currencyFormat = ({ number, curr = 'IDR' }) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: curr,
  }).format(number)
}
