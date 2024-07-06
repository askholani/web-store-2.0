import PropTypes from 'prop-types'

const InputComp = ({ formikD, name, type }) => {
  return (
    <div className='flex flex-col gap-y-1'>
      <label
        htmlFor={name}
        className='text-start font-semibold opacity-70 capitalize'>
        {name}
      </label>
      <input
        id={name}
        name={name}
        required
        type={type}
        className='rounded-full w-full border py-3 px-4'
        value={formikD.values[name]} // Bind input value to Formik's values
        onChange={formikD.handleChange} // Handle input change using Formik
        onBlur={formikD.handleBlur} // Handle input blur using Formik
      />
      {/* Display error message if there's an error for this field */}
      {formikD.touched[name] && formikD.errors[name] && (
        <span className='text-xs text-red-600 text-start'>
          {formikD.errors[name]}
        </span>
      )}
    </div>
  )
}

// PropTypes for type checking
InputComp.propTypes = {
  formikD: PropTypes.object.isRequired, // Formik form instance
  name: PropTypes.string.isRequired, // Input field name
  type: PropTypes.string.isRequired, // Input field type
}

export default InputComp
