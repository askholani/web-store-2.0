import { useState, useContext } from 'react'
import { useQueryItem, convertSort, deConvertSort } from '../utils/helpers'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductContext from '../context/ProductContext'

let order = true

const Sort = () => {
  const { fetchProducts } = useContext(ProductContext)
  const queryItem = useQueryItem()
  const location = useLocation()
  const navigate = useNavigate()

  const { category: paramCategory, sort: paramSort } = queryItem

  const [sort, setSort] = useState(() => {
    return deConvertSort(paramSort)
  })

  const handleSort = (newSort) => {
    if (newSort === sort) {
      order = !order
    } else {
      order = true
    }
    handlePageChange(newSort, order ? 'asc' : 'desc')
    setSort(newSort)
  }

  const handlePageChange = (sort, order) => {
    let sortData = convertSort(sort)
    let newPath = ''
    if (paramCategory) {
      newPath =
        location.pathname +
        `?page=1` +
        `&category=${paramCategory}&sort=${sort}&order=${order}`
    } else {
      newPath =
        location.pathname + `?page=1` + `&sort=${sortData}&order=${order}`
    }
    navigate(newPath)
    const newQueryItem = {
      ...queryItem,
      sort: sortData,
      order: order,
    }
    fetchProducts(1, newQueryItem)
  }

  return (
    <section className='flex flex-col gap-y-4'>
      <div className='carousel rounded-box flex gap-x-4'>
        <div
          className={`carousel-item transition-all ${
            sort === 'all' ? 'text-white bg-slate-500 rounded-full' : ''
          }`}
          onClick={() => handleSort('all')}>
          <div className='rounded-full px-3 py-1 border border-slate-500 text-sm font-bold'>
            All
          </div>
        </div>
        <div
          className={`carousel-item transition-all ${
            sort === 'newst' ? 'text-white bg-slate-500 rounded-full' : ''
          }`}
          onClick={() => handleSort('newst')}>
          <div className='rounded-full px-3 py-1 border border-slate-500 text-sm font-bold'>
            Newst
          </div>
        </div>
        <div
          className={`carousel-item transition-all ${
            sort === 'popular' ? 'text-white bg-slate-500 rounded-full' : ''
          }`}
          onClick={() => handleSort('popular')}>
          <div className='rounded-full px-3 py-1 border border-slate-500 text-sm font-bold'>
            Popular
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sort
