import { Link } from 'react-router-dom'

const ProductDetail = () => {
  return (
    <main className='flex mb-32 min-h-[100vh]'>
      <section>
        <div className='absolute flex justify-between items-center top-2 left-0 right-0 z-50 px-2'>
          <Link
            to={'/profile'}
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
        <img
          className='object-contain absolute top-16 left-0 right-0'
          src='https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1582274528667-1e8a10ded835'
          alt=''
        />
      </section>
      <section className='bg-white left-0 right-0 bottom-0 absolute min-h-[50%]'>
        <div className='flex flex-col px-4 pt-6 gap-y-1 text-start '>
          <div className='flex justify-between items-center'>
            <span className='font-semibold opacity-80'>
              Famale&apos;s Style
            </span>
            <span className='text-sm'>100 likes</span>
          </div>
          <span className='text-xl font-semibold mb-1'>Light Brown Jacket</span>
          <div className='flex flex-col gap-y-2'>
            <span className='text-lg font-semibold'>Product Details</span>
            <span className='line-clamp-3 cursor-pointer'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
              nobis officiis tenetur cupiditate ipsum exercitationem mollitia
              voluptas aut, eaque assumenda quaerat, fugiat dicta eveniet, hic
              consequuntur? Ipsa repudiandae dolorum aspernatur.
            </span>
          </div>
          <div className='pt-2 mt-2 flex flex-col gap-y-1 border-t border-t-slate-300'>
            <span className='text-lg font-semibold'>Select Size</span>
            <div className='flex gap-x-4'>
              <div className='py-1 px-3 border border-slate-300 rounded-lg flex justify-center items-center font-semibold'>
                <span>S</span>
              </div>
              <div className='py-1 px-3 border border-slate-300 rounded-lg flex justify-center items-center font-semibold'>
                <span>M</span>
              </div>
              <div className='py-1 px-3 border border-slate-300 rounded-lg flex justify-center items-center font-semibold'>
                <span>L</span>
              </div>
              <div className='py-1 px-3 border border-slate-300 rounded-lg flex justify-center items-center font-semibold'>
                <span>XL</span>
              </div>
              <div className='py-1 px-3 border border-slate-300 rounded-lg flex justify-center items-center font-semibold'>
                <span>XXL</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-1'>
            <span className='text-lg font-semibold'>Select Color</span>
            <div className='flex gap-x-4'>
              <div className='w-8 h-8 border border-slate-300 rounded-lg flex justify-center items-center font-semibold'>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='fixed bottom-0 flex justify-around bg-white shadow-md rounded-md border-t border-slate-300 p-2 left-0 right-0 items-center'>
        <div className='flex flex-col text-start'>
          <span>Total Price</span>
          <span className='font-bold text-lg'>Rp 400.000</span>
        </div>
        <div className='flex bg-slate-400 h-12 w-3/5 rounded-full'></div>
      </section>
    </main>
  )
}
export default ProductDetail
