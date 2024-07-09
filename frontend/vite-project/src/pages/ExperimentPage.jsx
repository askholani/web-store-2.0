// import * as yup from 'yup'
// import { useFormik } from 'formik'

// const MAX_FILE_SIZE = 2000000
// const imageVal = yup
//   .mixed()
//   .required('A image is required')
//   .test('fileType', 'Unsupported file format', (value) => {
//     if (!value) return true // Image is optional
//     const supportedFormats = ['image/jpeg', 'image/png']
//     return supportedFormats.includes(value.type)
//   })
//   .test('fileSize', `File too big, can't exceed ${MAX_FILE_SIZE}`, (value) => {
//     if (!value) return true // Image is optional
//     return value.size <= MAX_FILE_SIZE
//   })

// const ExperimentPage = () => {
//   const formik = useFormik({
//     initialValues: {
//       image: '',
//     },
//     validationSchema: yup.object({
//       image: imageVal,
//     }),
//   })
//   return <form></form>
// }

// export default ExperimentPage
