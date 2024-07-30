import { Link, useNavigate, useParams } from 'react-router-dom'
import { lazy, useContext, useEffect, useMemo, useState } from 'react'
import ProductContext from '../../context/ProductContext'
import AuthContext from '../../context/AuthContext'
import { pageChange } from '../../utils/helpers'

const HeartButton = lazy(() => import('../HeartButton'))
const ProductImages = lazy(() => import('./ProductImages'))
const AlertError = lazy(() => import('../Alert/AlertError'))
const ToastMessage = lazy(() => import('../Toas/ToastMessage'))

const sizes = ['s', 'm', 'l', 'xl', 'xxl']

const ProductDetail = () => {
  const navigate = useNavigate()
  const { user, prevUrl, previousUrl } = useContext(AuthContext)
  const { fetchDetailProduct, fetchWishlist, sendToCart } =
    useContext(ProductContext)
  const params = useParams()
  const [showDes, setShowDes] = useState(false)
  const [selectProd, setSelectProd] = useState({
    image: null,
    size: null,
    color: null,
  })
  const [data, setData] = useState(null)
  const [wishlist, setWishlist] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const id = useMemo(() => params.id.split('-')[0], [params.id])

  useEffect(() => {
    const handleFetchDetailProduct = async () => {
      let rest = null
      try {
        rest = await fetchDetailProduct(id)
        setData(rest.data)
        setSelectProd((prev) => ({
          ...prev,
          image: rest.data.image,
        }))
        if (user) {
          const wishlist = await fetchWishlist({ id })
          setWishlist(wishlist.data.length === 0 ? null : wishlist)
          // console.log('wishlist', wishlist)
        }
      } catch (err) {
        // console.log(err)
      }
    }
    handleFetchDetailProduct()
  }, [id, fetchDetailProduct, fetchWishlist, user])

  const handleWishlist = ({ prod, wish }) => {
    // console.log('prod', prod)
    // console.log('wish', wish)
    setData((prev) => ({
      ...prev,
      likes: prod.likes,
    }))
    setWishlist(wish)
  }

  const handleSelectImages = (image) => {
    setSelectProd((prev) => ({ ...prev, image: image }))
  }

  const handleSendToCart = async ({ id, name }) => {
    setIsLoading(true)
    if (!user) {
      const path = `product/${id}-${name}`
      const page = pageChange({ pathTo: path, location })
      previousUrl({ url: page.prevPath })
      navigate('/login?state=true')
      previousUrl(location.pathname)
    }

    let wishlistUpdate = null
    let wishlistData = null

    if (wishlist) {
      wishlistUpdate = wishlist ? wishlist.product_id : null
      wishlistData = wishlist.data ? wishlist.data.product_id : null
    }
    const data = {
      ...selectProd,
      count: 1,
      wishlist: wishlistData ?? wishlistUpdate,
      user: user.id,
      product: id,
    }
    const res = await sendToCart(data)
    setTimeout(() => setIsLoading(false), 1000)
    setTimeout(() => setShowAlert(false), 2000)
    setShowAlert(true)
    setMessage(res)
  }

  const url = prevUrl.length === 0 ? localStorage.getItem('prevUrl') : prevUrl

  return (
    <main className='flex mb-36 min-h-[100vh]'>
      {showAlert && !message.success && (
        <AlertError success={message.success} message={message.error} />
      )}
      {showAlert && message.success && (
        <ToastMessage message={message.data} success={message.success} />
      )}

      <section>
        <div className='absolute flex justify-between items-center top-2 left-0 right-0 z-30 px-2'>
          <Link
            to={url}
            className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center bg-white cursor-pointer'>
            <i className='fas fa-arrow-left text-lg'></i>
          </Link>
          <div className='bg-white px-8 py-1 rounded-lg'>
            <span className='font-semibold text-lg'>Product Details</span>
          </div>
          <HeartButton
            onHandleWishlist={handleWishlist}
            id={id}
            wishlistData={wishlist}
          />
        </div>
        <div className='absolute top-16 left-0 right-0 min-h-[490px] bg-slate-200'>
          {data && (
            <img className='object-contain' src={selectProd.image} alt='' />
          )}
          <ProductImages
            onSelectImages={handleSelectImages}
            data={data === null ? null : data.details}
          />
        </div>
      </section>
      <section className='bg-white left-0 right-0 top-[70vh] absolute min-h-[45%]'>
        <div className='relative h-full w-full'>
          <div className='flex flex-col px-4 pt-6 gap-y-1 text-start '>
            <div className='flex justify-between items-center'>
              <span className='font-semibold opacity-80 capitalize'>
                {data && data.category}
              </span>
              <span className='text-sm capitalize'>
                {data && data.likes} likes
              </span>
            </div>
            <span className='text-xl font-semibold mb-1 line-clamp-1'>
              {data && data.name}
            </span>
            <div className='flex flex-col gap-y-2'>
              <span className='text-lg font-semibold'>Product Details</span>
              <span
                onClick={() => setShowDes((prev) => !prev)}
                className={`${showDes ? '' : 'line-clamp-1'} cursor-pointer`}>
                {data && data.description}
              </span>
            </div>
            <div className='pt-2 mt-2 flex flex-col gap-y-1 border-t border-t-slate-300'>
              <span className='text-lg font-semibold'>Select Size</span>
              <div className='flex gap-x-4'>
                {sizes.map((val) => {
                  return (
                    <div
                      onClick={() =>
                        setSelectProd((pre) => ({
                          ...pre,
                          size: val === pre.size ? null : val,
                        }))
                      }
                      key={val}
                      className={`py-1 px-3 border border-slate-300 rounded-lg flex justify-center items-center font-semibold uppercase transition-all cursor-pointer ${
                        selectProd.size === val ? 'bg-slate-500 text-white' : ''
                      }`}>
                      <span>{val}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='flex flex-col gap-y-1'>
              <span className='text-lg font-semibold'>Select Color</span>
              <div className='flex gap-x-4'>
                {data &&
                  data.details.map((val, idx) => {
                    return (
                      <div
                        onClick={() =>
                          setSelectProd((pre) => ({
                            ...pre,
                            color: val.color === pre.color ? null : val.color,
                          }))
                        }
                        key={val.id + idx}
                        className={`w-8 h-8  rounded-lg flex justify-center items-center font-semibold transition-all ${
                          selectProd.color === val.color
                            ? 'border-4 border-blue-600'
                            : 'border border-slate-300'
                        }`}
                        style={{ backgroundColor: val.color }}></div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='fixed bottom-0 flex justify-around bg-white rounded-xl border-t border-t-slate-300 p-2 left-0 right-0 items-center'>
        <div className='flex flex-col text-start'>
          <span>Total Price</span>
          <span className='font-bold text-lg'>Rp {data && data.price}.000</span>
        </div>
        <button
          disabled={isLoading}
          className={`flex h-12 w-3/6 rounded-full gap-x-4 justify-center items-center text-white ${
            isLoading
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-slate-600 cursor-pointer'
          }`}
          onClick={() => handleSendToCart({ id: data.id, name: data.name })}>
          <i className='fas fa-shopping-bag text-2xl'></i>
          <span className='font-semibold'>Add To Cart</span>
        </button>
      </section>
    </main>
  )
}
export default ProductDetail
