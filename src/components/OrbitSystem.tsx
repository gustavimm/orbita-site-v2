import './OrbitSystem.css'

const CENTER = 240

// Geometria da elipse — era a menor/mais interna das três originais (a que
// ficava junto do núcleo, com o satélite bem próximo); as outras duas,
// maiores e mais externas, foram removidas por completo. Escala aumentada
// ~1.5x (mantendo a proporção original) pra ganhar presença agora sozinha,
// sem chegar a preencher o hero.
const RX = 192
const RY = 114
const TILT = -11
const ANGLE = 250
const DOT_RADIUS = 3.4

// Satélite roda no sentido "normal" (ver orbit-spin em OrbitSystem.css, sem
// reverse) — o rastro precisa ficar atrás da direção de giro, daí o sinal
// negativo no deslocamento angular de cada ponto do rastro.
const TRAIL_SIGN = -1

const TRAILS = [
  { offset: 9, radius: 1.4, opacity: 0.16 },
  { offset: 18, radius: 2.2, opacity: 0.3 },
  { offset: 29, radius: 3.2, opacity: 0.48 },
]

function pointOnCircle(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  }
}

const scaleY = (RY / RX).toFixed(4)
const tiltTransform = `rotate(${TILT} ${CENTER} ${CENTER})`
const ellipseTransform = `translate(${CENTER} ${CENTER}) scale(1 ${scaleY}) translate(${-CENTER} ${-CENTER})`

/**
 * Sistema orbital: uma elipse inclinada com um satélite em órbita. O
 * negócio é o núcleo; a tecnologia orbita ao redor — sem miras, sem linhas
 * de anotação. Já teve três elipses sobrepostas em ângulos distintos;
 * simplificado pra uma só — mais legível como presença lateral do hero,
 * sem competir com o texto. Traço sólido, sem vídeo nem máscara (removidos
 * — instável demais no WebKit, ver histórico).
 */
export function OrbitSystem() {
  const dot = pointOnCircle(RX, ANGLE)

  return (
    <svg
      className="orbit"
      viewBox="0 0 480 480"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={tiltTransform}>
        <g transform={ellipseTransform}>
          <circle className="orbit__ring" cx={CENTER} cy={CENTER} r={RX} />
        </g>
      </g>

      <g transform={tiltTransform}>
        <g transform={ellipseTransform}>
          <g className="orbit__sat">
            {TRAILS.map((trail) => {
              const p = pointOnCircle(RX, ANGLE + TRAIL_SIGN * trail.offset)
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
            <circle className="orbit__sat-dot" cx={dot.x} cy={dot.y} r={DOT_RADIUS} />
          </g>
        </g>
      </g>

      {/* Núcleo: o negócio */}
      <circle className="orbit__core-halo" cx={CENTER} cy={CENTER} r="19" />
      <circle className="orbit__core" cx={CENTER} cy={CENTER} r="7.5" />
    </svg>
  )
}
