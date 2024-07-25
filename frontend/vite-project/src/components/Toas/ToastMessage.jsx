const ToastMessage = ({ message, success }) => {
  // console.log('message', message)
  // console.log('success', success)
  // if (typeof message === 'string') {
  return (
    <div className='toast toast-center fixed top-4 z-50 w-full h-fit'>
      <div className='alert w-full gap-y-2 flex flex-col bg-transparent border-none p-0'>
        <div
          className={`grid grid-cols-12 w-full items-center ${
            success ? 'bg-green-400' : 'bg-red-400 '
          } py-2 px-1 rounded-md text-slate-50`}>
          <i className='fas fa-exclamation-circle text-white col-span-2'></i>
          <span className='col-span-10 text-start'>{message}.</span>
        </div>
      </div>
    </div>
  )
  // }
  // return null
}

export default ToastMessage
