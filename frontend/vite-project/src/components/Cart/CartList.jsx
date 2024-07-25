import LoaderFetching from '../LoaderFetching'
import CartComp from './CartComp'

const CartList = ({ isLoading, data }) => {
  console.log('data', data)
  console.log('isLoading', isLoading)
  return (
    <>
      {isLoading && <LoaderFetching />}
      {!isLoading && (
        <section className='flex flex-col gap-y-4'>
          {data.cart.data.map((value) => (
            <CartComp key={value.id} value={value} />
          ))}
        </section>
      )}
    </>
  )
}

export default CartList
