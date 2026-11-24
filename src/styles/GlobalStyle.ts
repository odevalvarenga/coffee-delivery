import { createGlobalStyle } from 'styled-components'
import { tokens } from './tokens'

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
    font-family: ${tokens.typography.body};
    color: ${tokens.colors.ink};
    background: ${tokens.colors.canvas};
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-optical-sizing: auto;
  }

  *, *::before, *::after { box-sizing: border-box; }
  html { min-width: 320px; scroll-behavior: smooth; }
  body { min-width: 320px; margin: 0; }
  button, a { font: inherit; }
  button { color: inherit; }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
  ::selection { color: ${tokens.colors.white}; background: ${tokens.colors.purple}; }
  :focus-visible { outline: 3px solid ${tokens.colors.purpleDark}; outline-offset: 4px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`
