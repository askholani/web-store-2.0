import { createContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axiosAuth'
import { useLocation } from 'react-router-dom'

const ProductContext = createContext()

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}
export const ProductProvider = ({ children }) => {
  const query = useQuery()
  const page = query.get('page')
  const [product, setProduct] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const fetchProducts = async (page = 1, perPage = 6) => {
    setLoading(true)
    setError(false)

    try {
      const response = await axiosInstance.get('/products', {
        params: { page, perPage },
      })
      setProduct(response.data)
      setLoading(false)
    } catch (err) {
      // console.error('Error fetching products:', error);
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(page)
  }, [])

  return (
    <ProductContext.Provider
      value={{ product, isLoading, isError, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext
