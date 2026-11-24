import { describe, expect, it } from 'vitest'
import { CART_STORAGE_KEY, loadCart, parseCart, saveCart } from './cartPersistence'

describe('cart persistence', () => {
  it('loads only supported versioned product data and ignores invalid rows', () => {
    expect(parseCart({ version: 1, lines: [
      { productId: 'latte', quantity: 2 },
      { productId: 'missing-product', quantity: 1 },
      { productId: 'espresso-tradicional', quantity: 0 },
    ] })).toEqual({ lines: [{ productId: 'latte', quantity: 2 }] })
    expect(parseCart({ version: 2, lines: [{ productId: 'latte', quantity: 2 }] })).toEqual({ lines: [] })
    expect(parseCart(null)).toEqual({ lines: [] })
  })

  it('round trips the cart in a versioned envelope', () => {
    let storedValue: string | null = null
    const storage = {
      getItem: (key: string) => key === CART_STORAGE_KEY ? storedValue : null,
      setItem: (key: string, value: string) => { if (key === CART_STORAGE_KEY) storedValue = value },
    }
    const cart = { lines: [{ productId: 'latte', quantity: 2 }] }

    saveCart(cart, storage)
    expect(loadCart(storage)).toEqual(cart)
    expect(() => { storedValue = '{broken json'; loadCart(storage) }).not.toThrow()
    expect(loadCart(storage)).toEqual({ lines: [] })
  })
})
