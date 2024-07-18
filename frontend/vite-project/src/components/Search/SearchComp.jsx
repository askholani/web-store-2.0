import { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import { convertSort, useQuery, useQueryItem } from '../../utils/helpers'
import SearcList from './SearchList'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchComp = ({ onFetchProducts, isLoading, isError, prodRec }) => {
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearching(true)
      onFetchProducts(page, newQueryItem, value, true)
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
    _.debounce((searchQuery) => {
      onFetchProducts(page, newQueryItem, searchQuery, searching)
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
