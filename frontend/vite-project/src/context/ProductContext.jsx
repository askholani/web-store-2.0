import { createContext } from 'react'
import axiosInstance from '../api/axiosAuth'

import {
  cartSchema,
  orderSchema,
  useQuery,
  validateData,
} from '../utils/helpers'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const query = useQuery()
  const page = query.get('page')

  const fetchProducts = async (data) => {
    const { pageData, query, search = null, press = false, perPage = 6 } = data
    const { order, category, sort } = query
    const pageNum = pageData ?? page

    try {
      let response = null
      if (search) {
        response = await axiosInstance.get('/products', {
          params: { search, page: pageNum, press },
        })
        if (press) {
          return {
            prodRec: null,
            products: response.data,
          }
        } else {
          return {
            prodRec: response.data,
            products: null,
          }
        }
      } else {
        response = await axiosInstance.get('/products', {
          params: { page: pageNum, perPage, category, order, sort },
        })
        return {
          prodRec: null,
          products: response.data,
        }
      }
    } catch (err) {
      return {
        prodRec: null,
        products: null,
        message: err,
      }
    }
  }

  const fetchDetailProduct = async (id) => {
    try {
      const res = await axiosInstance.get('/products/detail', {
        params: { id },
      })
      return res
    } catch (error) {
      return error
    }
  }

  const sendToWishlist = async (prodId) => {
    const res = await axiosInstance.post('/products/wishlist', {
      product_id: prodId,
    })
    return res
  }

  // const fetchWishlist = async ({ id = null, user, page = 1 }) => {
  const fetchWishlist = async (data) => {
    const { id = null, user, page = 1, query = null } = data
    const sort = query !== null ? query.sort : null
    const order = query !== null ? query.order : null
    let res = ''
    if (id) {
      res = await axiosInstance.get('/wishlist', {
        params: {
          id,
        },
      })
      // getAll data on WishlistComp
    } else {
      res = await axiosInstance.get('wishlist', {
        params: {
          user_id: user.id,
          page,
          order,
          sort,
        },
      })
    }
    return res
  }

  const sendToCart = async (data) => {
    const { valid, error } = await validateData(data, cartSchema)

    if (!valid) {
      return { success: false, error }
    }

    try {
      const res = await axiosInstance.post('/cart/store', data)
      return { success: true, data: res.data.message }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const fetchCarts = async () => {
    try {
      const res = await axiosInstance.get('/cart')
      return { success: true, cart: res.data }
    } catch (error) {
      return { success: false, cart: null }
    }
  }

  const updateCart = async (items) => {
    try {
      const data = { items }
      const res = await axiosInstance.post('/cart/update', data)
      return { success: true, cart: res.data }
    } catch (error) {
      console.error('Error updating cart:', error.response.data)
      return { success: false, cart: null }
    }
  }

  const deleteCart = async (id) => {
    try {
      const res = await axiosInstance.delete(`/cart/${id}`)
      return { success: true, cart: res.data }
    } catch (error) {
      return { success: false, cart: null }
    }
  }

  const sendToOrder = async (data) => {
    const { valid, error } = await validateData(data, orderSchema)
    console.log('valid', valid)
    console.log('data', data)
    if (!valid) {
      return { success: false, error }
    }
    try {
      const res = await axiosInstance.post('/order/store', data)
      return { success: true, data: res.data.message }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const fetchOrder = async () => {
    try {
      const res = await axiosInstance.get('/order')
      return { success: true, order: res.data }
    } catch (error) {
      return { success: false, order: null }
    }
  }

  const getStatusOrder = async ({ id, status }) => {
    try {
      const res = await axiosInstance.get(`/order/status`, {
        params: { user: id, status },
      })
      return { success: true, data: res.data }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return { success: false, message: 'Order not found' }
      } else {
        return { success: false, message: err.message }
      }
    }
  }

  const fetchPaymentToken = async ({ items, customer, transaction }) => {
    // console.log('transaction', transaction)
    try {
      const res = await axiosInstance.post('/order/payment/charge', {
        items,
        customer,
        transaction,
      })
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const deleteOrder = async (id) => {
    try {
      // console.log(id)
      const res = await axiosInstance.delete(`/order/${id}`)
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, data: error.message }
    }
  }

  return (
    <ProductContext.Provider
      value={{
        fetchProducts,
        fetchDetailProduct,
        sendToWishlist,
        fetchWishlist,
        sendToCart,
        fetchCarts,
        deleteCart,
        updateCart,
        sendToOrder,
        getStatusOrder,
        fetchOrder,
        fetchPaymentToken,
        deleteOrder,
      }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext
