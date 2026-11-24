import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { Home } from './Home'
import { ColorModeProvider } from '../../styles/ColorModeProvider'
import { CartProvider } from '../cart/CartContext'

afterEach(cleanup)

function renderHome() {
  render(<ColorModeProvider><CartProvider><MemoryRouter><Home /></MemoryRouter></CartProvider></ColorModeProvider>)
}

describe('Home', () => {
  it('renders the landing content, navigation and catalog destination', () => {
    renderHome()

    expect(screen.getByRole('heading', { name: /encontre o café perfeito para qualquer hora do dia/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /conheça nossos cafés/i })).toHaveAttribute('href', '#catalogo')
    expect(screen.getByText('Entrega rápida e rastreada')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nossos cafés' })).toBeInTheDocument()
  })

  it('includes a skip link and alternative text for the hero art', () => {
    renderHome()

    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute('href', '#conteudo')
    expect(screen.getByRole('img', { name: /copo de café para viagem/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver cardápio' })).toHaveAttribute('href', '/#catalogo')
  })

  it('exposes an accessible control to toggle the color theme', () => {
    renderHome()

    fireEvent.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument()
  })

  it('adds a selected quantity and updates the cart badge', () => {
    renderHome()

    fireEvent.click(screen.getByRole('button', { name: 'Aumentar quantidade de Expresso Tradicional' }))
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar 2 Expresso Tradicional ao carrinho' }))

    expect(screen.getByRole('link', { name: 'Carrinho, 2 unidades' })).toBeInTheDocument()
  })
})
