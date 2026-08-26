import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { CTA_LABEL, CTA_TO, PROBLEMS } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './OQueResolvemos.css'

/* Ícones de linha fina — mesmo vocabulário do Hero e de "Como trabalhamos". */

function IconFocus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
    </svg>
  )
}

function IconScale() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v15" />
      <path d="M6 8h12" />
      <path d="M9.5 21h5" />
      <path d="m6 8-2.6 5.4a2.4 2.4 0 0 0 4.6 0Z" />
      <path d="m18 8 2.6 5.4a2.4 2.4 0 0 1-4.6 0Z" />
    </svg>
  )
}

function IconCheckRing() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7.5" />
      <path d="m8.5 12.5 2.4 2.4L15.8 9.6" />
    </svg>
  )
}

const DECISION_STEPS = [
  { label: 'Entender', Icon: IconFocus },
  { label: 'Avaliar', Icon: IconScale },
  { label: 'Decidir', Icon: IconCheckRing },
]

export default function OQueResolvemos() {
  usePageMeta(
    'O que resolvemos',
    'Situações que travam a operação de micro e pequenas empresas. Nem todo problema pede um sistema novo — o primeiro passo é entender qual é o problema.',
  )

  return (
    <>
      <PageHeader
        className="pagehead--resolve"
        title={
          <>
            O problema quase nunca
            <br />é a ferramenta<span className="pagehead__accent">.</span>
          </>
        }
        lead={
          <>
            Quando um processo trava, a solução nem sempre é desenvolver um
            sistema novo.
            <br />
            Às vezes basta integrar ferramentas.
            <br />
            Às vezes automatizar uma etapa.
            <br />E, em alguns casos, construir uma solução sob medida.
            <span className="resolve__lead-close">
              O primeiro passo é entender o problema.
            </span>
          </>
        }
      />

      <section className="resolve section">
        <div className="wrap">
          <ol className="resolve__list">
            {PROBLEMS.map((problem) => (
              <li className="resolve__item" key={problem.title}>
                <div className="card resolve__card" data-reveal="">
                  <h2 className="card__title resolve__title">{problem.title}</h2>

                  <div className="card__body resolve__content">
                    <ul className="resolve__signs">
                      {problem.when.map((sign) => (
                        <li className="resolve__sign" key={sign}>
                          {sign}
                        </li>
                      ))}
                    </ul>

                    <p className="resolve__answer">
                      <span className="resolve__answer-arrow" aria-hidden="true">
                        →
                      </span>
                      {problem.build}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="resolve-cta section">
        <div className="wrap grid">
          <h2 className="resolve-cta__title" data-reveal="">
            Talvez você não precise
            <br />
            de um sistema novo<span className="resolve-cta__mark">.</span>
          </h2>

          <div
            className="resolve-cta__body"
            data-reveal=""
            style={{ transitionDelay: '80ms' }}
          >
            <p>Nosso trabalho não começa escrevendo código.</p>
            <p>
              Começa entendendo como sua operação funciona e onde ela realmente
              trava.
            </p>
            <p>Só depois disso definimos qual caminho faz sentido.</p>
          </div>

          <div
            className="resolve-cta__action"
            data-reveal=""
            style={{ transitionDelay: '160ms' }}
          >
            <Link className="cta-solid" to={CTA_TO}>
              {CTA_LABEL}
              <span className="cta-solid__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div
            className="resolve-cta__steps"
            data-reveal=""
            style={{ transitionDelay: '240ms' }}
          >
            <span className="resolve-cta__steps-line" aria-hidden="true" />
            <ol className="resolve-cta__steps-list">
              {DECISION_STEPS.map(({ label, Icon }) => (
                <li className="resolve-cta__step" key={label}>
                  <span className="resolve-cta__step-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="resolve-cta__step-label">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
