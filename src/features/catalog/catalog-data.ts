import type { CoffeeCategory, CoffeeProduct } from './types'

const traditional: readonly CoffeeCategory[] = ['Tradicional']
const traditionalIced: readonly CoffeeCategory[] = ['Tradicional', 'Gelado']
const milkBased: readonly CoffeeCategory[] = ['Tradicional', 'Com leite']
const special: readonly CoffeeCategory[] = ['Especial']
const specialIcedAlcoholic: readonly CoffeeCategory[] = ['Especial', 'Alcoólico', 'Gelado']
const specialAlcoholic: readonly CoffeeCategory[] = ['Especial', 'Alcoólico']

export const coffeeProducts: readonly CoffeeProduct[] = [
  { id: 'espresso-tradicional', name: 'Expresso Tradicional', description: 'O tradicional café feito com água quente e grãos moídos.', categories: traditional, priceCents: 990 },
  { id: 'espresso-americano', name: 'Expresso Americano', description: 'Expresso diluído, menos intenso que o tradicional.', categories: traditional, priceCents: 990 },
  { id: 'espresso-cremoso', name: 'Expresso Cremoso', description: 'Café expresso tradicional com espuma cremosa.', categories: traditional, priceCents: 990 },
  { id: 'espresso-gelado', name: 'Expresso Gelado', description: 'Bebida preparada com café expresso e cubos de gelo.', categories: traditionalIced, priceCents: 990 },
  { id: 'cafe-com-leite', name: 'Café com Leite', description: 'Meio a meio de expresso tradicional com leite vaporizado.', categories: milkBased, priceCents: 990 },
  { id: 'latte', name: 'Latte', description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa.', categories: milkBased, priceCents: 990 },
  { id: 'capuccino', name: 'Capuccino', description: 'Bebida com canela feita de doses iguais de café, leite e espuma.', categories: milkBased, priceCents: 990 },
  { id: 'macchiato', name: 'Macchiato', description: 'Café expresso misturado com um pouco de leite quente e espuma.', categories: milkBased, priceCents: 990 },
  { id: 'mocaccino', name: 'Mocaccino', description: 'Café expresso com calda de chocolate, pouco leite e espuma.', categories: milkBased, priceCents: 990 },
  { id: 'chocolate-quente', name: 'Chocolate Quente', description: 'Bebida feita com chocolate dissolvido no leite quente e café.', categories: ['Especial', 'Com leite'], priceCents: 990 },
  { id: 'cubano', name: 'Cubano', description: 'Drink gelado de café expresso com rum, creme de leite e hortelã.', categories: specialIcedAlcoholic, priceCents: 990 },
  { id: 'havaiano', name: 'Havaiano', description: 'Bebida adocicada preparada com café e leite de coco.', categories: special, priceCents: 990 },
  { id: 'arabe', name: 'Árabe', description: 'Bebida preparada com grãos de café árabe e especiarias.', categories: special, priceCents: 990 },
  { id: 'irlandes', name: 'Irlandês', description: 'Bebida à base de café, uísque irlandês, açúcar e chantilly.', categories: specialAlcoholic, priceCents: 990 },
]
