import { useEffect, useId, useRef, useState } from 'react'
import './VideoText.css'

type VideoTextProps = {
  children: string
  src: string
  fallbackSrc?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  fontSize?: string
  fontWeight?: string | number
  className?: string
}

type Measured = {
  width: number
  height: number
  fontSize: number
  fontFamily: string
  fontWeight: string
}

/**
 * Recorta um vídeo na forma do texto via máscara SVG. O span com o texto
 * real também serve de base visível (cor sólida --c-accent): mede fonte/
 * peso/caixa para a máscara e funciona como estado de carregamento e
 * fallback de erro, já que o vídeo só cobre por cima quando está pronto.
 */
export function VideoText({
  children,
  src,
  fallbackSrc,
  autoPlay = true,
  muted = true,
  loop = true,
  fontSize,
  fontWeight,
  className,
}: VideoTextProps) {
  const maskId = useId()
  const baseRef = useRef<HTMLSpanElement>(null)
  const [box, setBox] = useState<Measured | null>(null)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const el = baseRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const cs = getComputedStyle(el)
      setBox({
        width: rect.width,
        height: rect.height,
        fontSize: parseFloat(cs.fontSize),
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
      })
    }

    measure()
    // A métrica de <text> em SVG pode diferir um pouco da do span em HTML
    // (motor de texto separado); remedir depois que a webfont carrega evita
    // medir ainda com a fonte de fallback.
    document.fonts?.ready.then(measure)

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [children, fontSize, fontWeight])

  // Folga em cima da medida do HTML: o <text> do SVG tende a ser um pouco
  // mais largo que o span, e sem isso a última letra fica cortada na máscara.
  const padX = box ? box.fontSize * 0.08 : 0
  // Folga vertical assimétrica: pouca sobra em cima (acentos), bastante
  // embaixo (descendentes como "g"/"ó" não podem ser cortados pela caixa
  // da máscara). O texto mantém a mesma posição relativa ao topo, então
  // essa folga extra só cresce a caixa pra baixo e não afeta o line-height
  // visual do H1 (o alinhamento com o resto da linha usa a baseline do
  // span de fallback em fluxo normal, não a borda da caixa).
  const padTop = box ? box.fontSize * 0.04 : 0
  const padBottom = box ? box.fontSize * 0.28 : 0
  const maskWidth = box ? box.width + padX : 0
  const maskHeight = box ? box.height + padTop + padBottom : 0

  // Checado uma vez, no mesmo espírito do useReveal: sem listener de
  // mudança ao vivo, só a preferência já ativa quando o componente monta.
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const showVideo = box && !videoFailed

  return (
    <span
      className={`video-text${className ? ` ${className}` : ''}`}
      style={{ fontSize, fontWeight }}
      aria-label={children}
    >
      <span
        className="video-text__visual"
        aria-hidden="true"
        style={box ? { width: maskWidth, height: maskHeight } : undefined}
      >
        {/* Cor sólida --c-accent: aparece de imediato (sem flash de texto
            invisível) e volta a aparecer se o vídeo falhar. Some assim que
            o vídeo está pronto — a caixa dele é levemente maior (a folga
            anti-corte da máscara), então os dois não coincidem pixel a
            pixel e, com o fallback visível por baixo, "duplicam" a letra. */}
        <span
          ref={baseRef}
          className="video-text__fallback"
          style={showVideo ? { visibility: 'hidden' } : undefined}
        >
          {children}
        </span>

        {showVideo ? (
          <>
            <svg className="video-text__svg">
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={maskWidth} height={maskHeight}>
                  <rect width={maskWidth} height={maskHeight} fill="black" />
                  <text
                    x="0"
                    y={padTop + box.height / 2}
                    dominantBaseline="central"
                    textAnchor="start"
                    fontSize={box.fontSize}
                    fontFamily={box.fontFamily}
                    fontWeight={box.fontWeight}
                    fill="white"
                  >
                    {children}
                  </text>
                </mask>
              </defs>
            </svg>

            {/* A máscara vai no wrapper, não no <video>: no iOS Safari o
                vídeo ganha uma camada de composição própria (decodificação
                acelerada por hardware) que ignora mask-image/filter/transform
                aplicados diretamente nele — o vídeo "escapa" da máscara e
                aparece como retângulo cru. Mascarando o wrapper (um elemento
                comum, sem essa camada especial) o recorte é respeitado. */}
            <span
              className="video-text__mask"
              style={{ maskImage: `url(#${maskId})`, WebkitMaskImage: `url(#${maskId})` }}
            >
              <video
                className="video-text__media"
                autoPlay={autoPlay && !prefersReducedMotion}
                muted={muted}
                loop={loop && !prefersReducedMotion}
                playsInline
                preload="auto"
                onError={() => setVideoFailed(true)}
                {...{ 'webkit-playsinline': 'true' }}
              >
                <source src={src} type="video/webm" />
                {fallbackSrc ? <source src={fallbackSrc} type="video/mp4" /> : null}
              </video>
            </span>
          </>
        ) : null}
      </span>
    </span>
  )
}
