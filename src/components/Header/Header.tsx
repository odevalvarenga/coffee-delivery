import { ArrowUpRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Brand, HeaderBar, HeaderInner, HeaderNav, HeaderAction } from './styles'

export function Header() {
  return (
    <HeaderBar>
      <HeaderInner>
        <Brand as={NavLink} to="/" aria-label="Coffee Delivery — início">
          <img src="/coffee-delivery-emblem.png" alt="" />
          <span>Coffee <strong>Delivery</strong></span>
        </Brand>
        <HeaderNav aria-label="Navegação principal">
          <a href="#inicio">Início</a>
          <a href="#catalogo">Nossos cafés</a>
        </HeaderNav>
        <HeaderAction href="#catalogo" aria-label="Ver cardápio">
          Ver cardápio <ArrowUpRight size={16} aria-hidden="true" />
        </HeaderAction>
      </HeaderInner>
    </HeaderBar>
  )
}
