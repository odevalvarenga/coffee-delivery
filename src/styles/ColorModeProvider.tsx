import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './tokens'

type ColorMode = 'light' | 'dark'

type ColorModeContextValue = {
  mode: ColorMode
  toggleMode: () => void
}

const STORAGE_KEY = 'coffee-delivery.color-mode'
const ColorModeContext = createContext<ColorModeContextValue | null>(null)

function readStoredMode(): ColorMode {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function ColorModeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ColorMode>(readStoredMode)
  const theme = mode === 'dark' ? darkTheme : lightTheme
  const contextValue = useMemo(
    () => ({ mode, toggleMode: () => setMode((current) => current === 'light' ? 'dark' : 'light') }),
    [mode],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // The active session remains usable when browser storage is unavailable.
    }
  }, [mode])

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (!context) throw new Error('useColorMode precisa estar dentro de ColorModeProvider')
  return context
}
