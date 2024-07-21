const Product = ({ value, wishlist }) => {
  return (
    <>
      <div className='bg-slate-50 w-8 h-8 absolute top-2 right-6 flex justify-center items-center rounded-full'>
        <i
          className={`fas fa-heart text-lg  ${
            wishlist ? 'text-red-600' : ''
          }`}></i>
      </div>
      <div className='rounded-md overflow-hidden'>
        <img src={value.image} alt='' className='w-40 h-40 object-cover' />
      </div>
      <div className='flex flex-col gap-y-1 font-semibold text-start px-1'>
        <span className='line-clamp-1'>{value.name}</span>
        <span>Rp {value.price}.000,00</span>
      </div>
    </>
  )
}

export default Product
