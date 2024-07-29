import CartComp from './Cart/CartComp'
import LoaderFetching from './LoaderFetching'

const OrderList = ({ isLoading, data }) => {
  console.log('data', data)

  return (
    <>
      {isLoading && <LoaderFetching />}
      {!isLoading && (
        <section className='flex flex-col gap-y-4 pb-11'>
          {data.items.map((value) => (
            <CartComp key={value.id} value={value} type='order' />
          ))}
        </section>
      )}
    </>
  )
}

export default OrderList
