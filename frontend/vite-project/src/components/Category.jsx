import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { convertSort, useQueryItem } from '../utils/helpers'
import ProductContext from '../context/ProductContext'

const categories = [
  {
    value: 'trouser',
    img: 'https://img.icons8.com/?size=100&id=10179&format=png&color=000000',
  },
  {
    value: 'shirt',
    img: 'https://img.icons8.com/?size=100&id=105820&format=png&color=000000',
  },
  {
    value: 'jacket',
    img: 'https://img.icons8.com/?size=100&id=60888&format=png&color=000000',
  },
  {
    value: 'muslimah',
    img: 'https://img.icons8.com/?size=100&id=116807&format=png&color=000000',
  },
]

const Category = ({ onHandleCategory }) => {
  const { fetchProducts } = useContext(ProductContext)
  const queryItem = useQueryItem()
  const location = useLocation()
  const navigate = useNavigate()
  const { category: paramCategory, sort: paramSort } = queryItem

  const [category, setCategory] = useState(paramCategory)

  const handleChangeCategory = (newCategory) => {
    setCategory(newCategory)
    handlePageChange(newCategory)
  }

  const handlePageChange = async (category) => {
    let newPath = ''
    if (paramSort) {
      newPath =
        location.pathname +
        `?page=1` +
        `&category=${category}&sort=${paramSort}`
    } else {
      newPath = location.pathname + `?page=1` + `&category=${category}`
    }

    const newQueryItem = {
      ...queryItem,
      category,
      sort: convertSort(queryItem.sort),
    }
    const data = {
      pageData: 1,
      query: newQueryItem,
    }
    const rest = await fetchProducts(data)
    navigate(newPath)
    onHandleCategory(rest.products)
  }

  return (
    <section className='flex flex-col gap-y-4'>
      <div className='flex justify-between items-end'>
        <span className='text-lg font-bold'>Category</span>
        <span className='text-sm' onClick={() => handleChangeCategory('all')}>
          See All
        </span>
      </div>
      <div className='flex justify-between'>
        {categories.map((data) => {
          return (
            <div
              onClick={() => handleChangeCategory(data.value)}
              className='flex justify-center flex-col cursor-pointer'
              key={data.value}>
              <div
                value={data.value}
                //  className='flex justify-center items-center bg-slate-200 w-16 h-16 rounded-full'>
                className={`flex justify-center items-center w-16 h-16 rounded-full transition-all  border border-slate-200 ${
                  category === data.value ? 'bg-slate-300' : 'bg-slate-100'
                }`}>
                <img
                  value={data.value}
                  className='w-10 h-w-10'
                  src={data.img}
                  alt={data.value}
                />
              </div>
              <span className='text-sm font-semibold'>{data.value}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Category
