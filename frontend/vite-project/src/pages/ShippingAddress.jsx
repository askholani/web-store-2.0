import { useState } from 'react'
import { Link } from 'react-router-dom'
import AddressForm from '../components/Popup/AddressForm'

const ShippingAddress = () => {
  const [showForm, setShowForm] = useState(true)

  return (
    <>
      {showForm && <AddressForm />}
      <main className='px-2 pt-4 flex flex-col gap-y-8 pb-48 '>
        <section className='flex items-center justify-center relative'>
          <Link
            to={'/product/checkout'}
            className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center absolute left-0'>
            <i className='fas fa-arrow-left text-lg'></i>
          </Link>
          <span className='font-semibold text-lg'>Shipping Address</span>
        </section>
        <section className='flex flex-col gap-y-4 text-start'>
          <div className='grid grid-cols-12 items-center border-b border-slate-300 pb-4'>
            <label
              htmlFor={'ecconomy'}
              className='flex flex-col gap-y-2 col-span-11'>
              <div className='flex gap-x-2 items-start'>
                <i className='fas fa-map-marker-alt text-2xl'></i>
                <div className='flex flex-col'>
                  <span className='font-semibold text-lg'>Home</span>
                  <span className='line-clamp-2 opacity-90 text-sm'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
              </div>
            </label>
            <div className='col-span-1 flex justify-end'>
              <input
                id='ecconomy'
                onChange={() => setShipping('economoy')}
                type='radio'
                name='radio-1'
                className='radio'
                defaultChecked
              />
            </div>
          </div>
          <div className='grid grid-cols-12 items-center border-b border-slate-300 pb-4'>
            <label
              htmlFor={'ecconomy'}
              className='flex flex-col gap-y-2 col-span-11'>
              <div className='flex gap-x-2 items-start'>
                <i className='fas fa-map-marker-alt text-2xl'></i>
                <div className='flex flex-col'>
                  <span className='font-semibold text-lg'>Home</span>
                  <span className='line-clamp-2 opacity-90 text-sm'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
              </div>
            </label>
            <div className='col-span-1 flex justify-end'>
              <input
                id='ecconomy'
                onChange={() => setShipping('economoy')}
                type='radio'
                name='radio-1'
                className='radio'
                defaultChecked
              />
            </div>
          </div>
          <div className='flex justify-center items-center  bg-slate-200 rounded-md h-20 border-dashed border-4 border-slate-400 w-full'>
            <div className='flex gap-x-2 items-center'>
              <i className='fas fa-plus'></i>
              <span className='text-sm font-semibold'>
                Add New Shipping Address
              </span>
            </div>
          </div>
        </section>
        <section className='fixed bottom-0 left-0 right-0 flex justify-center items-center px-4 bg-white border-t border-slate-300 py-4 z-10'>
          <Link className='btn btn-sm h-[3rem] rounded-3xl py-2 font-semibold bg-slate-700 hover:bg-slate-800 text-slate-50 w-full text-lg'>
            Apply
          </Link>
        </section>
      </main>
    </>
  )
}

export default ShippingAddress
