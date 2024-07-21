import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useMemo, useState } from 'react'
import ProductContext from '../../context/ProductContext'
import AuthContext from '../../context/AuthContext'
import HeartButton from '../HeartButton'
import ProductImages from './ProductImages'

const sizes = ['s', 'm', 'l', 'xl', 'xxl']

const ProductDetail = () => {
  const { user } = useContext(AuthContext)
  const { product, fetchDetailProduct, fetchWishlist } =
    useContext(ProductContext)
  const [prod, setProd] = useState(null)
  const params = useParams()
  const [show, setShow] = useState(false)
  const [selectProd, setSelectProd] = useState({
    image: null,
    size: null,
    color: null,
  })
  const [wishlist, setWishlist] = useState(null)

  const id = useMemo(() => params.id.split('-')[0], [params.id])

  const page = useMemo(() => {
    const path = localStorage.getItem('path')
    const pageParam = localStorage.getItem('page')
    if (path === '/product') {
      return `${path}?page=${pageParam}`
    } else {
      return path || '' // Ensure a default value if path is not set
    }
  }, [])

  useEffect(() => {
    const handleFetchDetailProduct = async () => {
      if (product) {
        const data = product.data.filter(
          (value) => value.id === parseInt(id),
        )[0]

        let wishlist = ''
        if (user) {
          wishlist = await fetchWishlist(id)
        }

        let altData = null
        if (!data) {
          altData = await fetchDetailProduct(id)
        }

        if (wishlist.length === 0) {
          setWishlist(null)
        } else {
          setWishlist(wishlist)
        }

        setProd(data ? data : altData.data)
        setSelectProd((pre) => ({
          ...pre,
          image: data ? data.image : altData.data.image,
        }))
      }
    }
    handleFetchDetailProduct()
  }, [product, id, fetchDetailProduct, fetchWishlist, user])

  const handleWishlist = (res) => {
    setProd((prev) => ({
      ...prev,
      likes: res.likes,
    }))
  }

  const handleSelectImages = (image) => {
    setSelectProd((prev) => ({ ...prev, image: image }))
  }

  return (
    <main className='flex mb-36 min-h-[100vh]'>
      <section>
        <div className='absolute flex justify-between items-center top-2 left-0 right-0 z-50 px-2'>
          <Link
            to={page}
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
          {prod && (
            <img className='object-contain' src={selectProd.image} alt='' />
          )}
          <ProductImages
            onSelectImages={handleSelectImages}
            data={prod === null ? null : prod.details}
          />
        </div>
      </section>
      <section className='bg-white left-0 right-0 top-[70vh] absolute min-h-[45%]'>
        <div className='relative h-full w-full'>
          <div className='flex flex-col px-4 pt-6 gap-y-1 text-start '>
            <div className='flex justify-between items-center'>
              <span className='font-semibold opacity-80 capitalize'>
                {prod && prod.category}
              </span>
              <span className='text-sm capitalize'>
                {prod && prod.likes} likes
              </span>
            </div>
            <span className='text-xl font-semibold mb-1 line-clamp-1'>
              {prod && prod.name}
            </span>
            <div className='flex flex-col gap-y-2'>
              <span className='text-lg font-semibold'>Product Details</span>
              <span
                onClick={() => setShow((prev) => !prev)}
                className={`${show ? '' : 'line-clamp-1'} cursor-pointer`}>
                {prod && prod.description}
              </span>
            </div>
            <div className='pt-2 mt-2 flex flex-col gap-y-1 border-t border-t-slate-300'>
              <span className='text-lg font-semibold'>Select Size</span>
              <div className='flex gap-x-4'>
                {sizes.map((val) => {
                  return (
                    <div
                      onClick={() =>
                        setSelectProd((pre) => ({ ...pre, size: val }))
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
                {prod &&
                  prod.details.map((val, idx) => {
                    return (
                      <div
                        onClick={() =>
                          setSelectProd((pre) => ({ ...pre, color: val.color }))
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
          <span className='font-bold text-lg'>Rp {prod && prod.price}.000</span>
        </div>
        <div className='flex bg-slate-600 h-12 w-3/6 rounded-full gap-x-4 justify-center items-center text-white'>
          <i className='fas fa-shopping-bag text-2xl'></i>
          <span className='font-semibold'>Add To Chart</span>
        </div>
      </section>
    </main>
  )
}
export default ProductDetail
