import { describe, expect, it } from 'vitest'
import { checkoutSchema } from './checkoutSchema'

const validCheckout = {
  postalCode: '01001-000', street: 'Praça da Sé', number: '100', complement: '',
  neighborhood: 'Sé', city: 'São Paulo', state: 'SP', paymentMethod: 'credit-card',
}

describe('checkoutSchema', () => {
  it('accepts a valid delivery address and explicit payment method', () => {
    expect(checkoutSchema.safeParse(validCheckout).success).toBe(true)
  })

  it('requires payment and rejects malformed CEP, address and UF', () => {
    const result = checkoutSchema.safeParse({ ...validCheckout, postalCode: '123', number: '', state: 'São Paulo', paymentMethod: '' })
    expect(result.success).toBe(false)
    if (result.success) return
    const paths = result.error.issues.map((issue) => issue.path[0])
    expect(paths).toContain('postalCode')
    expect(paths).toContain('number')
    expect(paths).toContain('state')
    expect(paths).toContain('paymentMethod')
  })
})
