import { useContext, useEffect, useRef, useState } from 'react'
import ProductList from '../components/Product/ProductList'
import ProductContext from '../context/ProductContext'
import Category from '../components/Category'
import Sort from '../components/Sort'
import SearchComp from '../components/Search/SearchComp'
import { convertSort, useQuery, useQueryItem } from '../utils/helpers'

const MainPage = () => {
  const { fetchProducts } = useContext(ProductContext)

  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)
  const query = useQuery()
  const page = query.get('page')
  const querItem = useQueryItem()

  const fetchProductsRef = useRef(fetchProducts)
  const pageRef = useRef(page)
  const querItemRef = useRef(querItem)

  useEffect(() => {
    const handleProductWishlist = async () => {
      // setIsLoading(true)
      const newQueryItem = {
        ...querItemRef.current,
        sort: convertSort(querItemRef.current.sort),
      }
      const data = {
        pageData: pageRef.current,
        query: newQueryItem,
      }
      try {
        const rest = await fetchProductsRef.current(data)
        // console.log('rest', rest)
        setProducts(rest.products)
      } catch (err) {
        setIsError(err.message || 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    handleProductWishlist()
  }, [])

  const handleSearch = (products) => {
    setProducts(products)
  }

  const handleCategory = (products) => {
    setProducts(products)
  }

  const handleSort = (data) => {
    setProducts(data.products)
  }

  const handlePage = (products) => {
    setProducts(products)
  }

  return (
    <>
      {/* {isLoading && <LoaderFetching />} */}
      <main className='px-1 py-4 flex flex-col gap-y-8 mb-16'>
        <section className='flex justify-between items-end'>
          <div className='flex flex-col gap-y-2'>
            <span className='text-start font-semibold opacity-60'>
              Location
            </span>
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
        <SearchComp onHandleSearch={handleSearch} fetchData={fetchProducts} />
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
        <Category onHandleCategory={handleCategory} />
        <Sort onHandleSort={handleSort} fetchData={fetchProducts} />
        <ProductList
          products={products}
          isLoading={isLoading}
          isError={isError}
          onHandlePage={handlePage}
        />
      </main>
    </>
  )
}

export default MainPage
