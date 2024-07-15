import { useContext } from 'react'
import ProductList from '../components/Product/ProductList'
import ProductContext from '../context/ProductContext'

const MainPage = () => {
  const { isLoading, isError, product, fetchProducts } =
    useContext(ProductContext)
  return (
    <main className='px-1 py-4 flex flex-col gap-y-8 mb-16'>
      <section className='flex justify-between items-end'>
        <div className='flex flex-col gap-y-2'>
          <span className='text-start font-semibold opacity-60'>Location</span>
          <div className='flex gap-x-2 items-center'>
            <i className='fas fa-map-marker-alt text-xl'></i>
            <span className='font-bold'>New York, USA</span>
            <i className='fas fa-chevron-down text-xl'></i>
          </div>
        </div>
        <div className='rounded-full w-12 h-12 bg-slate-200 flex justify-center items-center relative'>
          <div className='absolute bg-red-600 w-3 h-3 rounded-full top-3 right-3'></div>
          <i className='fas fa-bell text-2xl'></i>
        </div>
      </section>
      <section>
        <label className='input input-bordered flex items-center gap-2'>
          <input type='text' className='grow' placeholder='Search' />
          <i className='fas fa-search text-lg'></i>
        </label>
      </section>
      <section className='bg-slate-200 flex flex-col rounded-md py-6 px-4 gap-y-4'>
        <div className='gap-y-2'>
          <span className='flex font-bold text-lg'>New Collection</span>
          <div className='flex flex-col text-start'>
            <span>Discount 50% for</span>
            <span>the first transaction</span>
          </div>
        </div>
        <button className='btn btn-sm w-1/3 bg-slate-700 text-white font-semibold capitalize'>
          shop now
        </button>
      </section>
      <section className='flex flex-col gap-y-4'>
        <div className='flex justify-between items-end'>
          <span className='text-lg font-bold'>Category</span>
          <span className='text-sm'>See All</span>
        </div>
        <div className='flex justify-between'>
          <div className='flex justify-center flex-col'>
            <div className='flex justify-center items-center bg-slate-200 w-16 h-16 rounded-full'>
              <img
                className='w-10 h-w-10'
                src='https://img.icons8.com/?size=100&id=10179&format=png&color=000000'
                alt=''
              />
            </div>
            <span className='text-sm font-semibold'>Pant</span>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='flex justify-center items-center bg-slate-200 w-16 h-16 rounded-full'>
              <img
                className='w-10 h-w-10'
                src='https://img.icons8.com/?size=100&id=105820&format=png&color=000000'
                alt=''
              />
            </div>
            <span className='text-sm font-semibold'>T-Shirt</span>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='flex justify-center items-center bg-slate-200 w-16 h-16 rounded-full'>
              <img
                className='w-10 h-w-10'
                src='https://img.icons8.com/?size=100&id=60888&format=png&color=000000'
                alt=''
              />
            </div>
            <span className='text-sm font-semibold'>Jacket</span>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='flex justify-center items-center bg-slate-200 w-16 h-16 rounded-full'>
              <img
                className='w-10 h-w-10'
                src='https://img.icons8.com/?size=100&id=116807&format=png&color=000000'
                alt=''
              />
            </div>
            <span className='text-sm font-semibold'>Muslimah</span>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-y-4'>
        <div className='carousel rounded-box flex gap-x-4'>
          <div className='carousel-item'>
            <div className='rounded-full px-3 py-1 border border-slate-500 text-sm font-bold'>
              All
            </div>
          </div>
          <div className='carousel-item'>
            <div className='rounded-full px-3 py-1 border border-slate-500 text-sm font-bold'>
              Newest
            </div>
          </div>
          <div className='carousel-item'>
            <div className='rounded-full px-3 py-1 border border-slate-500 text-sm font-bold'>
              Popular
            </div>
          </div>
          <div className='carousel-item'>
            <div className='rounded-full px-3 py-1 border border-slate-500 text-sm font-bold'>
              Men
            </div>
          </div>
          <div className='carousel-item'>
            <div className='rounded-full px-3 py-1 border border-slate-500 text-sm font-bold'>
              Woman
            </div>
          </div>
        </div>
      </section>
      {/* <section className='flex flex-col gap-y-4'> */}
      <ProductList
        products={product}
        isLoading={isLoading}
        isError={isError}
        onFetchProducts={fetchProducts}
      />
      {/* </section> */}
    </main>
  )
}

export default MainPage
