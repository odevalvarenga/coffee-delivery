export type CoffeeCategory = 'Tradicional' | 'Gelado' | 'Com leite' | 'Especial' | 'Alcoólico'

export type CoffeeProduct = {
  id: string
  name: string
  description: string
  categories: readonly CoffeeCategory[]
  priceCents: number
}
