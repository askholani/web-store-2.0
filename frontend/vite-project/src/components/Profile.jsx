// Profile.jsx
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import InputComp from './InputComp'
import SelectComp from './SelectComp'
import ImageComp from './ImageComp'

const genderOption = ['male', 'female']
const MAX_FILE_SIZE = 2000000
const imageVal = yup
  .mixed()
  .required('A image is required')
  .test('fileType', 'Unsupported file format', (value) => {
    if (!value) return true // Image is optional
    const supportedFormats = ['image/jpeg', 'image/png']
    return supportedFormats.includes(value.type)
  })
  .test('fileSize', `File too big, can't exceed ${MAX_FILE_SIZE}`, (value) => {
    if (!value) return true // Image is optional
    return value.size <= MAX_FILE_SIZE
  })

const Profile = ({ user, onComplete }) => {
  const { name, phone, gender, photo } = user
  // console.log('photo', photo)
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleFile = (file) => {
    formik.values.photo = file
  }

  const formik = useFormik({
    initialValues: {
      name: name || '',
      phone: phone || '',
      gender: gender || 'male',
      photo: photo || '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      phone: yup.string().required('Phone number is required'),
      gender: yup.string().required('Gender is required'),
      photo: imageVal,
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true)
      setApiError(null)
      try {
        const { name, phone, gender, photo } = values
        const result = await onComplete(name, phone, gender, photo)
        // console.log('result', result)
        if (result.status === 201) {
          setSuccessMessage('Registration successful! Redirecting to login...')
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        }
      } catch (error) {
        setApiError(error.message || 'An error occurred')
        setTimeout(() => {
          setApiError(null)
        }, 2000)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='flex flex-col gap-y-6 text-sm'>
      <div className='flex flex-col gap-y-4'>
        <ImageComp
          formikD={formik}
          name='photo'
          onFileHandle={handleFile}
          photo={photo}
        />
        <InputComp formikD={formik} name='name' type='text' />
        <InputComp formikD={formik} name='phone' type='number' />
        <SelectComp formikD={formik} name='gender' options={genderOption} />
      </div>
      <button
        type='submit'
        className='w-full rounded-full text-center bg-slate-700 text-white py-3 font-semibold'
        disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Complete Profile'}
      </button>
      {apiError && <p className='text-red-500'>{apiError}</p>}
      {successMessage && <p className='text-green-500'>{successMessage}</p>}
    </form>
  )
}

// import axios from 'axios'
// import { useState } from 'react'

// const Profile = () => {
//   const [file, setFile] = useState(null)

//   function handleChange(event) {
//     setFile(event.target.files[0])
//   }

//   function handleSubmit(event) {
//     event.preventDefault()
//     const url = 'http://localhost:8000/api/profile/complete'
//     const formData = new FormData()
//     formData.append('file', file)
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data',
//       },
//     }
//     axios.post(url, formData, config).then((response) => {
//       console.log(response.data)
//     })
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <h1 className='mb-3'>React File Upload</h1>
//       <div className='mb-3'>
//         <input className='input' type='file' onChange={handleChange} />
//       </div>
//       <button type='submit' className='btn btn-primary'>
//         Upload
//       </button>
//     </form>
//   )
// }

export default Profile
