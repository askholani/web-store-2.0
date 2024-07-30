import { Routes, Route } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import UserLayout from '../layout/UserLayout'
import ProtectedRoute from '../components/ProtectedRoute'
import { lazy } from 'react'
import ExperimentPage2 from '../pages/ExperimentPage2'

const MainPage = lazy(() => import('../pages/MainPage'))
const WishlistPage = lazy(() => import('../pages/WishlistPage'))
const ProductDetail = lazy(() => import('../components/Product/ProductDetail'))
const CartPage = lazy(() => import('../pages/CartPage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'))
const OrderPage = lazy(() => import('../pages/OrderPage'))

const ProductProviderRoutes = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route path='/exp' element={<ExperimentPage2 />} />
        <Route
          path='/product'
          element={
            <UserLayout>
              <MainPage />
            </UserLayout>
          }
        />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route
          path='/wishlist'
          element={<ProtectedRoute element={<WishlistPage />} />}
        />
        <Route
          path='/cart'
          element={<ProtectedRoute element={<CartPage />} />}
        />
        <Route
          path='/checkout'
          element={<ProtectedRoute element={<CheckoutPage />} />}
        />
        <Route
          path='/order'
          element={<ProtectedRoute element={<OrderPage />} />}
        />
      </Routes>
    </ProductProvider>
  )
}

export default ProductProviderRoutes
