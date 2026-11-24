import { describe, expect, it } from 'vitest'
import { calculateSubtotalCents, formatBRL } from './money'
import { calculateOrderTotalCents, DELIVERY_FEE_CENTS } from '../checkout/pricing'

describe('money calculations', () => {
  it('calculates subtotals and totals with integer cents', () => {
    const lines = [
      { productId: 'espresso-tradicional', quantity: 2 },
      { productId: 'latte', quantity: 1 },
    ]
    expect(calculateSubtotalCents(lines)).toBe(2970)
    expect(DELIVERY_FEE_CENTS).toBe(350)
    expect(calculateOrderTotalCents(lines)).toBe(3320)
    expect(formatBRL(3320)).toContain('33,20')
  })

  it('rejects values outside safe integer money calculations', () => {
    expect(() => calculateSubtotalCents([{ productId: 'latte', quantity: Number.MAX_SAFE_INTEGER }])).toThrow(RangeError)
    expect(() => formatBRL(1.5)).toThrow(RangeError)
  })
})
