import { SectionHead } from '../components/SectionHead'
import { SOLUTIONS } from '../content/site'
import './Solucoes.css'

type SolucoesProps = {
  index?: string
  label?: string
}

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

        <ul className="solucoes__list">
          {SOLUTIONS.map((item) => (
            <li className="solucoes__item" key={item.title}>
              <div className="solucoes__row grid" data-reveal="">
                <h3 className="solucoes__title">{item.title}</h3>

                <div className="solucoes__body">
                  <p className="solucoes__text">{item.detail}</p>

                  <ul className="solucoes__notes">
                    {item.notes.map((note) => (
                      <li className="solucoes__note" key={note}>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
