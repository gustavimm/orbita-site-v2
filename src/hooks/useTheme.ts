import { useCallback, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'orbita-theme'

/** Tema já aplicado no <html> pelo script inline de index.html, antes do React montar. */
function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement

  if (theme === 'light') {
    root.setAttribute('data-theme', 'light')
  } else {
    root.removeAttribute('data-theme')
  }

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#F4F5F7' : '#0B0D11')

  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Modo privado ou storage bloqueado: o toggle ainda funciona na sessão atual.
  }
}

/**
 * Alternância clara/escura. O padrão (sem escolha salva) é o Sistema
 * Noturno; a preferência do sistema só decide na primeira visita, via
 * script inline em index.html — este hook só lê o que já foi aplicado.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next)
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  return { theme, toggleTheme }
}
