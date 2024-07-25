import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Product from './Product'
import Pagination from '../Pagination'
import {
  convertSort,
  pageChange,
  useQuery,
  useQueryItem,
} from '../../utils/helpers'
import LoaderFetching from '../LoaderFetching'
import AuthContext from '../../context/AuthContext'
import ProductContext from '../../context/ProductContext'

const ProductList = ({ products, isLoading, isError, onHandlePage }) => {
  const { fetchProducts } = useContext(ProductContext)
  console.log('products', products)
  const navigate = useNavigate()
  const queryItem = useQueryItem()
  const query = useQuery()
  const location = useLocation()
  const { previousUrl } = useContext(AuthContext)

  const search = query.get('search')

  const handlePageChange = async (page) => {
    const { category, sort, order } = queryItem
    let currPage = ''

    if (search !== null) {
      currPage += `?search=${search}`
    }

    if (page !== null && search === null) {
      currPage += `?page=${page}`
    } else {
      currPage += `&page=${page}`
    }

    if (category !== 'all' && category !== null) {
      currPage += `&category=${category}`
    }

    if (sort !== 'all' && sort !== null) {
      currPage += `&sort=${sort}`
    }

    if (order !== null) {
      currPage += `&order=${order}`
    }

    navigate(currPage)
    const newQueryItem = {
      ...queryItem,
      sort: convertSort(queryItem.sort),
    }
    const data = {
      pageData: page,
      query: newQueryItem,
      search,
      press: true,
    }
    const rest = await fetchProducts(data)
    console.log('rest', rest)
    onHandlePage(rest.products)
  }

  const [data, setData] = useState(new Array(4))
  useEffect(() => {
    if (products) {
      setData(products.data)
    }
  }, [products])

  const handleDetailPage = ({ id, name }) => {
    const path = `product/${id}-${name}`
    const page = pageChange({ pathTo: path, location })
    previousUrl({ url: page.prevPath })
    localStorage.setItem('prevUrl', page.prevPath)
    navigate(page.nextPath)
  }

  if (isError) {
    return <div>{isError}</div>
  }
  return (
    <>
      {isLoading && <LoaderFetching />}
      {!isLoading && (
        <section className='flex flex-col gap-y-4'>
          <div className='flex justify-around flex-wrap gap-y-4'>
            {data.map((value) => (
              <div
                className='relative w-1/2'
                key={value.id}
                onClick={() => handleDetailPage(value)}>
                <Product key={value.id} value={value} wishlist={false} />
              </div>
            ))}
          </div>
          <Pagination
            onPageChange={handlePageChange}
            currentPage={products.current_page}
            lastPage={products.last_page}
          />
        </section>
      )}
    </>
  )
}

export default ProductList
