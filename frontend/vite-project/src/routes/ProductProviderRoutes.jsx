import { Routes, Route } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import MainPage from '../pages/MainPage'
import ProductDetail from '../components/Product/ProductDetail'

const ProductProviderRoutes = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route path='/product' element={<MainPage />} />
        <Route path='/product/:id-name' element={<ProductDetail />} />
      </Routes>
    </ProductProvider>
  )
}

export default ProductProviderRoutes
