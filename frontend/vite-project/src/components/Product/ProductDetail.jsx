import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import ProductContext from '../../context/ProductContext'

const sizes = ['s', 'm', 'l', 'xl', 'xxl']

const ProductDetail = () => {
  const { product } = useContext(ProductContext)
  const [prod, setProd] = useState(null)
  const [heroImage, setHeroImage] = useState(null)
  const params = useParams()
  const [selectProd, setSelectProd] = useState({
    image: null,
    size: null,
    color: null,
  })

  const handleChangeHeroImage = (image) => {
    setHeroImage(image)
  }

  const id = params.id.split('-')[0]

  useEffect(() => {
    if (product) {
      const data = product.data.filter((value) => value.id === parseInt(id))[0]
      setProd(data)
      setSelectProd((pre) => ({
        ...pre,
        image: data.image,
      }))
      setHeroImage(data.image)
    }
  }, [product, id])

  console.log('prod', prod)
  return (
    <main className='flex mb-36 min-h-[100vh]'>
      <section>
        <div className='absolute flex justify-between items-center top-2 left-0 right-0 z-50 px-2'>
          <Link
            to={'/product'}
            className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center bg-white'>
            <i className='fas fa-arrow-left text-lg'></i>
          </Link>
          <div className='bg-white px-8 py-1 rounded-lg'>
            <span className='font-semibold text-lg'>Product Details</span>
          </div>
          <Link
            to={'/profile'}
            className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center bg-white'>
            <i className='far fa-heart text-xl'></i>
          </Link>
        </div>
        <div className='absolute top-16 left-0 right-0 max-h-[490px] h-full bg-slate-200'>
          {prod && (
            <img className='object-contain ' src={selectProd.image} alt='' />
          )}

          <div className='top-[55%] absolute left-0 right-0 px-8 '>
            <div className='bg-white p-1 rounded-md flex gap-x-2 carousel carousel-center'>
              {prod &&
                prod.details.map((val, idx) => {
                  return (
                    <div
                      //  onClick={() => handleChangeHeroImage(val.image)}
                      onClick={() =>
                        setSelectProd((pre) => ({ ...pre, image: val.image }))
                      }
                      key={val.id + idx}
                      className='cursor-pointer w-14 h-14 bg-slate-600 rounded-md overflow-hidden carousel-item block'>
                      <img className='object-contain' src={val.image} alt='' />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white left-0 right-0 -bottom-24 absolute min-h-[45%]'>
        <div className='flex flex-col px-4 pt-6 gap-y-1 text-start '>
          <div className='flex justify-between items-center'>
            <span className='font-semibold opacity-80 capitalize'>
              {/* Famale&apos;s Style */}
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
            <span className='line-clamp-3 cursor-pointer'>
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
                    className={`py-1 px-3 border border-slate-300 rounded-lg flex justify-center items-center font-semibold uppercase ${
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
                      className={`w-8 h-8  rounded-lg flex justify-center items-center font-semibold ${
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
