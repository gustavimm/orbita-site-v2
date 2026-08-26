import './OrbitSystem.css'

const CENTER = 240

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

const TRAILS = [
  { offset: 9, radius: 1.4, opacity: 0.16 },
  { offset: 18, radius: 2.2, opacity: 0.3 },
  { offset: 29, radius: 3.2, opacity: 0.48 },
]

/**
 * Sistema orbital do hero: elipses inclinadas em ângulos distintos, cada uma
 * com um satélite em velocidade própria. O negócio é o núcleo; a tecnologia
 * orbita ao redor — sem miras, sem linhas de anotação.
 */
export function OrbitSystem() {
  return (
    <svg
      className="orbit"
      viewBox="0 0 480 480"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {ORBITS.map((orbit) => {
        const sign = orbit.reverse ? 1 : -1
        const dot = pointOnCircle(orbit.rx, orbit.angle)

        return (
          <g key={orbit.key} transform={`rotate(${orbit.tilt} ${CENTER} ${CENTER})`}>
            <g
              transform={`translate(${CENTER} ${CENTER}) scale(1 ${(orbit.ry / orbit.rx).toFixed(4)}) translate(${-CENTER} ${-CENTER})`}
            >
              <circle
                className={`orbit__ring orbit__ring--${orbit.key}`}
                cx={CENTER}
                cy={CENTER}
                r={orbit.rx}
              />

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
