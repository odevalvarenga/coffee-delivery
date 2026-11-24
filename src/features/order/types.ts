import type { PaymentMethod } from '../checkout/checkoutSchema'

export type Address = Readonly<{
  postalCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}>

export type OrderLineSnapshot = Readonly<{
  productId: string
  productName: string
  quantity: number
  unitPriceCents: number
  lineTotalCents: number
}>

export type OrderSnapshot = Readonly<{
  id: string
  createdAt: string
  lines: readonly OrderLineSnapshot[]
  address: Readonly<Address>
  paymentMethod: PaymentMethod
  subtotalCents: number
  deliveryFeeCents: number
  totalCents: number
}>
