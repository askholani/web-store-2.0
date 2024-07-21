import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import ProductContext from '../context/ProductContext'

const HeartButton = ({ onHandleWishlist, id, wishlistData }) => {
  const [wishlist, setWishlist] = useState(null)
  const { user, setPrevUrlChanges } = useContext(AuthContext)
  const { sendToWishlist } = useContext(ProductContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setWishlist(wishlistData)
  }, [wishlistData])
  console.log('wishlistData', wishlistData)
  console.log('wishlist', wishlist)

  const handleWishlist = async () => {
    if (!user) {
      navigate('/login?state=true')
      setPrevUrlChanges(location.pathname)
    }
    const result = await sendToWishlist(id)
    onHandleWishlist(result.data.product)
    setWishlist(result.data.wishlist)
  }
  return (
    <div
      onClick={handleWishlist}
      className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center bg-white'>
      {!wishlist && <i className='far fa-heart text-xl'></i>}
      {wishlist && <i className='fas fa-heart text-xl text-red-600'></i>}
    </div>
  )
}

export default HeartButton
