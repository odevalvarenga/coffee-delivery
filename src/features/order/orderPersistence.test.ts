import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createOrderSnapshot } from './createOrderSnapshot'
import { createOrderId, loadOrder, ORDER_STORAGE_KEY, saveOrder } from './orderPersistence'

const checkout = {
  postalCode: '05734-090', street: 'Rua das Flores', number: '42', complement: '',
  neighborhood: 'Jardim', city: 'São Paulo', state: 'SP', paymentMethod: 'cash' as const,
}

describe('order persistence', () => {
  beforeEach(() => window.localStorage.clear())

  it('persists and restores the most recent valid order snapshot', () => {
    const order = createOrderSnapshot([{ productId: 'latte', quantity: 1 }], checkout, { id: 'order-persisted' })
    saveOrder(order)
    expect(loadOrder()).toEqual(order)
    expect(JSON.parse(window.localStorage.getItem(ORDER_STORAGE_KEY) ?? 'null')).toMatchObject({ version: 1 })
  })

  it('generates UUID identifiers for orders', () => {
    const first = createOrderId()
    const second = createOrderId()
    expect(first).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(second).not.toBe(first)
  })

  it('rejects malformed data and reports write failures to prevent cart clearing', () => {
    window.localStorage.setItem(ORDER_STORAGE_KEY, '{bad json')
    expect(loadOrder()).toBeNull()
    const order = createOrderSnapshot([{ productId: 'latte', quantity: 1 }], checkout)
    const brokenStorage = { setItem: vi.fn(() => { throw new Error('quota exceeded') }) }
    expect(() => saveOrder(order, brokenStorage)).toThrow('quota exceeded')
  })
})
