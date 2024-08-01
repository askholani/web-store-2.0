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

export const orderSchema = Yup.object().shape({
  user: Yup.number().required('User is required'), // Corrected from Yup.integer() to Yup.number()
  status: Yup.string().required('Status is required'),
  totalPrice: Yup.string().required('Total price is required'),
  shippingType: Yup.string().required('Shipping type is required'),
  shippingAddress: Yup.string().required('Shipping address is required'),
  paymentType: Yup.string().required('Payment type is required'),
  discount: Yup.string().required('Discount is required'),
  shippingCost: Yup.string().required('Shipping cost is required'),
  items: Yup.array()
    .of(
      Yup.object().shape({
        size: Yup.string().required('Size is required'),
        quantity: Yup.number()
          .required('Quantity is required')
          .min(1, 'Quantity must be at least 1'),
        image: Yup.string().required('Image is required'),
        product: Yup.number()
          .required('Product is required')
          .integer('Product must be an integer'),
        color: Yup.string().nullable(), // Assuming color is optional
      }),
    )
    .required('Items are required')
    .min(1, 'At least one item is required'), // Ensures the array is not empty
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

export const showErrorPosition = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.')
      break
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.')
      break
    case error.TIMEOUT:
      alert('The request to get user location timed out.')
      break
    case error.UNKNOWN_ERROR:
      alert('An unknown error occurred.')
      break
  }
}
