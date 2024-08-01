import { useState } from 'react'
import { Link } from 'react-router-dom'

const ShippingType = () => {
  const [shipping, setShipping] = useState('economoy')

  return (
    <main className='px-2 pt-4 flex flex-col gap-y-8 pb-48'>
      <section className='flex items-center justify-center relative'>
        <Link
          to={'/product/cart'}
          className='w-12 h-12 border border-slate-400 rounded-full flex justify-center items-center absolute left-0'>
          <i className='fas fa-arrow-left text-lg'></i>
        </Link>
        <span className='font-semibold text-lg'>Choose Shipping</span>
      </section>
      <section className='flex flex-col gap-y-4 text-start'>
        <div className='grid grid-cols-12 items-center border-b border-slate-300 pb-4'>
          <label
            htmlFor={'ecconomy'}
            className='flex flex-col gap-y-2 col-span-11'>
            <div className='flex gap-x-2 items-start'>
              <i className='fas fa-cube text-2xl'></i>
              <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Economy</span>
                <span className='line-clamp-2 opacity-90'>
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
            htmlFor='regular'
            className='flex flex-col gap-y-2 col-span-11'>
            <div className='flex gap-x-2 items-start'>
              <i className='fas fa-cube text-2xl'></i>
              <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Regular</span>
                <span className='line-clamp-2 opacity-90'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </div>
            </div>
          </label>
          <div className='col-span-1 flex justify-end'>
            <input
              id='regular'
              onChange={() => setShipping('regular')}
              type='radio'
              name='radio-1'
              className='radio'
            />
          </div>
        </div>
        <div className='grid grid-cols-12 items-center border-b border-slate-300 pb-4'>
          <label htmlFor='cargo' className='flex flex-col gap-y-2 col-span-11'>
            <div className='flex gap-x-2 items-start'>
              <i className='fas fa-truck text-2xl'></i>
              <div className='flex flex-col'>
                <span className='font-semibold text-lg'>Cargo</span>
                <span className='line-clamp-2 opacity-90'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </div>
            </div>
          </label>
          <div className='col-span-1 flex justify-end'>
            <input
              id='cargo'
              onChange={() => setShipping('cargo')}
              type='radio'
              name='radio-1'
              className='radio'
            />
          </div>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 right-0 flex justify-center items-center px-4 bg-white border-t border-slate-300 py-4'>
        <Link
          to={`/product/cart?shipping=${shipping}`}
          className='btn btn-sm h-[3rem] rounded-3xl py-2 font-semibold bg-slate-700 hover:bg-slate-800 text-slate-50 w-full text-lg'>
          Apply
        </Link>
      </section>
    </main>
  )
}

export default ShippingType
