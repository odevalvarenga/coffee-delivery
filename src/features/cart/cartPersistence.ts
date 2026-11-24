import { coffeeProducts } from '../catalog/catalog-data'
import { emptyCart } from './cartReducer'
import type { CartLine, CartState } from './types'

export const CART_STORAGE_KEY = 'coffee-delivery.cart.v1'
const supportedProducts = new Set(coffeeProducts.map((product) => product.id))
const pricesByProduct = new Map(coffeeProducts.map((product) => [product.id, product.priceCents]))

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isCartLine(value: unknown): value is CartLine {
  const productId = isRecord(value) && typeof value.productId === 'string' ? value.productId : ''
  const unitPrice = pricesByProduct.get(productId)
  return isRecord(value)
    && typeof value.productId === 'string'
    && supportedProducts.has(value.productId)
    && unitPrice !== undefined
    && typeof value.quantity === 'number'
    && Number.isSafeInteger(value.quantity)
    && value.quantity > 0
    && Number.isSafeInteger(unitPrice * value.quantity)
}

export function parseCart(value: unknown): CartState {
  if (!isRecord(value) || value.version !== 1 || !Array.isArray(value.lines)) return emptyCart
  const validRows = value.lines.filter(isCartLine)
  const unique = new Map<string, CartLine>()
  for (const line of validRows) {
    const current = unique.get(line.productId)
    if (!current) unique.set(line.productId, line)
    else {
      const quantity = current.quantity + line.quantity
      const unitPrice = pricesByProduct.get(line.productId)
      if (unitPrice !== undefined && Number.isSafeInteger(quantity) && Number.isSafeInteger(unitPrice * quantity)) {
        unique.set(line.productId, { productId: line.productId, quantity })
      }
    }
  }
  const lines: CartLine[] = []
  let unitCount = 0
  for (const line of unique.values()) {
    if (Number.isSafeInteger(unitCount + line.quantity)) {
      lines.push(line)
      unitCount += line.quantity
    }
  }
  return { lines }
}

export function loadCart(storage: Pick<Storage, 'getItem'> | undefined = getBrowserStorage()): CartState {
  if (!storage) return emptyCart
  try {
    const stored = storage.getItem(CART_STORAGE_KEY)
    if (!stored) return emptyCart
    const parsed: unknown = JSON.parse(stored)
    return parseCart(parsed)
  } catch {
    return emptyCart
  }
}

export function saveCart(state: CartState, storage: Pick<Storage, 'setItem'> | undefined = getBrowserStorage()): void {
  if (!storage) return
  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, lines: state.lines }))
  } catch {
    // In-memory cart operations remain available when browser storage is blocked.
  }
}

function getBrowserStorage(): Storage | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}
