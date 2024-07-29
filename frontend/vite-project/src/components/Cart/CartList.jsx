import { useState } from 'react'
import AlertConfirmation from '../Alert/AlertConfirmation'
import LoaderFetching from '../LoaderFetching'
import CartComp from './CartComp'

const CartList = ({
  isLoading,
  data,
  onHandleProductCount,
  onHandleCartDelete,
}) => {
  // console.log('data', data)
  const [showAlert, setShowAlert] = useState(false)
  const [selectedCart, setSelectedCart] = useState(null)
  const handleShowAlert = ({ id = 0 }) => {
    setSelectedCart(id)
    setShowAlert(!showAlert)
  }
  // console.log('selectedCart', selectedCart)

  const handleDeleteCart = () => {
    onHandleCartDelete({ id: selectedCart })
    setShowAlert(!showAlert)
  }

  return (
    <>
      {showAlert && (
        <AlertConfirmation
          onHanldeShowAlert={handleShowAlert}
          onHandleDelete={handleDeleteCart}
        />
      )}
      {isLoading && <LoaderFetching />}
      {!isLoading && (
        <section className='flex flex-col gap-y-4'>
          {data.cart.map((value) => (
            <CartComp
              onHanldeShowAlert={handleShowAlert}
              key={value.id}
              value={value}
              onHandleProductCount={onHandleProductCount}
              onHandleCartDelete={onHandleCartDelete}
            />
          ))}
        </section>
      )}
    </>
  )
}

export default CartList
