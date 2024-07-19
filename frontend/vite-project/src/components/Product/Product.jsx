import { Link } from 'react-router-dom'

const Product = ({ value }) => {
  // console.log('value', value)
  return (
    <Link
      to={`/product/${value.id}-${value.name}`}
      key={value.id}
      className='relative w-1/2'>
      <div className='bg-slate-50 w-8 h-8 absolute top-2 right-6 flex justify-center items-center rounded-full'>
        <i className='fas fa-heart text-lg'></i>
      </div>
      <div className='rounded-md'>
        <img src={value.image} alt='' className='w-40 h-40 object-cover' />
      </div>
      <div className='flex flex-col gap-y-1 font-semibold text-start px-1'>
        <span className='line-clamp-1'>{value.name}</span>
        <span>Rp {value.price}.000,00</span>
      </div>
    </Link>
  )
}

export default Product
