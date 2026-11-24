import type { CartAction, CartLine, CartState } from './types'
import { coffeeProducts } from '../catalog/catalog-data'

export const emptyCart: CartState = { lines: [] }
const productPrices = new Map(coffeeProducts.map((product) => [product.id, product.priceCents]))

function isPositiveSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value) && value > 0
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const unitPrice = productPrices.get(action.productId)
      if (unitPrice === undefined || !isPositiveSafeInteger(action.quantity)) return state
      if (!Number.isSafeInteger(unitPrice * action.quantity) || !Number.isSafeInteger(sumCartUnits(state.lines) + action.quantity)) return state
      const existing = state.lines.find((line) => line.productId === action.productId)
      if (!existing) return { lines: [...state.lines, { productId: action.productId, quantity: action.quantity }] }
      const quantity = existing.quantity + action.quantity
      if (!isPositiveSafeInteger(quantity)) return state
      return {
        lines: state.lines.map((line) => line.productId === action.productId ? { ...line, quantity } : line),
      }
    }
    case 'increment': {
      const line = state.lines.find((item) => item.productId === action.productId)
      const unitPrice = productPrices.get(action.productId)
      if (!line || unitPrice === undefined || !isPositiveSafeInteger(line.quantity + 1)) return state
      if (!Number.isSafeInteger(unitPrice * (line.quantity + 1)) || !Number.isSafeInteger(sumCartUnits(state.lines) + 1)) return state
      return { lines: state.lines.map((item) => item.productId === action.productId ? { ...item, quantity: item.quantity + 1 } : item) }
    }
    case 'decrement': {
      const line = state.lines.find((item) => item.productId === action.productId)
      if (!line) return state
      if (line.quantity <= 1) return { lines: state.lines.filter((item) => item.productId !== action.productId) }
      return { lines: state.lines.map((item) => item.productId === action.productId ? { ...item, quantity: item.quantity - 1 } : item) }
    }
    case 'remove':
      return { lines: state.lines.filter((line) => line.productId !== action.productId) }
    case 'clear':
      return emptyCart
    default: {
      const exhaustive: never = action
      return exhaustive
    }
  }
}

export function sumCartUnits(lines: readonly CartLine[]): number {
  return lines.reduce((sum, line) => {
    const total = sum + line.quantity
    if (!Number.isSafeInteger(total)) throw new RangeError('A quantidade total excede o limite numérico seguro.')
    return total
  }, 0)
}
