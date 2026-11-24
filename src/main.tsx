import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App'
import { GlobalStyle } from './styles/GlobalStyle'
import { ColorModeProvider } from './styles/ColorModeProvider'
import { CartProvider } from './features/cart/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorModeProvider>
      <CartProvider>
        <GlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </ColorModeProvider>
  </StrictMode>,
)
