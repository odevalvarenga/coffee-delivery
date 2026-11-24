import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ColorModeProvider, useColorMode } from './ColorModeProvider'

function ModeControl() {
  const { mode, toggleMode } = useColorMode()
  return <button type="button" onClick={toggleMode}>{mode}</button>
}

describe('ColorModeProvider', () => {
  beforeEach(() => window.localStorage.clear())
  afterEach(() => {
    cleanup()
    document.documentElement.removeAttribute('data-theme')
  })

  it('persists the selected theme and restores it after remount', async () => {
    const first = render(<ColorModeProvider><ModeControl /></ColorModeProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'light' }))

    expect(await screen.findByRole('button', { name: 'dark' })).toBeInTheDocument()
    await waitFor(() => expect(window.localStorage.getItem('coffee-delivery.color-mode')).toBe('dark'))
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')

    first.unmount()
    render(<ColorModeProvider><ModeControl /></ColorModeProvider>)
    expect(screen.getByRole('button', { name: 'dark' })).toBeInTheDocument()
  })
})
