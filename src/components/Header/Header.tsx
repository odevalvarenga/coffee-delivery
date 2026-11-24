import { ArrowUpRight, Moon, ShoppingCart, Sun } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useColorMode } from '../../styles/ColorModeProvider'
import { useCart } from '../../features/cart/CartContext'
import { Brand, HeaderBar, HeaderInner, HeaderNav, HeaderAction, HeaderActions, ThemeButton, CartLink } from './styles'

export function Header() {
  const { mode, toggleMode } = useColorMode()
  const { itemCount } = useCart()

  return (
    <HeaderBar>
      <HeaderInner>
        <Brand as={NavLink} to="/" aria-label="Coffee Delivery — início">
          <img src="/coffee-delivery-emblem.png" alt="" />
          <span>Coffee <strong>Delivery</strong></span>
        </Brand>
        <HeaderNav aria-label="Navegação principal">
          <a href="/#inicio">Início</a>
          <a href="/#catalogo">Nossos cafés</a>
        </HeaderNav>
        <HeaderActions>
          <CartLink to="/checkout" aria-label={itemCount === 0 ? 'Carrinho vazio' : `Carrinho, ${itemCount} ${itemCount === 1 ? 'unidade' : 'unidades'}`} title="Abrir carrinho">
            <ShoppingCart size={18} aria-hidden="true" />
            {itemCount > 0 && <span aria-hidden="true">{itemCount}</span>}
          </CartLink>
          <ThemeButton type="button" onClick={toggleMode} aria-label={mode === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'} title={mode === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}>
            {mode === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
          </ThemeButton>
          <HeaderAction href="/#catalogo" aria-label="Ver cardápio">
            Ver cardápio <ArrowUpRight size={16} aria-hidden="true" />
          </HeaderAction>
        </HeaderActions>
      </HeaderInner>
    </HeaderBar>
  )
}
