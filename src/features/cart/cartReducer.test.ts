import { describe, expect, it } from 'vitest'
import { cartReducer, emptyCart, sumCartUnits } from './cartReducer'

describe('cartReducer', () => {
  it('adds a product and merges subsequent additions immutably', () => {
    const first = cartReducer(emptyCart, { type: 'add', productId: 'espresso-tradicional', quantity: 2 })
    const second = cartReducer(first, { type: 'add', productId: 'espresso-tradicional', quantity: 1 })

    expect(first.lines).toEqual([{ productId: 'espresso-tradicional', quantity: 2 }])
    expect(second.lines).toEqual([{ productId: 'espresso-tradicional', quantity: 3 }])
    expect(second).not.toBe(first)
  })

  it('increments, decrements, removes at one and clears the cart', () => {
    const added = cartReducer(emptyCart, { type: 'add', productId: 'latte', quantity: 1 })
    const incremented = cartReducer(added, { type: 'increment', productId: 'latte' })
    const decremented = cartReducer(incremented, { type: 'decrement', productId: 'latte' })
    const removed = cartReducer(decremented, { type: 'decrement', productId: 'latte' })

    expect(incremented.lines[0]?.quantity).toBe(2)
    expect(decremented.lines[0]?.quantity).toBe(1)
    expect(removed.lines).toEqual([])
    expect(cartReducer(added, { type: 'remove', productId: 'latte' }).lines).toEqual([])
    expect(cartReducer(incremented, { type: 'clear' })).toEqual(emptyCart)
  })

  it('sums units rather than distinct products', () => {
    expect(sumCartUnits([
      { productId: 'latte', quantity: 2 },
      { productId: 'espresso-tradicional', quantity: 3 },
    ])).toBe(5)
  })

  it('rejects unsupported products and quantities that would overflow safe cents', () => {
    expect(cartReducer(emptyCart, { type: 'add', productId: 'unknown', quantity: 1 })).toBe(emptyCart)
    const safeQuantity = Math.floor(Number.MAX_SAFE_INTEGER / 990)
    const nearLimit = cartReducer(emptyCart, { type: 'add', productId: 'latte', quantity: safeQuantity })
    expect(cartReducer(nearLimit, { type: 'increment', productId: 'latte' })).toBe(nearLimit)
  })
})
