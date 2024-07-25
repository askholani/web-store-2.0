import { useState, useEffect, useCallback, useContext } from 'react'
import _ from 'lodash'
import { convertSort, useQuery, useQueryItem } from '../../utils/helpers'
import SearcList from './SearchList'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductContext from '../../context/ProductContext'

const SearchComp = ({ onHandleSearch }) => {
  const [prodRec, setProdRec] = useState(null)
  const { fetchProducts } = useContext(ProductContext)
  const query = useQuery()
  const queryItem = useQueryItem()
  const [value, setValue] = useState('')
  const [searching, setSearching] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const newQueryItem = {
    ...queryItem,
    sort: convertSort(queryItem.sort),
  }

  const page = query.get('page')

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setSearching(true)
      const data = {
        pageData: page,
        query: newQueryItem,
        search: value,
        press: true,
      }
      const rest = await fetchProducts(data)
      console.log('rest', rest)
      // onFetchProducts(page, newQueryItem, value, true)
      onHandleSearch(rest.products)
      navigate(`${location.pathname}?search=${value}`)
    }
  }

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleShowList = () => {
    setSearching(false)
  }

  const debouncedFetchResults = useCallback(
    _.debounce(async (searchQuery) => {
      const data = {
        pageData: page,
        query: newQueryItem,
        search: searchQuery,
        press: searching,
      }
      const rest = await fetchProducts(data)
      setProdRec(rest.prodRec.data)
    }, 500),
    [],
  )

  useEffect(() => {
    if (value) {
      debouncedFetchResults(value)
    }
  }, [value, debouncedFetchResults])

  return (
    <section className='flex flex-col gap-y-2'>
      <div className='flex'>
        <label className='input input-bordered flex items-center gap-2 w-full'>
          <input
            type='text'
            className='grow'
            placeholder='Search'
            value={value}
            onClick={handleShowList}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          <i className='fas fa-search text-lg'></i>
        </label>
      </div>
      <SearcList prodRec={prodRec} search={value} searching={searching} />
    </section>
  )
}

export default SearchComp
