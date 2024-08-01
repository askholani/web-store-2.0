import axiosInstance from '../api/axiosAuth'

// export const fetchOrder = async ({request}) => {
//    const url = new URL(request.url);
//    const userId = url.searchParams.get('user');
//    const status = url.searchParams.get('status')
//    const
//   try {
//     const res = await axiosInstance.get('/order')
//     return { success: true, order: res.data }
//   } catch (error) {
//     return { success: false, order: null }
//   }
// }

export const fetchCarts = async () => {
  try {
    const res = await axiosInstance.get('/cart')
    return { success: true, cart: res.data }
  } catch (error) {
    return { success: false, cart: null }
  }
}

export const getStatusOrder = async ({ status = 'unpaid' }) => {
  console.log('hhheei')
  try {
    const res = await axiosInstance.get(`/order/status`, {
      params: { status },
    })
    console.log(res)
    return { success: true, data: res.data }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return { success: false, message: 'Order not found' }
    } else {
      return { success: false, message: err.message }
    }
  }
}

export const fetchOrder = async () => {
  try {
    const res = await axiosInstance.get('/order')
    return { success: true, order: res.data, message: 'successfully' }
  } catch (error) {
    return { success: false, order: null, message: error.message }
  }
}

export const getOrderToken = async () => {
  try {
    const res = await axiosInstance.get('/order/token')
    return { success: true, token: res.data, message: 'successfully' }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return { success: false, token: null, message: 'Token not found' }
    }
    return { success: false, token: null, message: err.message }
  }
}

export const combinedLoader = async (...loaders) => {
  const results = await Promise.all(loaders.map((loader) => loader()))

  return results
}
