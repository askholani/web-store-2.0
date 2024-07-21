const ProductImages = ({ data, onSelectImages }) => {
  const handleSelectImages = (image) => {
    onSelectImages(image)
  }
  return (
    <div className='top-[50vh] absolute left-0 right-0 px-8 '>
      <div className='bg-white p-1 rounded-md flex gap-x-2 carousel carousel-center cursor-pointer'>
        {data &&
          data.map((val, idx) => {
            return (
              <div
                onClick={() => handleSelectImages(val.image)}
                key={val.id + idx}
                className='cursor-pointer w-14 h-14 bg-slate-600 rounded-md overflow-hidden carousel-item block'>
                <img className='object-contain' src={val.image} alt='' />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ProductImages
