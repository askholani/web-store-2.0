import { createContext } from 'react'
import axiosInstance from '../api/axiosAuth'

import { cartSchema, useQuery, validateData } from '../utils/helpers'

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

  const deleteCart = async (id) => {
    try {
      const res = await axiosInstance.delete(`/cart/${id}`)
      return { success: true, cart: res.data }
    } catch (error) {
      return { success: false, cart: null }
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
      }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext
