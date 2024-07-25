const CartComp = ({ value, key }) => {
  console.log('value', value)
  return (
    <div className='flex gap-x-4 pb-4 border-b' key={key}>
      <div className='flex gap-x-2 w-2/3'>
        <div className='skeleton h-24 w-24 overflow-hidden'>
          <img src={value.image} alt='' className='object-contain' />
        </div>
        <div className='flex flex-col w-1/2 text-start gap-y-1 justify-end py-1'>
          <span className='line-clamp-1 font-semibold'>
            {value.product.name}
          </span>
          <span className='text-sm'>Size : {value.size}</span>
          <div className='flex gap-x-2 text-sm items-center'>
            <span
              className={`w-4 h-4`}
              style={{ backgroundColor: value.color }}></span>
            <span>{value.color}</span>
          </div>

          <span className='line-clamp-1 font-semibold'>
            Rp {value.product.price}
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-y-2 justify-end w-1/3 text-xs '>
        <div className='flex gap-x-2 items-center justify-between'>
          <button className='btn btn-sm text-sm'>
            <i className='fas fa-minus'></i>
          </button>
          <span>1</span>
          <button className='btn btn-sm bg-slate-400 text-white hover:bg-slate-500'>
            <i className='fas fa-plus'></i>
          </button>
        </div>
        <button className='flex gap-x-2 btn btn-sm px-2'>
          <i className='fas fa-trash'></i>
        </button>
      </div>
    </div>
  )
}

export default CartComp
