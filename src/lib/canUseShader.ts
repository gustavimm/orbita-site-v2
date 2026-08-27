/**
 * Decide, de forma síncrona e sem custo, se vale a pena sequer baixar o
 * chunk do AmbientShader (WebGL, ~25kb gzip via @paper-design/shaders-react)
 * — mora fora desse chunk de propósito, pra quem cai fora (mobile, reduced-
 * motion, sem WebGL2) nunca pagar o download, não só o custo de execução.
 * Mesmo teste de WebGL2 que a lib faz internamente ao criar o contexto: se
 * falhar aqui, evita o throw síncrono dela (que dispara dentro de uma
 * Promise não tratada dentro de um useEffect da lib e não seria pego por
 * error boundary nenhum).
 */
export function canUseShader(): boolean {
  if (typeof window === 'undefined') return false

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isDesktop = window.matchMedia('(min-width: 901px)').matches
  if (prefersReducedMotion || !isDesktop) return false

  try {
    const canvas = document.createElement('canvas')
    return !!canvas.getContext('webgl2')
  } catch {
    return false
  }
}
