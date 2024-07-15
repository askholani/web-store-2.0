import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Product from './Product'
import Pagination from '../Pagination'

const ProductList = ({ products, isLoading, isError, onFetchProducts }) => {
  const navigate = useNavigate()

  const handlePageChange = (page) => {
    const currPage = `?page=${page}`
    navigate(currPage)
    onFetchProducts(page)
  }

  const [data, setData] = useState(null)
  useEffect(() => {
    if (products) {
      setData(products.data)
    }
  }, [products])

  if (isLoading || !data) {
    return <div>Loading</div>
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
