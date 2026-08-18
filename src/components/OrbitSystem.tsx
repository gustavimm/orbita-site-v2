import './OrbitSystem.css'

/**
 * Sistema orbital do hero.
 * Anéis finos, marcas técnicas e um ponto central verde: o negócio no centro,
 * a tecnologia operando ao redor. Decorativo — a mensagem está no título.
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
      {/* Anéis */}
      <circle className="orbit__ring" cx="240" cy="240" r="196" />
      <circle className="orbit__ring orbit__ring--mid" cx="240" cy="240" r="134" />
      <circle className="orbit__ring orbit__ring--inner" cx="240" cy="240" r="72" />

      {/* Marcas técnicas nos pontos cardeais do anel externo */}
      <g className="orbit__ticks">
        <path d="M240 30v16" />
        <path d="M240 434v16" />
        <path d="M30 240h16" />
        <path d="M434 240h16" />
      </g>

      {/* Arco de destaque percorrendo a trajetória intermediária */}
      <circle
        className="orbit__arc"
        cx="240"
        cy="240"
        r="134"
        strokeDasharray="132 710"
        strokeLinecap="round"
      />

      {/* Corpos em órbita */}
      <g className="orbit__sat orbit__sat--outer">
        <circle cx="240" cy="44" r="3" />
      </g>
      <g className="orbit__sat orbit__sat--mid">
        <circle className="orbit__sat-dot" cx="374" cy="240" r="4" />
      </g>
      <g className="orbit__sat orbit__sat--inner">
        <circle cx="168" cy="240" r="2.5" />
      </g>

      {/* Centro: o negócio */}
      <circle className="orbit__core-halo" cx="240" cy="240" r="14" />
      <circle className="orbit__core" cx="240" cy="240" r="5" />

      {/* Anotação técnica — ocultada no mobile */}
      <g className="orbit__annotation">
        <path d="M249 231l84-84h58" />
        <circle cx="391" cy="147" r="1.6" />
        <text x="333" y="138">SEU NEGÓCIO</text>
      </g>
    </svg>
  )
}
