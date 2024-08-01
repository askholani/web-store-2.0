import { Outlet, useNavigation } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import ProtectedRoute from '../components/ProtectedRoute'
import LoaderPage from '../pages/LoaderPage'

const ProductProviderRoutes = () => {
  const navigation = useNavigation()
  console.log('navigation', navigation)

  if (navigation.state === 'loading') {
    return <LoaderPage />
  }
  return (
    <ProductProvider>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </ProductProvider>
  )
}

export default ProductProviderRoutes
