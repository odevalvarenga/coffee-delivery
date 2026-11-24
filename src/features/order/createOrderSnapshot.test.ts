import { describe, expect, it } from 'vitest'
import { createOrderSnapshot } from './createOrderSnapshot'
import type { CheckoutFormValues } from '../checkout/checkoutSchema'

const validCheckout: CheckoutFormValues = {
  postalCode: '05734-090', street: 'Rua das Flores', number: '42', complement: '',
  neighborhood: 'Jardim', city: 'São Paulo', state: 'sp', paymentMethod: 'credit-card',
}

describe('createOrderSnapshot', () => {
  it('copies products and checkout data with integer totals and an independent frozen snapshot', () => {
    const cart = [{ productId: 'latte', quantity: 2 }]
    const snapshot = createOrderSnapshot(cart, validCheckout, { id: 'order-123', createdAt: '2026-11-24T12:00:00.000Z' })
    cart[0].quantity = 9

    expect(snapshot).toMatchObject({
      id: 'order-123', paymentMethod: 'credit-card', subtotalCents: 1980,
      deliveryFeeCents: 350, totalCents: 2330,
      address: { state: 'SP', postalCode: '05734-090', number: '42' },
      lines: [{ productId: 'latte', productName: 'Latte', quantity: 2, unitPriceCents: 990, lineTotalCents: 1980 }],
    })
    expect(Object.isFrozen(snapshot)).toBe(true)
    expect(Object.isFrozen(snapshot.lines)).toBe(true)
    expect(Object.isFrozen(snapshot.lines[0])).toBe(true)
  })

  it('rejects empty carts and unknown products', () => {
    expect(() => createOrderSnapshot([], validCheckout)).toThrow(/pedido vazio/i)
    expect(() => createOrderSnapshot([{ productId: 'missing', quantity: 1 }], validCheckout)).toThrow(/produto ou quantidade inválida/i)
  })
})
