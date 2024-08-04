import { useRef, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { fetchLocation, fetchRegency } from '../../utils/helpersThirdParties'

const AddressForm = () => {
  const data = useLoaderData()
  const province = data.prov

  const textAreaRef = useRef(null)
  const [regionData, setRegionData] = useState(province)
  const [search, setSearch] = useState('')
  const [filteredRegion, setFilteredRegion] = useState([])
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [location, setLocation] = useState({
    prov: null,
    regency: null,
    address: null,
  })

  const handleSearchInput = (e) => {
    const value = e.target.value
    setSearch(value)

    const filtered = regionData.data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    )

    if (filtered.length >= 7) {
      setFilteredRegion(filtered.slice(0, 8))
      return
    }
    setFilteredRegion(filtered)
  }

  // if user click current location button
  const handleLocation = async () => {
    const position = await fetchLocation()
    const { state, county } = position.address
    setLocation((prev) => ({
      ...prev,
      prov: state,
      regency: county,
    }))
    textAreaRef.current.value = `${state} - ${county}`
  }

  // track user input on textarea tag
  const handleTextArea = (e) => {
    console.log('value Ref:', textAreaRef.current.value)
    console.log('value target:', e.target.value)
  }

  // wheg user click button on keyboard
  const handleKeyDown = async (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null
          ? 0
          : Math.min(filteredRegion.length - 1, prevIndex + 1),
      )
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex === null
          ? filteredRegion.length - 1
          : Math.max(0, prevIndex - 1),
      )
    } else if (e.key === 'Enter') {
      if (highlightedIndex !== null) {
        const selectedItem = filteredRegion[highlightedIndex]
        setSearch(selectedItem.name.toLowerCase())
        if (location.prov === null) {
          setLocation((prev) => ({
            ...prev,
            prov: selectedItem,
          }))
          const res = await fetchRegency({ id: selectedItem.id })
          setRegionData(res.reg)
          setSearch('')
          setFilteredRegion(res.reg.data)
        } else if (location.regency === null) {
          setLocation((prev) => ({
            ...prev,
            regency: selectedItem,
          }))
          setSearch('')
          setFilteredRegion([])
        }
      } else if (filteredRegion.length === 1) {
        const selectedItem = filteredRegion[0]
        setSearch(selectedItem.name.toLowerCase())
        if (location.prov === null) {
          setLocation((prev) => ({
            ...prev,
            prov: selectedItem,
          }))
          const res = await fetchRegency({ id: selectedItem.id })
          setRegionData(res.reg)
          setSearch('')
          setFilteredRegion(res.reg.data)
        } else if (location.regency === null) {
          setLocation((prev) => ({
            ...prev,
            regency: selectedItem.name.toLowerCase(),
          }))
          setSearch('')
          setFilteredRegion([])
        }
      }
    }
  }

  const displayLocationData = () => {
    if (location.prov === null && search.length === 0) {
      return false
    } else {
      return true
    }
  }

  // *
  const handleLocationClick = async ({ index }) => {
    const item = filteredRegion[index]
    setSearch(item.name.toLowerCase())
    console.log('hadleLocationClick', item)
    console.log('location', location)
    if (location.prov === null) {
      setLocation((prev) => ({
        ...prev,
        prov: item,
      }))
      const res = await fetchRegency({ id: item.id })
      console.log('res', res)
      setRegionData(res.reg)
      setFilteredRegion(res.reg.data)
      setSearch('')
      return
    }
    setLocation((prev) => ({
      ...prev,
      regency: item,
    }))
    setSearch('')
    setFilteredRegion([])
  }

  // delete province when user click
  const handleRegencyClick = (() => {
    let regTimeout
    return () => {
      if (regTimeout) {
        clearTimeout(regTimeout)
      }
      setLocation((prev) => ({ ...prev, regency: null }))
      regTimeout = setTimeout(() => setFilteredRegion(regionData.data), 250)
    }
  })()

  // delete province when user click
  const handleProvClick = (() => {
    let provTimeout
    return () => {
      if (provTimeout) {
        clearTimeout(provTimeout)
      }
      setLocation((prev) => ({ ...prev, prov: null, regency: null }))
      console.log('ganteng 2')
      // console.log('prvina', province)

      provTimeout = setTimeout(() => {
        setRegionData(province.data)
        setFilteredRegion(province.data), 250
      })
    }
  })()
  console.log('location', location)

  console.log('filtered', filteredRegion)

  return (
    <main className='fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'>
      <div className='absolute top-0 bottom-0 left-0 right-0 bg-black opacity-60 z-10'></div>
      <div className='bg-slate-50 flex flex-col z-50 w-full py-4 rounded-t-xl border border-white h-[80%] absolute bottom-0'>
        <div className='relative flex flex-col items-center justify-center w-full gap-y-4'>
          <div className='relative w-[85%] z-50'>
            <div className='relative flex items-center justify-center'>
              <i className='fas fa-search absolute left-2 opacity-70 text-slate-600'></i>
              <input
                value={search}
                onKeyDown={handleKeyDown}
                onChange={handleSearchInput}
                type='text'
                placeholder='Type here'
                className='input input-sm input-bordered w-full pl-8 text-slate-700 h-[2.5rem]'
              />
            </div>
            {displayLocationData() && (
              <div className='absolute top-12 left-0 right-0 bg-slate-100 text-start rounded-md flex flex-col'>
                {filteredRegion.map((item, index) => (
                  <span
                    key={item.id}
                    className={`px-4 py-2 capitalize pb-2 border-b text-sm ${
                      index === highlightedIndex ? 'bg-gray-200' : ''
                    }`}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => {
                      handleLocationClick({ index })
                      console.log('Selected Item:', item)
                    }}>
                    {item.name.toLowerCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className='flex flex-wrap relative text-xs justify-start w-full px-4 tracking-wider gap-x-2'>
            {location.prov && (
              <div
                onClick={handleProvClick}
                className='relative pl-3 pr-6 py-1 bg-slate-700 text-slate-100 rounded-full capitalize'>
                <span>{location.prov?.name.toLowerCase()}</span>
                <i className='fas fa-times absolute right-1'></i>
              </div>
            )}
            {location.regency && (
              <div
                onClick={handleRegencyClick}
                className='relative pl-3 pr-6 py-1 bg-slate-700 text-slate-100 rounded-full capitalize'>
                <span>{location.regency?.name.toLowerCase()}</span>
                <i className='fas fa-times absolute right-1'></i>
              </div>
            )}
          </div>
          <div className='flex flex-col w-[85%]'>
            <div
              onClick={handleLocation}
              className='flex gap-x-4 py-3 border-t border-b border-slate-400 items-center cursor-pointer'>
              <i className='fas fa-map-marker-alt'></i>
              <span className='font-bold opacity-70'>
                Using your current location
              </span>
            </div>
          </div>
          <div className='w-full'>
            <textarea
              ref={textAreaRef}
              onChange={handleTextArea}
              className='textarea textarea-bordered w-[90%]'
              placeholder='Address'></textarea>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddressForm
