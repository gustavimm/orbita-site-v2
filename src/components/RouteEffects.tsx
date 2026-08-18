import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

/**
 * Efeitos que precisam rodar a cada troca de rota:
 * voltar ao topo e reobservar os elementos com `data-reveal` da nova página.
 */
export function RouteEffects() {
  const { pathname, key } = useLocation()

  // Numa SPA o navegador não reinicia a rolagem. Depende de `key`, e não só
  // de `pathname`, para que clicar no link da página atual também volte ao topo.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [key, pathname])

  useReveal(key)

  return null
}
