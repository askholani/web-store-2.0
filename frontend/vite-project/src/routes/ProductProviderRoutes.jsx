import { Routes, Route } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import MainPage from '../pages/MainPage'
import ProductDetail from '../components/Product/ProductDetail'
import UserLayout from '../layout/UserLayout'

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
      </Routes>
    </ProductProvider>
  )
}

export default ProductProviderRoutes
