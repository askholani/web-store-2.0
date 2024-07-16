import { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import { convertSort, useQuery, useQueryItem } from '../../utils/helpers'
import SearcList from './SearchList'

const SearchComp = ({
  onFetchProducts,
  isLoading,
  isError,
  prodRec,
  onHandleShowList,
  showList,
}) => {
  const query = useQuery()
  const queryItem = useQueryItem()
  const [value, setValue] = useState('')
  const [searching, setSearching] = useState(false)

  const page = query.get('page')
  const search = query.get('search')

  const handleKeyDown = (e) => {
    console.log(e.key)
    if (e.key === 'enter') {
      setSearching(true)
    }
    if (e.key === 'Escape') {
      onHandleShowList(false)
    }
  }

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleShowList = () => {
    onHandleShowList(true)
  }

  const debouncedFetchResults = useCallback(
    _.debounce((searchQuery) => {
      const newQueryItem = {
        ...queryItem,
        sort: convertSort(queryItem.sort),
      }
      onFetchProducts(page, newQueryItem, searchQuery, searching)
    }, 300),
    [],
  )

  useEffect(() => {
    if (search) {
      debouncedFetchResults(search)
    }
  }, [search, debouncedFetchResults])

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
      <SearcList show={showList} />
    </section>
  )
}

export default SearchComp
