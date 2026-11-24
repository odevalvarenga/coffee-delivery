import { paymentMethods } from '../checkout/checkoutSchema'
import type { OrderSnapshot } from './types'

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isSafeNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
}

export function isOrderSnapshot(value: unknown): value is OrderSnapshot {
  if (!isRecord(value) || typeof value.id !== 'string' || !value.id || typeof value.createdAt !== 'string' || Number.isNaN(Date.parse(value.createdAt))) return false
  if (!isRecord(value.address)) return false
  const address = value.address
  const addressKeys = ['postalCode', 'street', 'number', 'complement', 'neighborhood', 'city', 'state'] as const
  if (!addressKeys.every((key) => typeof address[key] === 'string')) return false
  if (!/^\d{5}-?\d{3}$/.test(address.postalCode as string)
    || ['street', 'number', 'neighborhood', 'city'].some((key) => !(address[key] as string).trim())
    || !/^[A-Z]{2}$/.test(address.state as string)) return false
  if (!paymentMethods.some((method) => method === value.paymentMethod) || !Array.isArray(value.lines) || value.lines.length === 0) return false

  let subtotal = 0
  for (const line of value.lines) {
    if (!isRecord(line) || typeof line.productId !== 'string' || typeof line.productName !== 'string' || !line.productName) return false
    if (!Number.isSafeInteger(line.quantity) || typeof line.quantity !== 'number' || line.quantity < 1) return false
    if (!isSafeNonNegativeInteger(line.unitPriceCents) || !isSafeNonNegativeInteger(line.lineTotalCents)) return false
    if (line.quantity * line.unitPriceCents !== line.lineTotalCents || !Number.isSafeInteger(subtotal + line.lineTotalCents)) return false
    subtotal += line.lineTotalCents
  }
  return value.subtotalCents === subtotal
    && isSafeNonNegativeInteger(value.deliveryFeeCents)
    && isSafeNonNegativeInteger(value.totalCents)
    && value.totalCents === subtotal + value.deliveryFeeCents
}
