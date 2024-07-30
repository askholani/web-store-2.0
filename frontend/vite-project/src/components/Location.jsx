import { useState } from 'react'

const LocationComp = () => {
  const [position, setPosition] = useState({
    city: 'New York',
    country: 'USA',
  })

  const handleLocation = async () => {
    if (!confirm('Are you aggreed to share your location?')) return
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      return
    }
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      const res = await fetch(url)
      const result = await res.json()
      setPosition(() => ({
        city: result.address.city,
        country: result.address.country,
      }))
      console.log('result', result)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className='flex flex-col gap-y-2'>
      <span className='text-start font-semibold opacity-60'>Location</span>
      <div
        onClick={handleLocation}
        className='flex gap-x-2 items-center cursor-pointer'>
        <i className='fas fa-map-marker-alt text-xl'></i>
        <span className='font-bold'>
          {position.city}, {position.country}
        </span>
      </div>
    </div>
  )
}

export default LocationComp
