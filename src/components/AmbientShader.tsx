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

// Cap de resolução: a lib usa max(dpr, minPixelRatio) como escala de render,
// então o próprio default dela (minPixelRatio: 2) já força 2x mesmo numa
// tela comum de 1x — puro desperdício de GPU ali. 1 aqui deixa a escala
// seguir o dpr real da tela sem esse piso artificial. maxPixelCount trava
// o outro lado (retina/4K: dpr real 3 ou mais) num teto de pixels equivalente
// a ~2x DPR pro tamanho de viewport atual — acima disso o ganho visual num
// gradiente de fundo desfocado é imperceptível pro custo de GPU que cobra.
const DPR_CAP = 2
function maxPixelCount(): number {
  if (typeof window === 'undefined') return 1920 * 1080 * DPR_CAP * DPR_CAP
  return Math.round(window.innerWidth * window.innerHeight * DPR_CAP * DPR_CAP)
}

/**
 * Fundo animado do hero via WebGL (MeshGradient) — substitui visualmente o
 * gradiente CSS (.hero__ambient, sempre presente por baixo, ver Hero.tsx)
 * quando montado. Carregado via React.lazy() só quando Hero.tsx já
 * confirmou (canUseShader, fora deste chunk) que faz sentido tentar:
 * suporte a WebGL2, desktop (≥901px — a checagem de "hardware fraco" desta
 * lib é essa: evita telas pequenas, que também são majoritariamente onde
 * está o hardware mais fraco, em vez de um sinal ruidoso feito
 * navigator.hardwareConcurrency), sem prefers-reduced-motion.
 *
 * Pausa automática (sem código nenhum aqui — lido direto no fonte da lib,
 * node_modules/@paper-design/shaders/dist/shader-mount.js): o loop de
 * requestAnimationFrame já para de vez (currentSpeed=0 → cancelAnimationFrame,
 * não só congela o uniform de tempo) quando a aba perde foco
 * (document.visibilitychange) ou o elemento sai da viewport
 * (IntersectionObserver interno, this.setupIntersectionObserver() no
 * construtor) — os itens 1 e 2 de qualquer pedido de otimização de scroll/
 * aba já vêm cobertos pela própria lib, não precisam de código aqui.
 *
 * Sem re-render do React por frame: a animação roda inteira dentro do loop
 * próprio da classe (chamadas diretas de WebGL), nunca toca setState — só
 * as duas mudanças de estado deste componente (tema, falha) disparam
 * re-render do React, nada relacionado ao tempo do shader em si.
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
      minPixelRatio={1}
      maxPixelCount={maxPixelCount()}
    />
  )
}
