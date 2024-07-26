import { currencyFormat } from '../../utils/helpers'

const CartPrice = ({ cost }) => {
  console.log('cost', cost)

  const costSub = cost.total.reduce(
    (acc, curr) => acc + parseInt(curr.price) * curr.count,
    0,
  )

  const subFormat = currencyFormat({
    number: costSub,
    curr: 'IDR',
  }).split(',')[0]

  const total = costSub - 500 + 100
  const totalFormat = currencyFormat({
    number: total,
    curr: 'IDR',
  }).split(',')[0]

  return (
    <div className='fixed bottom-0 left-0 right-0 px-2 py-4 flex flex-col gap-y-4 rounded-t-md shadow-lg border-t border-t-slate-400 z-10'>
      <div className='flex flex-col gap-y-1 text-sm'>
        <div className='flex justify-between'>
          <span>Sub-Total</span>
          <span>{subFormat}.000</span>
        </div>
        <div className='flex justify-between'>
          <span>Delivery Free</span>
          <span>Rp 100.000</span>
        </div>
        <div className='flex justify-between'>
          <span>Discount</span>
          <span>Rp 500.000</span>
        </div>
      </div>
      <div className='flex justify-between text-sm'>
        <span>Total Cost</span>
        <span>{totalFormat}.000</span>
      </div>
      <button className='btn btn-sm h-[2.5rem] rounded-2xl py-2 font-semibold bg-slate-500 hover:bg-slate-600 text-slate-50'>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartPrice
