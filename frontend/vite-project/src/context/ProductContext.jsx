import { createContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axiosAuth'

import { useQuery } from '../utils/helpers'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const query = useQuery()
  const page = query.get('page')
  const category = query.get('category')
  const sort = query.get('sort')
  const order = query.get('order') ?? 'asc'
  const [product, setProduct] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  const fetchProducts = async (page = 1, category = 'all', perPage = 6) => {
    setLoading(true)
    setError(false)

    try {
      const response = await axiosInstance.get('/products', {
        params: { page, perPage, category, order },
      })
      setProduct(response.data)
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(page, category)
  }, [page, category, sort, order])

  return (
    <ProductContext.Provider
      value={{ product, isLoading, isError, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext
