import { useState } from 'react'

const ImageComp = ({ formikD, name, onFileHandle, photo }) => {
  // console.log('photo', photo)
  const [image, setImage] = useState(photo)
  const handlePreview = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => setImage(e.target.result)
  }
  const handleFile = (event) => {
    const file = event.currentTarget.files[0]
    onFileHandle(file)
    handlePreview(file)
  }
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='relative flex justify-center'>
        <div className='w-32 h-32 overflow-hidden bg-slate-300 rounded-full flex justify-center items-center relative border border-slate-400'>
          {image && (
            <img
              src={image}
              alt='Preview'
              className='w-full h-full object-cover'
            />
          )}
          <input
            id={name}
            name={name}
            onChange={handleFile}
            accept='image/*'
            type='file'
            className='top-0 bottom-0 left-0 right-0 opacity-0 absolute z-50'
          />
          {!image && <i className='fa-solid fa-user text-5xl'></i>}
        </div>
      </div>
      {formikD.touched[name] && formikD.errors[name] && (
        <span className='text-xs text-red-600 text-center'>
          {formikD.errors[name]}
        </span>
      )}
    </div>
  )
}
export default ImageComp
