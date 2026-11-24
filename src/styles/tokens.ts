import type { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    canvas: '#fafafa', surface: '#ffffff', surfaceWarm: '#f3f2f2',
    ink: '#403937', muted: '#574f4d', line: '#e6e5e5',
    coffee: '#403937', coffeeDark: '#272221', purple: '#8047f8',
    purpleDark: '#633bbc', purpleSoft: '#ebe5f9', yellow: '#dbac2c',
    yellowDark: '#805500', yellowSoft: '#f1e9c9', white: '#ffffff', onAccent: '#ffffff', onYellow: '#272221', danger: '#a61b1b',
  },
}

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    canvas: '#171513', surface: '#211e1c', surfaceWarm: '#292522',
    ink: '#f5f1ee', muted: '#c8bfba', line: '#403a36',
    coffee: '#e5d8d0', coffeeDark: '#f5f1ee', purple: '#c5a7ff',
    purpleDark: '#d4bdff', purpleSoft: '#382b4c', yellow: '#e8be55',
    yellowDark: '#f3d47e', yellowSoft: '#40371f', white: '#ffffff', onAccent: '#171513', onYellow: '#171513', danger: '#ff9898',
  },
}

export const tokens = {
  typography: {
    body: "'Roboto', sans-serif",
    display: "'Baloo 2', 'Roboto', sans-serif",
  },
  radius: { pill: '999px' },
  layout: { content: '1200px', gutter: 'clamp(1.25rem, 5vw, 5rem)' },
} as const

export type DesignTokens = typeof tokens

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark'
    colors: {
      canvas: string
      surface: string
      surfaceWarm: string
      ink: string
      muted: string
      line: string
      coffee: string
      coffeeDark: string
      purple: string
      purpleDark: string
      purpleSoft: string
      yellow: string
      yellowDark: string
      yellowSoft: string
      white: string
      onAccent: string
      onYellow: string
      danger: string
    }
  }
}
