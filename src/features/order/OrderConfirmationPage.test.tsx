import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { App } from '../../app/App'
import { CartProvider } from '../cart/CartContext'
import { ColorModeProvider } from '../../styles/ColorModeProvider'
import { createOrderSnapshot } from './createOrderSnapshot'
import { ORDER_STORAGE_KEY } from './orderPersistence'

function renderRoute(path: string) {
  render(
    <ColorModeProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[path]}><App /></MemoryRouter>
      </CartProvider>
    </ColorModeProvider>,
  )
}

describe('OrderConfirmationPage', () => {
  beforeEach(() => window.localStorage.clear())
  afterEach(cleanup)

  it('restores a persisted confirmation by URL after a reload and rejects invalid IDs', () => {
    const order = createOrderSnapshot([{ productId: 'latte', quantity: 2 }], {
      postalCode: '05734-090', street: 'Rua das Flores', number: '42', complement: '',
      neighborhood: 'Jardim', city: 'São Paulo', state: 'SP', paymentMethod: 'cash',
    }, { id: 'order-known', createdAt: '2026-11-24T12:00:00.000Z' })
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify({ version: 1, order }))

    renderRoute('/order/order-known')
    expect(screen.getByRole('heading', { name: 'Uhu! Seu café está a caminho' })).toBeInTheDocument()
    expect(screen.getByText('Latte')).toBeInTheDocument()
    expect(screen.getByText('Rua das Flores, 42')).toBeInTheDocument()
    expect(screen.getByText('Dinheiro — pagamento realizado na entrega.')).toBeInTheDocument()
  })

  it('shows a safe invalid-access state if the order ID is not the stored snapshot', () => {
    renderRoute('/order/not-stored')
    expect(screen.getByRole('heading', { name: 'Não encontramos essa confirmação' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar ao catálogo' })).toHaveAttribute('href', '/')
  })
})
