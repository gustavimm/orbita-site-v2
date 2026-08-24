import { SectionHead } from '../components/SectionHead'
import { CtaLink } from '../components/CtaLink'
import { SOLUTIONS } from '../content/site'
import './Solucoes.css'

type SolucoesProps = {
  index?: string
  label?: string
}

/**
 * Teaser da home: título + um resumo de uma linha por frente de trabalho.
 * O detalhamento de cada uma mora em "Como trabalhamos".
 */
export function Solucoes({ index, label = 'Soluções' }: SolucoesProps) {
  return (
    <section className="solucoes section" id="solucoes">
      <div className="wrap">
        {index ? (
          <div className="solucoes__head grid">
            <div className="solucoes__meta">
              <SectionHead index={index} label={label} />
            </div>

            <h2 className="solucoes__lead" data-reveal="" style={{ transitionDelay: '80ms' }}>
              Quatro frentes de trabalho. O que entra em cada projeto vem do
              diagnóstico, não do catálogo.
            </h2>
          </div>
        ) : null}

        <ul className="solucoes__teaser" data-reveal="" style={{ transitionDelay: '160ms' }}>
          {SOLUTIONS.map((item) => (
            <li className="solucoes__teaser-item" key={item.title}>
              <span className="solucoes__teaser-title">{item.title}</span>
              <span className="solucoes__teaser-text">{item.text}</span>
            </li>
          ))}
        </ul>

        <div className="solucoes__foot grid" data-reveal="" style={{ transitionDelay: '220ms' }}>
          <CtaLink className="solucoes__cta" to="/como-trabalhamos">
            Ver como trabalhamos
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
