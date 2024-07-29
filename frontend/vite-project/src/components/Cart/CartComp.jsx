import { useState } from 'react'

const CartComp = ({
  value = null,
  onHandleProductCount,
  onHanldeShowAlert,
  type = 'cart',
}) => {
  console.log('value', value)
  const [data, setData] = useState({
    count: value ? value.count : null,
    id: value ? value.id : null,
    price: value ? value.product.price : null,
  })

  const handleCount = (count) => {
    const coba = (prev, count) => {
      const newCount = prev.count + count
      const data = {
        ...prev,
        count: newCount < 1 ? 1 : newCount,
      }
      return data
    }
    const res = coba(data, count)
    setData(res)
    onHandleProductCount(res)
  }

  const handleDelete = ({ id }) => {
    onHanldeShowAlert({ id })
  }

  return (
    <div className='flex gap-x-4 pb-4 border-b'>
      <div className={`flex gap-x-2 ${type !== 'cart' ? 'w-full' : 'w-2/3'}`}>
        <div className='skeleton h-24 w-24 overflow-hidden'>
          <img
            src={value ? value.image : ''}
            alt=''
            className='object-contain'
          />
        </div>
        <div
          className={`flex flex-col ${
            type !== 'cart' ? 'w-full' : ' w-1/2'
          } text-start gap-y-1 justify-end py-1`}>
          <span className='line-clamp-1 font-semibold'>
            {value ? value.product.name : ''}
          </span>
          <div className='grid grid-cols-2'>
            <span className='text-sm'>Size : {value ? value.size : ''}</span>
            {type !== 'cart' && (
              <span className='text-sm'>
                quantity : {value ? value.quantity : ''}
              </span>
            )}
          </div>
          <div className='flex gap-x-2 text-sm items-center'>
            <span
              className={`w-4 h-4`}
              style={{ backgroundColor: value ? value.color : '' }}></span>
            <span>{value ? value.color : ''}</span>
          </div>

          <span className='line-clamp-1 font-semibold'>
            Rp {value ? value.product.price : ''}.000
          </span>
        </div>
      </div>
      {type === 'cart' && (
        <div className='flex flex-col gap-y-2 justify-end w-1/3 text-xs '>
          <div className='flex gap-x-2 items-center justify-between'>
            <button
              className='btn btn-sm text-sm'
              onClick={() => handleCount(-1)}>
              <i className='fas fa-minus'></i>
            </button>
            <span>{data ? data.count : 1}</span>
            <button
              className='btn btn-sm bg-slate-400 text-white hover:bg-slate-500'
              onClick={() => handleCount(1)}>
              <i className='fas fa-plus'></i>
            </button>
          </div>
          <button
            className='flex gap-x-2 btn btn-sm px-2'
            onClick={() => handleDelete({ id: data.id })}>
            <i className='fas fa-trash'></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default CartComp
