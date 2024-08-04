import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ProtectedRoute from './components/ProtectedRoute'
import LoaderPage from './pages/LoaderPage'
import { lazy, Suspense } from 'react'
import ProductProviderRoutes from './routes/ProductProviderRoutes'
import Root from './routes/root'
import {
  fetchCarts as cartLoader,
  fetchOrder,
  getOrderToken,
  combinedLoader,
} from './utils/helperProduct'
import { fetchProvincies as provLoader } from './utils/helpersThirdParties'
import { DataComponentCoba } from './components/DataComponentCoba'
import { NavigationComponentCoba } from './components/NavigationComponentCoba'

const LoginPage = lazy(() => import('./pages/Auth/LoginPage'))
const VerificationPage = lazy(() => import('./pages/Auth/VerificationPage'))
const ProfilePage = lazy(() => import('./pages/ProgilePage'))
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'))
const ProductDetail = lazy(() => import('./components/Product/ProductDetail'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const UserLayout = lazy(() => import('./layout/UserLayout'))
const MainPage = lazy(() => import('./pages/MainPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const ShippingType = lazy(() => import('./pages/ShippingType'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const OrderPage = lazy(() => import('./pages/OrderPage'))
const ShippingAddress = lazy(() => import('./pages/ShippingAddress'))

const checkoutLoader = async () => {
  const res = combinedLoader(fetchOrder, getOrderToken)
  return res
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/user',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'verification',
        element: <VerificationPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/product',
    element: <ProductProviderRoutes />,
    children: [
      {
        path: '',
        element: (
          <UserLayout>
            <MainPage />
          </UserLayout>
        ),
      },
      {
        path: ':id',
        element: <ProductDetail />,
      },
      {
        path: 'wishlist',
        element: <WishlistPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
        loader: cartLoader,
      },
      { path: 'cart/shipping-type', element: <ShippingType /> },
      {
        path: 'cart/checkout/shipping-address',
        element: <ShippingAddress />,
        loader: provLoader,
      },
      {
        path: 'cart/checkout',
        element: <CheckoutPage />,
        loader: checkoutLoader,
      },
      { path: 'cart/order', element: <OrderPage /> },
    ],
  },
  {
    path: '/coba',
    element: <NavigationComponentCoba />,
    children: [
      { path: 'data', element: <DataComponentCoba />, loader: cartLoader },
    ],
  },
])
function App() {
  return (
    <Suspense fallback={<LoaderPage />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
