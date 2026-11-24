export type CartLine = Readonly<{
  productId: string
  quantity: number
}>

export type CartState = Readonly<{
  lines: readonly CartLine[]
}>

export type CartAction =
  | { type: 'add'; productId: string; quantity: number }
  | { type: 'increment'; productId: string }
  | { type: 'decrement'; productId: string }
  | { type: 'remove'; productId: string }
  | { type: 'clear' }
