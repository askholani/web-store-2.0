import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Product from './Product'
import Pagination from '../Pagination'
import { convertSort, useQuery, useQueryItem } from '../../utils/helpers'

const ProductList = ({ products, isLoading, isError, onFetchProducts }) => {
  console.log('products', products)
  const navigate = useNavigate()
  const queryItem = useQueryItem()
  const query = useQuery()
  const search = query.get('search')

  const handlePageChange = (page) => {
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
    onFetchProducts(page, newQueryItem, search, true)
  }

  const [data, setData] = useState(new Array(4))
  useEffect(() => {
    if (products) {
      setData(products.data)
    }
  }, [products])

  if (isLoading || !data) {
    return (
      <div className='flex justify-around flex-wrap gap-y-4'>
        {data.map((val, index) => (
          <div key={index} className='relative w-1/2'>
            <div className='bg-slate-50 w-8 h-8 absolute top-2 right-6 flex justify-center items-center rounded-full'>
              <i className='fas fa-heart text-lg'></i>
            </div>
            <div className='rounded-md'>
              <img src={''} alt='' className='w-40 h-40 object-cover' />
            </div>
            <div className='flex flex-col gap-y-1 font-semibold text-start px-1'>
              <span className='line-clamp-1'>{''}</span>
              <span>Rp {''}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return <div>{isError}</div>
  }
  return (
    <section className='flex flex-col gap-y-4'>
      <div className='flex justify-around flex-wrap gap-y-4'>
        {data.map((value) => (
          <Product key={value.id} value={value} />
        ))}
      </div>
      <Pagination
        onPageChange={handlePageChange}
        currentPage={products.current_page}
        lastPage={products.last_page}
      />
    </section>
  )
}

export default ProductList
