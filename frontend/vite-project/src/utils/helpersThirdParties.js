import axiosInstance from '../api/axiosAuth'

export const fetchProvincies = async () => {
  try {
    const res = await axiosInstance.get('/third-parties/indonesia-region')
    return { success: true, prov: res, message: 'successfully' }
  } catch (err) {
    return { success: false, prov: null, message: err.message }
  }
}

export const fetchRegency = async ({ id }) => {
  try {
    const res = await axiosInstance.get(`/third-parties/indonesia-region`, {
      params: {
        type: 'regency',
        id,
      },
    })
    console.log('res', res)
    return { success: true, reg: res, message: 'successfully' }
  } catch (err) {
    return { success: false, reg: null, message: err.message }
  }
}

export const fetchLocation = async () => {
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

    return result
  } catch (error) {
    console.log('error', error)
  }
}
