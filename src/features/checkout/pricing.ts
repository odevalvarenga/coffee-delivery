import { calculateSubtotalCents } from '../cart/money'
import type { CartLine } from '../cart/types'

// Valor exibido na captura gráfica enviada; regra fixa provisória confirmada pelo estudante.
export const DELIVERY_FEE_CENTS = 350

export function calculateOrderTotalCents(lines: readonly CartLine[], deliveryFeeCents = DELIVERY_FEE_CENTS): number {
  if (!Number.isSafeInteger(deliveryFeeCents) || deliveryFeeCents < 0) {
    throw new RangeError('A taxa de entrega precisa ser um valor não negativo em centavos inteiros.')
  }
  const subtotal = calculateSubtotalCents(lines)
  const total = subtotal + deliveryFeeCents
  if (!Number.isSafeInteger(total)) throw new RangeError('O total do pedido excede o limite seguro de cálculo.')
  return total
}
