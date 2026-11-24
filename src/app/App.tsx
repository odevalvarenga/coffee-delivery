import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../features/home/Home'
import { CheckoutPage } from '../features/checkout/CheckoutPage'
import { OrderConfirmationPage } from '../features/order/OrderConfirmationPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order/:orderId" element={<OrderConfirmationPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
