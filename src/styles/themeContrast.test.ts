import { describe, expect, it } from 'vitest'
import { darkTheme, lightTheme } from './tokens'

function luminance(color: string): number {
  const channels = color.slice(1).match(/.{2}/g)?.map((part) => Number.parseInt(part, 16) / 255) ?? []
  const [red, green, blue] = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrastRatio(first: string, second: string): number {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

describe('theme contrast tokens', () => {
  it('keeps checkout button text at WCAG AA contrast on the yellow accent in both themes', () => {
    expect(contrastRatio(lightTheme.colors.onYellow, lightTheme.colors.yellow)).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(darkTheme.colors.onYellow, darkTheme.colors.yellow)).toBeGreaterThanOrEqual(4.5)
  })
})
