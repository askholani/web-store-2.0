import { useState } from 'react'
import AlertConfirmation from '../Alert/AlertConfirmation'
import CartComp from './CartComp'

const CartList = ({ data, onHandleProductCount, onHandleCartDelete }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [selectedCart, setSelectedCart] = useState(null)
  const handleShowAlert = ({ id = 0 }) => {
    setSelectedCart(id)
    setShowAlert(!showAlert)
  }

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
    </>
  )
}

export default CartList
