import { useContext } from 'react'
import ProductList from '../components/Product/ProductList'
import ProductContext from '../context/ProductContext'
import Category from '../components/Category'
import Sort from '../components/Sort'
import SearchComp from '../components/Search/SearchComp'

const MainPage = () => {
  const { isLoading, isError, product, fetchProducts, prodRec } =
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
      <SearchComp
        onFetchProducts={fetchProducts}
        isLoading={isLoading}
        isError={isError}
        prodRec={prodRec}
      />
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
      <Category />
      <Sort />
      <ProductList
        products={product}
        isLoading={isLoading}
        isError={isError}
        onFetchProducts={fetchProducts}
      />
    </main>
  )
}

export default MainPage
