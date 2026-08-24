import { SectionHead } from '../components/SectionHead'
import { STEPS } from '../content/site'
import './Processo.css'

type ProcessoProps = {
  index?: string
  label?: string
}

export function Processo({ index, label = 'Como trabalhamos' }: ProcessoProps) {
  return (
    <section className="processo section" id="como-trabalhamos">
      <div className="wrap">
        <div className="processo__head grid">
          {index ? (
            <div className="processo__meta">
              <SectionHead index={index} label={label} />
            </div>
          ) : null}

          <h2 className="processo__statement" data-reveal="" style={{ transitionDelay: '80ms' }}>
            Um caminho curto entre entender o problema e ter algo funcionando.
          </h2>
        </div>

        {/* A trajetória: uma linha contínua com quatro pontos.
            A órbita do hero, desenrolada. */}
        <div className="processo__track" data-reveal="">
          <span className="processo__line" aria-hidden="true" />

          <ol className="processo__steps grid">
            {STEPS.map((step, i) => (
              <li className="processo__step" key={step.title}>
                <span className="processo__node" aria-hidden="true" />
                <span className="index processo__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* A trajetória é um panorama visual: os títulos viram
                    headings só na lista detalhada abaixo. */}
                <p className="processo__title">{step.title}</p>
              </li>
            ))}
          </ol>
        </div>

        <ol className="processo__detail">
          {STEPS.map((step, i) => (
            <li className="processo__detail-item" key={step.title}>
              <div className="processo__detail-card" data-reveal="">
                <p className="eyebrow processo__detail-eyebrow">
                  <span className="index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="eyebrow__rule" aria-hidden="true" />
                  <span className="label">Etapa</span>
                </p>

                <h3 className="processo__detail-title">{step.title}</h3>
                <p className="processo__question">{step.question}</p>
                <p className="processo__detail-text">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
