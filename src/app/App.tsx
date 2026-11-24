import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../features/home/Home'
import { CheckoutPage } from '../features/checkout/CheckoutPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
