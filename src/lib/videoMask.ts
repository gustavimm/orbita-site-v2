/**
 * Detecta se o motor de renderização compõe corretamente `mask-image`
 * (SVG mask ou CSS mask) sobre um `<video>`. Não dá pra resolver isso com
 * `@supports(mask-image: ...)`: o WebKit aceita a sintaxe normalmente, só
 * falha ao compor a máscara com a camada de vídeo acelerada por hardware —
 * um bug de composição, não de sintaxe (confirmado em Safari iOS e desktop
 * reais, ver commits do VideoText/OrbitSystem).
 *
 * Como todo navegador em iOS é obrigado pela Apple a rodar sobre o WebKit
 * do sistema (Chrome/Firefox/Edge inclusos), a checagem cobre "é WebKit?"
 * via User-Agent (Safari desktop) + "é iOS?" (qualquer navegador lá),
 * incluindo iPadOS 13+, que se identifica como Mac mas tem touch.
 */
export function supportsVideoMask(): boolean {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  const isDesktopSafari = /^((?!chrome|android|crios|fxios|edg).)*safari/i.test(ua)

  return !isIOS && !isDesktopSafari
}
