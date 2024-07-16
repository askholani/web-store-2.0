const SearcList = ({ show }) => {
  console.log('show', show)
  return (
    <div className='relative'>
      {show && (
        <div className='bg-slate-50 h-60 w-full absolute border border-slate-200'></div>
      )}
    </div>
  )
}

export default SearcList
