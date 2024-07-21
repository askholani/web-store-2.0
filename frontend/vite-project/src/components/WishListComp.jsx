import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '../utils/helpers'
import Pagination from './Pagination'
import Product from './Product/Product'
import { useContext, useEffect, useState } from 'react'
import ProductContext from '../context/ProductContext'
import AuthContext from '../context/AuthContext'

const array = new Array(4).fill(null)
const WishListComp = ({ data, isLoading, isError }) => {
  const [item, setItem] = useState(null)
  useEffect(() => {
    if (data) {
      setItem(data)
    }
  }, [data])
  const query = useQuery()
  const location = useLocation()
  const navigate = useNavigate()
  const { fetchWishlist } = useContext(ProductContext)
  const { user } = useContext(AuthContext)

  const handleDetailPage = (id, name) => {
    const path = `${location.pathname}${location.search}`
    const page = query.get('page') ?? 1
    localStorage.setItem('page', page)
    localStorage.setItem('path', path)
    navigate(`/product/${id}-${name}`)
  }

  const handlePageChange = async (page) => {
    const result = await fetchWishlist({ page, user })
    setItem(result.data)
  }

  if (isLoading || !item) {
    return (
      <div className='flex justify-around flex-wrap gap-y-4'>
        {array.map((val, index) => (
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
        {item.data.map((value) => (
          <div
            className='relative w-1/2'
            key={value.id}
            onClick={() => handleDetailPage(value.id, value.name)}>
            <Product key={value.id} value={value.product} wishlist={true} />
          </div>
        ))}
      </div>
      <Pagination
        onPageChange={handlePageChange}
        currentPage={item.current_page}
        lastPage={item.last_page}
      />
    </section>
  )
}

export default WishListComp
