import { useContext, useState } from 'react'
import { useQueryItem, deConvertSort, handleSortPage } from '../utils/helpers'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

let order = true

const Sort = ({ onHandleSort, fetchData }) => {
  const queryItem = useQueryItem()
  const location = useLocation()
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const { category: paramCategory, sort: paramSort } = queryItem

  const [sort, setSort] = useState(() => {
    return deConvertSort(paramSort)
  })

  const handleSort = async (newSort) => {
    if (newSort === sort) {
      order = !order
    } else {
      order = true
    }

    setSort(newSort)
    const rest = await handleSortPage({
      location,
      navigate,
      sort: newSort,
      order: order ? 'asc' : 'desc',
      paramCategory,
      fetchData: fetchData,
      queryItem,
      user,
    })

    onHandleSort(rest)
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
