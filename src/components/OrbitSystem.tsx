import { useId, useState } from 'react'
import { supportsVideoMask } from '../lib/videoMask'
import './OrbitSystem.css'

const CENTER = 240
const VIDEO_SRC = '/videos/orbita-videotext-v2-boomerang.webm'
const VIDEO_FALLBACK_SRC = '/videos/orbita-videotext-v2-boomerang.mp4'

function pointOnCircle(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  }
}

type OrbitConfig = {
  key: 'a' | 'b' | 'c'
  rx: number
  ry: number
  tilt: number
  angle: number
  period: number
  reverse: boolean
  dotRadius: number
}

const ORBITS: OrbitConfig[] = [
  { key: 'a', rx: 216, ry: 150, tilt: -18, angle: -40, period: 96, reverse: false, dotRadius: 4.6 },
  { key: 'b', rx: 180, ry: 132, tilt: 22, angle: 150, period: 64, reverse: true, dotRadius: 4 },
  { key: 'c', rx: 128, ry: 76, tilt: -11, angle: 250, period: 44, reverse: false, dotRadius: 3.4 },
]

/** Só as duas elipses maiores levam a textura de vídeo — a interna, mais
 * fina, fica só no traço sólido. Concentra o efeito onde ele se nota. */
const VIDEO_RINGS: OrbitConfig['key'][] = ['a', 'b']

const TRAILS = [
  { offset: 9, radius: 1.4, opacity: 0.16 },
  { offset: 18, radius: 2.2, opacity: 0.3 },
  { offset: 29, radius: 3.2, opacity: 0.48 },
]

/** Mesmas duas transforms (inclinação + achatamento em elipse) usadas por
 * anel, satélite e recorte da máscara — um único lugar para essa geometria. */
function ringTransforms(orbit: OrbitConfig) {
  const scaleY = (orbit.ry / orbit.rx).toFixed(4)
  return {
    tilt: `rotate(${orbit.tilt} ${CENTER} ${CENTER})`,
    ellipse: `translate(${CENTER} ${CENTER}) scale(1 ${scaleY}) translate(${-CENTER} ${-CENTER})`,
  }
}

/**
 * Sistema orbital do hero: elipses inclinadas em ângulos distintos, cada uma
 * com um satélite em velocidade própria. O negócio é o núcleo; a tecnologia
 * orbita ao redor — sem miras, sem linhas de anotação.
 *
 * As duas elipses maiores (a, b) ganham a textura do mesmo vídeo usado em
 * "negócio" (VideoText), recortada na forma exata do traço por uma máscara
 * SVG (mesma geometria, mesmo stroke-width — só com traço branco em vez da
 * cor do tema); a menor (c) fica só no sólido, pra não diluir o efeito num
 * traço fino demais pra notar. O anel sólido original continua por baixo
 * dos dois mascarados com mix-blend-mode (screen no escuro, multiply no
 * claro — ver OrbitSystem.css): garante que a linha nunca fique mais fraca
 * que o --c-text-dim de antes, e é o visual completo se o vídeo falhar ao
 * carregar, --prefers-reduced-motion pausar, ou o motor não compor
 * mask-image com <video> de forma confiável (ver src/lib/videoMask.ts —
 * mesmo caso do WebKit já resolvido no VideoText).
 */
export function OrbitSystem() {
  const maskId = useId()
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoMaskSupported] = useState(supportsVideoMask)
  const showVideoMask = videoMaskSupported && !videoFailed

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <svg
      className="orbit"
      viewBox="0 0 480 480"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {showVideoMask ? (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="480" height="480">
            <rect width="480" height="480" fill="black" />
            {ORBITS.filter((orbit) => VIDEO_RINGS.includes(orbit.key)).map((orbit) => {
              const t = ringTransforms(orbit)
              return (
                <g key={orbit.key} transform={t.tilt}>
                  <g transform={t.ellipse}>
                    <circle
                      className={`orbit__mask-ring orbit__mask-ring--${orbit.key}`}
                      cx={CENTER}
                      cy={CENTER}
                      r={orbit.rx}
                    />
                  </g>
                </g>
              )
            })}
          </mask>
        </defs>
      ) : null}

      {/* Traço-base: sempre presente — piso de contraste sob o vídeo e
          visual completo se ele falhar ou pausar. */}
      {ORBITS.map((orbit) => {
        const t = ringTransforms(orbit)
        return (
          <g key={orbit.key} transform={t.tilt}>
            <g transform={t.ellipse}>
              <circle
                className={`orbit__ring orbit__ring--${orbit.key}`}
                cx={CENTER}
                cy={CENTER}
                r={orbit.rx}
              />
            </g>
          </g>
        )
      })}

      {showVideoMask ? (
        <g className="orbit__video-layer" mask={`url(#${maskId})`}>
          <foreignObject x="0" y="0" width="480" height="480">
            <video
              className="orbit__video"
              autoPlay={!prefersReducedMotion}
              muted
              loop={!prefersReducedMotion}
              playsInline
              preload="auto"
              onError={() => setVideoFailed(true)}
            >
              <source src={VIDEO_SRC} type="video/webm" />
              <source src={VIDEO_FALLBACK_SRC} type="video/mp4" />
            </video>
          </foreignObject>
        </g>
      ) : null}

      {ORBITS.map((orbit) => {
        const sign = orbit.reverse ? 1 : -1
        const dot = pointOnCircle(orbit.rx, orbit.angle)
        const t = ringTransforms(orbit)

        return (
          <g key={orbit.key} transform={t.tilt}>
            <g transform={t.ellipse}>
              <g className={`orbit__sat orbit__sat--${orbit.key}`}>
                {TRAILS.map((trail) => {
                  const p = pointOnCircle(orbit.rx, orbit.angle + sign * trail.offset)
                  return (
                    <circle
                      key={trail.offset}
                      className="orbit__sat-trail"
                      cx={p.x}
                      cy={p.y}
                      r={trail.radius}
                      opacity={trail.opacity}
                    />
                  )
                })}
                <circle className="orbit__sat-dot" cx={dot.x} cy={dot.y} r={orbit.dotRadius} />
              </g>
            </g>
          </g>
        )
      })}

      {/* Núcleo: o negócio */}
      <circle className="orbit__core-halo" cx={CENTER} cy={CENTER} r="19" />
      <circle className="orbit__core" cx={CENTER} cy={CENTER} r="7.5" />
    </svg>
  )
}
