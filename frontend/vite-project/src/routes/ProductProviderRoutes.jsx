import { Routes, Route } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import MainPage from '../pages/MainPage'

const ProductProviderRoutes = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route path='/product' element={<MainPage />} />
      </Routes>
    </ProductProvider>
  )
}

export default ProductProviderRoutes
