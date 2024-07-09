// import { useState } from 'react'

const SelectComp = ({ formikD, name, options }) => {
  const handleChangeGender = (event) => {
    formikD.setFieldValue(name, event.target.value) // Update formik value
  }

  return (
    <div className='flex flex-col gap-y-1'>
      <label
        htmlFor={name}
        className='text-start font-semibold opacity-70 capitalize'>
        {name}
      </label>
      <select
        value={formikD.values[name]} // Use formikD.values[name] for selected value
        onChange={handleChangeGender}
        name={name}
        id={name}
        className='select w-full select-bordered rounded-full overflow-hidden'>
        {options.map((value, index) => (
          <option key={`${value}-${index}`} value={value}>
            {value}
          </option>
        ))}
      </select>
      {/* Display error message if there's an error for this field */}
      {formikD.touched[name] && formikD.errors[name] && (
        <span className='text-xs text-red-600 text-start'>
          {formikD.errors[name]}
        </span>
      )}
    </div>
  )
}
export default SelectComp
