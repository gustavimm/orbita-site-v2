import { CtaLink } from '../components/CtaLink'
import { SOLUTIONS } from '../content/site'
import './Solucoes.css'

/**
 * Teaser da home: título + um resumo de uma linha por frente de trabalho.
 * O detalhamento de cada uma mora em "Como trabalhamos".
 */
export function Solucoes() {
  return (
    <section className="solucoes section" id="solucoes">
      <div className="wrap">
        <div className="solucoes__head grid">
          <h2 className="solucoes__lead" data-reveal="" style={{ transitionDelay: '0ms' }}>
            Quatro frentes de trabalho. O que entra em cada projeto vem do
            diagnóstico, não do catálogo.
          </h2>
        </div>

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
