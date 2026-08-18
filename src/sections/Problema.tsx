import { SectionHead } from '../components/SectionHead'
import { PAINS } from '../content/site'
import './Problema.css'

type ProblemaProps = {
  /** Índice da seção. Sem ele, o cabeçalho não é renderizado. */
  index?: string
  label?: string
}

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

        <ol className="problema__list">
          {PAINS.map((pain, i) => (
            <li className="problema__item" key={pain.title}>
              <div className="problema__row grid" data-reveal="">
                <span className="index problema__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="problema__title">{pain.title}</h3>
                <p className="problema__text">{pain.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="problema__close grid">
          <p className="problema__close-text" data-reveal="">
            Nada disso é desorganização. É uma operação funcionando sem sistema.
          </p>
        </div>
      </div>
    </section>
  )
}
