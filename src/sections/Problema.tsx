import { SectionHead } from '../components/SectionHead'
import { CtaLink } from '../components/CtaLink'
import './Problema.css'

type ProblemaProps = {
  /** Índice da seção. Sem ele, o cabeçalho não é renderizado. */
  index?: string
  label?: string
}

/**
 * Teaser da home: só a tese, sem o inventário de dores — que mora inteiro
 * em "O que resolvemos".
 */
export function Problema({ index, label = 'Problema' }: ProblemaProps) {
  return (
    <section className="problema section" id="problema">
      <div className="wrap">
        <div className="problema__head grid">
          {index ? (
            <div className="problema__meta">
              <SectionHead index={index} label={label} />
            </div>
          ) : null}

          <h2 className="problema__statement" data-reveal="" style={{ transitionDelay: '80ms' }}>
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
