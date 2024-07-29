const AlertConfirmation = ({
  onHanldeShowAlert,
  onHandleDelete,
  message = 'Are you sure delete it?',
}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50'>
      <div className='w-full h-full bg-black opacity-50 z-0 absolute'></div>
      <div role='alert' className='alert relative z-50 rounded-md w-4/5'>
        <span>{message}</span>
        <div className='flex gap-x-4'>
          <button
            className='btn btn-sm border-slate-300'
            onClick={() => onHanldeShowAlert()}>
            Cancel
          </button>
          <button
            className='btn btn-sm btn-primary'
            onClick={() => onHandleDelete()}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertConfirmation
