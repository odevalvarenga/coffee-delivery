import { coffeeProducts } from '../catalog/catalog-data'
import type { CartLine } from './types'

const prices = new Map(coffeeProducts.map((product) => [product.id, product.priceCents]))

export function calculateSubtotalCents(lines: readonly CartLine[]): number {
  return lines.reduce((total, line) => {
    const unitPrice = prices.get(line.productId)
    if (unitPrice === undefined || !Number.isSafeInteger(line.quantity) || line.quantity < 1) return total
    const lineTotal = unitPrice * line.quantity
    if (!Number.isSafeInteger(lineTotal) || !Number.isSafeInteger(total + lineTotal)) {
      throw new RangeError('O total do carrinho excede o limite seguro de cálculo.')
    }
    return total + lineTotal
  }, 0)
}

export function formatBRL(cents: number): string {
  if (!Number.isSafeInteger(cents)) throw new RangeError('O valor monetário precisa estar em centavos inteiros seguros.')
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}
