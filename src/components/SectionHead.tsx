type SectionHeadProps = {
  /** Índice da seção, ex.: "02". */
  index: string
  label: string
  /** Atraso da entrada em cena, em ms. */
  delay?: number
}

/**
 * Cabeçalho técnico de seção: índice · hairline · label.
 * Mesmo padrão usado no eyebrow do hero — mantém o sistema coeso.
 */
export function SectionHead({ index, label, delay }: SectionHeadProps) {
  return (
    <p
      className="eyebrow"
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <span className="index">{index}</span>
      <span className="eyebrow__rule" aria-hidden="true" />
      <span className="label">{label}</span>
    </p>
  )
}
