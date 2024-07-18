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
  const search = query.get('search')
  const queryItem = useQueryItem()

  const fetchProducts = async (
    pageData,
    query,
    search = null,
    press = false,
    perPage = 6,
  ) => {
    const { order, category, sort } = query
    const pageNum = pageData ?? page
    setLoading(true)
    setError(false)

    try {
      let response = null
      if (search) {
        response = await axiosInstance.get('/products', {
          params: { search, page: pageNum, press },
        })
        if (press) {
          setProdRec(null)
          setProduct(response.data)
        } else {
          setProdRec(response.data)
        }
      } else {
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
    fetchProducts(page, newQueryItem, search, true)
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
