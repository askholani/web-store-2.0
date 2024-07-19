import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
const sizes = ['s', 'm', 'l', 'xl']
const ExperimentPage = () => {
  const [data, setData] = useState(null)
  const { getNewProduct, storeNewProduct } = useContext(AuthContext)
  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const handleImage = async () => {
    try {
      // const type = 'trouser';
      const result = await getNewProduct('man trouser', 5)
      const item = []

      result.data.forEach((val) => {
        const numSize = getRandomInteger(0, 3)
        const numPrice = getRandomInteger(100, 200)
        item.push({
          likes: val.likes,
          description:
            (val.alt_description ? val.alt_description : '') +
            ', ' +
            (val.description ? val.description : ''),
          name: val.alt_description,
          image: val.urls.small_s3,
          size: sizes[numSize],
          color: val.color,
          price: numPrice,
          category: 'trouser',
        })
      })

      setData(item) // Update the state with the new item array
    } catch (error) {
      console.error('Error handling image:', error)
    }
  }

  console.log('data', data)

  const handleStoreNewProduct = async () => {
    try {
      const result = await storeNewProduct(data) // Assuming data is defined in the component's state or context
      console.log(result)
    } catch (error) {
      console.error('Error storing new product:', error)
    }
  }

  // console.log('data', data)
  return (
    <div className='flex flex-col gap-y-8'>
      <button onClick={handleImage} className='btn btn-sm'>
        get data
      </button>
      {data ? (
        <div className='flex justify-around flex-wrap'>
          {data.map((value) => {
            return (
              <div key={value.id} className='relative'>
                <div className='bg-slate-50 w-8 h-8 absolute top-2 right-2 flex justify-center items-center rounded-full'>
                  <i className='fas fa-heart text-lg'></i>
                </div>
                <div className=' bg-slate-300  rounded-md'>
                  <img
                    src={value.image}
                    alt=''
                    className='w-40 h-40 object-cover'
                  />
                </div>
                <div className='flex flex-col gap-y-1 font-semibold text-start px-1'>
                  <span>Brown Jacket</span>
                  <span>Rp 5.000,00</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <>null</>
      )}
      <button onClick={handleStoreNewProduct} className='btn btn-sm'>
        store
      </button>
    </div>
  )
}

export default ExperimentPage
