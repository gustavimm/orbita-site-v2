import { CtaLink } from '../components/CtaLink'
import './Problema.css'

/**
 * Teaser da home: só a tese, sem o inventário de dores — que mora inteiro
 * em "O que resolvemos".
 */
export function Problema() {
  return (
    <section className="problema section" id="problema">
      <div className="wrap">
        <div className="problema__head grid">
          <h2 className="problema__statement" data-reveal="" style={{ transitionDelay: '0ms' }}>
            <span className="problema__statement-soft">
              Nenhum negócio trava por falta de esforço.
            </span>{' '}
            Trava no que ainda depende de alguém lembrar.
          </h2>
        </div>

        <div className="problema__foot grid" data-reveal="" style={{ transitionDelay: '160ms' }}>
          <CtaLink className="problema__cta" to="/o-que-resolvemos">
            Ver o que resolvemos
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
