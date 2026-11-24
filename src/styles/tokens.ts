export const tokens = {
  colors: {
    canvas: '#fafafa',
    surface: '#ffffff',
    surfaceWarm: '#f3f2f2',
    ink: '#403937',
    muted: '#574f4d',
    line: '#e6e5e5',
    coffee: '#403937',
    coffeeDark: '#272221',
    purple: '#8047f8',
    purpleDark: '#633bbc',
    purpleSoft: '#ebe5f9',
    yellow: '#dbac2c',
    yellowDark: '#805500',
    yellowSoft: '#f1e9c9',
    white: '#ffffff',
  },
  typography: {
    body: "'Roboto', sans-serif",
    display: "'Baloo 2', 'Roboto', sans-serif",
  },
  radius: { pill: '999px' },
  layout: { content: '1200px', gutter: 'clamp(1.25rem, 5vw, 5rem)' },
} as const

export type DesignTokens = typeof tokens
