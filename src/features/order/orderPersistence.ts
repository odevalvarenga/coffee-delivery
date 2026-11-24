import type { OrderSnapshot } from './types'
import { isOrderSnapshot } from './validation'

export const ORDER_STORAGE_KEY = 'coffee-delivery.latest-order.v1'
const ORDER_STORAGE_VERSION = 1

export function createOrderId(cryptoApi: Crypto = globalThis.crypto): string {
  if (typeof cryptoApi.randomUUID === 'function') return cryptoApi.randomUUID()
  const bytes = new Uint8Array(16)
  cryptoApi.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export function saveOrder(order: OrderSnapshot, storage: Pick<Storage, 'setItem'> | undefined = getBrowserStorage()): void {
  if (!isOrderSnapshot(order)) throw new TypeError('Os dados do pedido não são válidos.')
  if (!storage) throw new Error('O armazenamento local não está disponível.')
  storage.setItem(ORDER_STORAGE_KEY, JSON.stringify({ version: ORDER_STORAGE_VERSION, order }))
}

export function loadOrder(storage: Pick<Storage, 'getItem'> | undefined = getBrowserStorage()): OrderSnapshot | null {
  if (!storage) return null
  try {
    const stored = storage.getItem(ORDER_STORAGE_KEY)
    if (!stored) return null
    const parsed: unknown = JSON.parse(stored)
    if (typeof parsed !== 'object' || parsed === null || !('version' in parsed) || parsed.version !== ORDER_STORAGE_VERSION || !('order' in parsed)) return null
    return isOrderSnapshot(parsed.order) ? parsed.order : null
  } catch {
    return null
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
