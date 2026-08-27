import { useEffect, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

// Base grafite (--c-bg/--c-bg-deep de cada tema) com só 2 toques de cor —
// o shader pinta o canvas inteiro de forma opaca (sem stops transparentes
// como o radial-gradient em CSS), então a moderação de cor vem da própria
// paleta, e a sutileza final vem da opacity aplicada em Hero.css.
const DARK_COLORS = ['#0b0d11', '#050607', '#12161d', '#00e6a8', '#2f6bff']
const LIGHT_COLORS = ['#f4f5f7', '#ffffff', '#e7e9ec', '#00805a', '#2f6bff']

function readTheme(): 'dark' | 'light' {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

/**
 * Fundo animado do hero via WebGL (MeshGradient) — substitui visualmente o
 * gradiente CSS (.hero__ambient, sempre presente por baixo, ver Hero.tsx)
 * quando montado. Carregado via React.lazy() só quando Hero.tsx já
 * confirmou (canUseShader, fora deste chunk) que faz sentido tentar:
 * suporte a WebGL2, desktop, sem prefers-reduced-motion.
 *
 * Ainda assim, WebGL pode falhar depois de montado por motivos que aquela
 * checagem não cobre (ex.: shader não compila num driver específico) — a
 * lib rejeita uma Promise dentro do próprio useEffect dela nesse caso, o
 * que não é capturável por error boundary. O listener de
 * unhandledrejection abaixo é o fallback possível: recua renderizando
 * nada, e o gradiente CSS por baixo volta a ser o que aparece.
 */
export function AmbientShader() {
  const [failed, setFailed] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(readTheme)

  useEffect(() => {
    const onRejection = () => setFailed(true)
    window.addEventListener('unhandledrejection', onRejection)
    return () => window.removeEventListener('unhandledrejection', onRejection)
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()))
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  if (failed) return null

  return (
    <MeshGradient
      className="hero__ambient-shader"
      aria-hidden="true"
      colors={theme === 'light' ? LIGHT_COLORS : DARK_COLORS}
      speed={0.25}
      distortion={0.35}
      swirl={0.15}
    />
  )
}
