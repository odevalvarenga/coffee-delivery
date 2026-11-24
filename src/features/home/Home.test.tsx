import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { Home } from './Home'

afterEach(cleanup)

describe('Home', () => {
  it('renders the landing content, navigation and catalog destination', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: /encontre o café perfeito para qualquer hora do dia/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /conheça nossos cafés/i })).toHaveAttribute('href', '#catalogo')
    expect(screen.getByText('Entrega rápida e rastreada')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nossos cafés' })).toBeInTheDocument()
  })

  it('includes a skip link and alternative text for the hero art', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)

    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute('href', '#conteudo')
    expect(screen.getByRole('img', { name: /copo de café para viagem/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver cardápio' })).toHaveAttribute('href', '#catalogo')
  })
})
