import { coffeeProducts } from '../catalog/catalog-data'
import { calculateOrderTotalCents, DELIVERY_FEE_CENTS } from '../checkout/pricing'
import type { CheckoutFormValues } from '../checkout/checkoutSchema'
import type { CartLine } from '../cart/types'
import type { OrderSnapshot } from './types'
import { createOrderId } from './orderPersistence'

export function createOrderSnapshot(
  lines: readonly CartLine[],
  checkout: CheckoutFormValues,
  options: { id?: string; createdAt?: string } = {},
): OrderSnapshot {
  if (lines.length === 0) throw new RangeError('Não é possível confirmar um pedido vazio.')
  const snapshotLines = lines.map((line) => {
    const product = coffeeProducts.find((item) => item.id === line.productId)
    if (!product || !Number.isSafeInteger(line.quantity) || line.quantity < 1) throw new TypeError('O carrinho contém um produto ou quantidade inválida.')
    const lineTotalCents = product.priceCents * line.quantity
    if (!Number.isSafeInteger(lineTotalCents)) throw new RangeError('O total do item excede o limite seguro de cálculo.')
    return Object.freeze({ productId: product.id, productName: product.name, quantity: line.quantity, unitPriceCents: product.priceCents, lineTotalCents })
  })
  const subtotalCents = snapshotLines.reduce((total, line) => total + line.lineTotalCents, 0)
  const totalCents = calculateOrderTotalCents(lines)
  const address = Object.freeze({
    postalCode: checkout.postalCode,
    street: checkout.street,
    number: checkout.number,
    complement: checkout.complement,
    neighborhood: checkout.neighborhood,
    city: checkout.city,
    state: checkout.state.toUpperCase(),
  })
  return Object.freeze({
    id: options.id ?? createOrderId(),
    createdAt: options.createdAt ?? new Date().toISOString(),
    lines: Object.freeze(snapshotLines),
    address,
    paymentMethod: checkout.paymentMethod,
    subtotalCents,
    deliveryFeeCents: DELIVERY_FEE_CENTS,
    totalCents,
  })
}
