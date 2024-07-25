const SearcList = ({ prodRec, search, searching }) => {
  // console.log('prodRec', prodRec)
  // console.log('search', search)
  // console.log('searching', searching)
  return (
    <div className='relative'>
      {!searching && search.length > 0 && prodRec && (
        <div className='bg-slate-50 w-full absolute border border-slate-200 rounded-md flex flex-col text-start gap-y-1'>
          {prodRec.map((value, ind) => {
            return (
              <span
                key={`${value.name} ${ind}`}
                className='border-b border-b-slate-300 pb-1 pt-2 px-4 line-clamp-1'>
                {value.name}
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearcList
