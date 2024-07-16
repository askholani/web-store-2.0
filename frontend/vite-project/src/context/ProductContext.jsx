import { createContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axiosAuth'

import { convertSort, useQuery, useQueryItem } from '../utils/helpers'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const query = useQuery()

  const [prodRec, setProdRec] = useState(null)
  const [product, setProduct] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  const page = query.get('page')
  const queryItem = useQueryItem()

  const fetchProducts = async (
    pageData,
    query,
    search = null,
    press,
    perPage = 6,
  ) => {
    const { order, category, sort } = query
    console.log('query', query)
    const pageNum = pageData ?? page
    setLoading(true)
    setError(false)

    try {
      let response = null
      console.log('search', search)
      if (search) {
        response = await axiosInstance.get('/products', {
          params: { search, page: pageNum },
        })
        setProdRec(response.data)
        if (press) {
          setProdRec(null)
          setProduct(response.data)
        }
      } else {
        console.log('category', category)
        response = await axiosInstance.get('/products', {
          params: { page: pageNum, perPage, category, order, sort },
        })
        setProduct(response.data)
      }

      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    const newQueryItem = {
      ...queryItem,
      sort: convertSort(queryItem.sort),
    }
    fetchProducts(page, newQueryItem)
  }, [])

  // const searchFetchProducts = async (query) => {
  //   const response = await axiosInstance.get('/products')
  // }

  return (
    <ProductContext.Provider
      value={{ product, isLoading, isError, fetchProducts, prodRec }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext
