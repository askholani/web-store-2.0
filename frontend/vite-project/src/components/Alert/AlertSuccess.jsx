import ToastMessage from '../Toas/ToastMessage'

const AlertError = ({ errors, message }) => {
  if (typeof message === 'string') {
    console.log('message', message)
    return <ToastMessage message={message} />
  }
  return (
    <div className='toast toast-center fixed z-50 w-full top-4'>
      <div className='alert w-full gap-y-2 flex flex-col bg-transparent border-none p-0'>
        {errors &&
          message.map((value) => {
            return (
              <div
                key={value.path}
                className='grid grid-cols-12 w-full items-center bg-red-400 py-2 px-1 rounded-md text-slate-50'>
                <i className='fas fa-exclamation-circle text-white col-span-2'></i>
                <span className='col-span-10 text-start'>{value.message}.</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default AlertError
