import { Routes, Route } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import MainPage from '../pages/MainPage'
import ProductDetail from '../components/Product/ProductDetail'
import UserLayout from '../layout/UserLayout'
import WishlistPage from '../pages/WishlistPage'
import ProtectedRoute from '../components/ProtectedRoute'

const ProductProviderRoutes = () => {
  return (
    <ProductProvider>
      <Routes>
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
      </Routes>
    </ProductProvider>
  )
}

export default ProductProviderRoutes
