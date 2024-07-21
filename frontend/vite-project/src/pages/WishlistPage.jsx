import { useContext, useEffect, useState } from 'react'
import ProductContext from '../context/ProductContext'
import AuthContext from '../context/AuthContext'
import { pageChange } from '../utils/helpers'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import WishListComp from '../components/WishListComp'

const WishlistPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)
  const { fetchWishlist } = useContext(ProductContext)
  const { user, previousUrl, prevUrl } = useContext(AuthContext)
  const [wishlist, setWishlist] = useState(null)

  useEffect(() => {
    const handleFetchWishlist = async () => {
      try {
        const res = await fetchWishlist({ user })
        setWishlist(res.data)
      } catch (error) {
        setIsError(error.message || 'An error occured')
      } finally {
        setIsLoading(false)
      }
    }

    handleFetchWishlist({ user })
  }, [fetchWishlist, user])

  const handleUrlChange = ({ path }) => {
    const page = pageChange({ pathTo: path, location: location })
    previousUrl(page.prevPath)
    navigate(page.nextPath)
  }

  const handleWishlistChange = (data) => {
    setWishlist(data)
  }
  console.log('prevUrl', prevUrl)

  return (
    <main className='px-2 py-4 flex flex-col gap-y-8'>
      <section className='flex justify-start'>
        <Link
          to={prevUrl}
          className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center'>
          <i className='fas fa-arrow-left text-lg'></i>
        </Link>
      </section>
      <WishListComp data={wishlist} isError={isError} isLoading={isLoading} />
    </main>
  )
}

export default WishlistPage
