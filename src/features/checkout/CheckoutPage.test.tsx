import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../cart/CartContext'
import { CART_STORAGE_KEY } from '../cart/cartPersistence'
import { ColorModeProvider } from '../../styles/ColorModeProvider'
import { CheckoutPage } from './CheckoutPage'

function renderCheckout() {
  render(
    <ColorModeProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/checkout']}>
          <CheckoutPage />
        </MemoryRouter>
      </CartProvider>
    </ColorModeProvider>,
  )
}

describe('CheckoutPage', () => {
  beforeEach(() => window.localStorage.clear())
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('shows an empty-cart state and a route back to the catalog', () => {
    renderCheckout()
    expect(screen.getByRole('heading', { name: 'Seu carrinho está vazio' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar ao catálogo/i })).toHaveAttribute('href', '/#catalogo')
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('validates the checkout, queries ViaCEP, fills address and calculates the summary', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: [{ productId: 'latte', quantity: 2 }] }))
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({
      cep: '01001-000', logradouro: 'Praça da Sé', complemento: '', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP',
    }), { status: 200 }))
    vi.stubGlobal('fetch', fetcher)
    renderCheckout()

    expect(screen.getAllByText(/19,80/)).toHaveLength(2)
    expect(screen.getByText(/3,50/)).toBeInTheDocument()
    expect(screen.getByText(/23,30/)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('CEP'), { target: { value: '01001000' } })
    fireEvent.change(screen.getByLabelText('Rua'), { target: { value: 'Rua provisória' } })
    fireEvent.change(screen.getByLabelText('Número'), { target: { value: '100' } })
    fireEvent.change(screen.getByLabelText('Bairro'), { target: { value: 'Sé' } })
    fireEvent.change(screen.getByLabelText('Cidade'), { target: { value: 'São Paulo' } })
    fireEvent.change(screen.getByLabelText('UF'), { target: { value: 'SP' } })
    fireEvent.click(screen.getByRole('radio', { name: 'Cartão de crédito' }))
    fireEvent.click(screen.getByRole('button', { name: 'Validar endereço e pagamento' }))
    expect(await screen.findByText('Consulte este CEP no ViaCEP antes de continuar.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Buscar CEP' }))
    expect(screen.getByRole('button', { name: 'Consultando…' })).toBeDisabled()
    expect(await screen.findByText(/endereço encontrado pelo viacep/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Rua')).toHaveValue('Praça da Sé')
    expect(screen.getByLabelText('Bairro')).toHaveValue('Sé')
    expect(screen.getByLabelText('Cidade')).toHaveValue('São Paulo')
    expect(screen.getByLabelText('UF')).toHaveValue('SP')
    expect(fetcher).toHaveBeenCalledOnce()

    fireEvent.click(screen.getByRole('button', { name: 'Validar endereço e pagamento' }))
    expect(await screen.findByText(/dados válidos para são paulo/i)).toBeInTheDocument()
    expect(screen.queryByText(/pedido confirmado/i)).not.toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('CEP'), { target: { value: '01002000' } })
    expect(screen.getByLabelText('Rua')).toHaveValue('')
    expect(screen.getByLabelText('Número')).toHaveValue('')
  })

  it('removes the last coffee, clears persisted items and returns to the empty-cart state', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: [{ productId: 'latte', quantity: 1 }] }))
    renderCheckout()
    fireEvent.click(screen.getByRole('button', { name: 'Remover Latte' }))

    expect(await screen.findByRole('heading', { name: 'Seu carrinho está vazio' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Carrinho vazio' })).toBeInTheDocument()
    await waitFor(() => {
      const stored: unknown = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? 'null')
      expect(stored).toEqual({ version: 1, lines: [] })
    })
  })

  it('shows invalid and not-found CEP feedback and permits a new query', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: [{ productId: 'latte', quantity: 1 }] }))
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ erro: true }), { status: 200 }))
    vi.stubGlobal('fetch', fetcher)
    renderCheckout()

    fireEvent.change(screen.getByLabelText('CEP'), { target: { value: '123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar CEP' }))
    expect(await screen.findByText(/cep válido com 8 dígitos antes da consulta/i)).toBeInTheDocument()
    expect(fetcher).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText('CEP'), { target: { value: '99999999' } })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar CEP' }))
    expect(await screen.findByText(/cep não encontrado/i)).toBeInTheDocument()
    expect(fetcher).toHaveBeenCalledOnce()
  })

  it('shows a connection failure and allows retrying ViaCEP', async () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: [{ productId: 'latte', quantity: 1 }] }))
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('network unavailable'))
    vi.stubGlobal('fetch', fetcher)
    renderCheckout()
    fireEvent.change(screen.getByLabelText('CEP'), { target: { value: '01001000' } })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar CEP' }))
    expect(await screen.findByText(/não foi possível conectar ao viacep/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar CEP' })).toBeEnabled()
  })
})
