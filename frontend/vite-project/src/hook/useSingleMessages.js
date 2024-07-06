import { useEffect, useState } from 'react'

const useSingleErrorMessage = (formik, fieldNames) => {
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const errors = fieldNames.reduce((acc, fieldName) => {
      if (formik.touched[fieldName] && formik.errors[fieldName]) {
        acc.push(formik.errors[fieldName])
      }
      return acc
    }, [])

    if (errors.length > 0) {
      setErrorMessage(errors[0]) // Choose the first error to display
    } else {
      setErrorMessage(null)
    }
  }, [formik.touched, formik.errors, fieldNames])

  return errorMessage
}

export default useSingleErrorMessage
