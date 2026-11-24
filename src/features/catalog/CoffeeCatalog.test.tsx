import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { coffeeProducts } from './catalog-data'
import { CoffeeCatalog } from './CoffeeCatalog'

afterEach(cleanup)

describe('CoffeeCatalog', () => {
  it('renders all 14 coffees from the supplied reference with their price', () => {
    render(<CoffeeCatalog products={coffeeProducts} />)

    expect(screen.getAllByRole('article')).toHaveLength(14)
    expect(screen.getByRole('heading', { name: 'Nossos cafés' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Expresso Tradicional' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Irlandês' })).toBeInTheDocument()
    for (const card of screen.getAllByRole('article')) {
      expect(within(card).getByText('9,90')).toBeInTheDocument()
    }
  })

  it('shows category tags without adding cart controls in TASK-1', () => {
    render(<CoffeeCatalog products={coffeeProducts} />)

    const icedHeading = screen.getByRole('heading', { name: /expresso gelado/i })
    const icedCoffee = icedHeading.closest('article')
    expect(icedCoffee).not.toBeNull()
    if (!icedCoffee) return
    expect(within(icedCoffee).getByText('Gelado')).toBeInTheDocument()
    expect(within(icedCoffee).getByText('Tradicional')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
