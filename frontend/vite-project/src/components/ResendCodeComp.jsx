import PropTypes from 'prop-types'
import { useState } from 'react'

const ResendCodeComp = ({ onHandleResend, onResendCode }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [isPending, setPending] = useState(false)

  const handleResend = async () => {
    setPending(true)
    try {
      const result = await onResendCode()
      onHandleResend(result.data.verified_code_expired)
      setSuccessMessage('Resend code successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 2000)
    } catch (error) {
      setApiError(`Error resending code: ${error}`)
      setTimeout(() => {
        setApiError(null)
      }, 2000)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className='flex w-full flex-col'>
      <span className='opacity-60'>Didn&apos;t receive code?</span>
      <div className='flex flex-col gap-y-1'>
        <button
          type='button'
          onClick={handleResend}
          className='font-semibold underline cursor-pointer flex gap-x-2 justify-center'>
          {!isPending && <span>Resend code</span>}
          {isPending && (
            <>
              <span>Resend code</span>
              <span className='loading loading-spinner loading-xs'></span>
            </>
          )}
        </button>
        {successMessage && <p className='text-green-500'>{successMessage}</p>}
        {apiError && <p className='text-red-500'>{apiError}</p>}
      </div>
    </div>
  )
}

ResendCodeComp.propTypes = {
  onHandleResend: PropTypes.func.isRequired,
  onResendCode: PropTypes.func.isRequired,
}

export default ResendCodeComp
