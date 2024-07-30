import { lazy, useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import ProductContext from '../context/ProductContext'
import { pageChange, useQuery } from '../utils/helpers'

const WishListComp = lazy(() => import('../components/WishListComp'))
const Sort = lazy(() => import('../components/Sort'))

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const query = useQuery()
  const navigate = useNavigate()

  const { prevUrl, user, previousUrl } = useContext(AuthContext)
  const { fetchWishlist } = useContext(ProductContext)

  const fetchWishlistRef = useRef(fetchWishlist)
  const queryRef = useRef(query)
  const userRef = useRef(user)

  useEffect(() => {
    const handleFetchWishlist = async () => {
      const page = queryRef.current.get('page')
      setIsLoading(true)
      try {
        const res = await fetchWishlistRef.current({
          user: userRef.current,
          page,
        })
        setWishlist(res.data)
      } catch (error) {
        setIsError(error.message || 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    handleFetchWishlist()
  }, []) // No dependencies, run only once

  const handlePageChange = async (page) => {
    setIsLoading(true)
    try {
      const res = await fetchWishlistRef.current({
        user: userRef.current,
        page,
      })
      setWishlist(res.data)
      let currPage = '/wishlist'
      if (page !== null) {
        currPage += `?page=${page}`
      }
      navigate(currPage)
    } catch (error) {
      setIsError(error.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = (wishlist) => {
    setWishlist(wishlist.data)
  }

  const handleDetailPage = ({ id, name }) => {
    const path = `product/${id}-${name}`
    const page = pageChange({ pathTo: path, location })
    previousUrl({ url: page.prevPath })
    localStorage.setItem('prevUrl', page.prevPath)
    navigate(page.nextPath)
  }

  return (
    <main className='px-2 py-4 flex flex-col gap-y-8'>
      <section className='flex items-center justify-center relative'>
        <Link
          to={prevUrl}
          className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center absolute left-0'>
          <i className='fas fa-arrow-left text-lg'></i>
        </Link>
        <span className='font-semibold text-lg'>My Wishlist</span>
      </section>
      <Sort fetchData={fetchWishlist} onHandleSort={handleSort} />
      <WishListComp
        wishlist={wishlist}
        isError={isError}
        isLoading={isLoading}
        onHandlePage={handlePageChange}
        onHandleDetailPage={handleDetailPage}
      />
    </main>
  )
}

export default WishlistPage
