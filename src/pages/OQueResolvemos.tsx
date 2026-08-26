import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { CTA_LABEL, CTA_TO, PROBLEMS } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './OQueResolvemos.css'

/* Ícones de linha fina — mesmo vocabulário do Hero (arcos, pontos, nós),
   escopados a esta página. Usados só no caso "Sistemas que não conversam",
   que ganha apoio visual extra por ser o mais literal sobre integração. */

function IconDuplicate() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="12" height="12" rx="1.4" />
      <path d="M8 8V6a1.4 1.4 0 0 1 1.4-1.4H19a1.4 1.4 0 0 1 1.4 1.4v9.6A1.4 1.4 0 0 1 19 17h-2" />
    </svg>
  )
}

function IconDiverge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v6" />
      <path d="M12 10 6 19" />
      <path d="M12 10 18 19" />
      <circle cx="12" cy="4" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="6" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconManualEntry() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="1.6" />
      <path d="M7 11h.01M11 11h.01M15 11h.01M17 11h.01M7 14.5h6" />
    </svg>
  )
}

function IconLinkNodes() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="7" r="2.2" />
      <circle cx="18" cy="17" r="2.2" />
      <path d="M7.8 8.6 16.2 15.4" />
    </svg>
  )
}

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

/* Índices por posição: os três sinais de "Sistemas que não conversam", em ordem. */
const CONVERSATION_SIGN_ICONS = [IconDuplicate, IconDiverge, IconManualEntry]

/* Antes: dois sistemas ligados por digitação manual. Depois: mesma dupla,
   integrada — a mesma transformação que o parágrafo ao lado descreve em texto. */
function IntegrationDiagram() {
  return (
    <div className="resolve__diagram" aria-hidden="true">
      <div className="resolve__diagram-state">
        <p className="label resolve__diagram-caption">Hoje</p>
        <div className="resolve__diagram-row">
          <span className="resolve__diagram-box">Sistema A</span>
          <span className="resolve__diagram-link resolve__diagram-link--broken">
            <span className="resolve__diagram-line" />
            <span className="resolve__diagram-icon">
              <IconManualEntry />
            </span>
            <span className="resolve__diagram-line" />
          </span>
          <span className="resolve__diagram-box">Sistema B</span>
        </div>
      </div>

      <div className="resolve__diagram-state">
        <p className="label resolve__diagram-caption">Com integração</p>
        <div className="resolve__diagram-row">
          <span className="resolve__diagram-box resolve__diagram-box--accent">Sistema A</span>
          <span className="resolve__diagram-link resolve__diagram-link--solid" />
          <span className="resolve__diagram-box resolve__diagram-box--accent">Sistema B</span>
        </div>
      </div>
    </div>
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
            {PROBLEMS.map((problem) => {
              const isIntegrationCase = problem.title === 'Sistemas que não conversam'

              return (
                <li className="resolve__item" key={problem.title}>
                  <div className="card resolve__card" data-reveal="">
                    <h2 className="card__title resolve__title">{problem.title}</h2>

                    <div className="card__body resolve__body grid">
                      <div className="resolve__when">
                        <p className="label resolve__label">
                          Quando isso costuma acontecer
                        </p>
                        <ul className="resolve__signs">
                          {problem.when.map((sign, i) => {
                            const SignIcon = CONVERSATION_SIGN_ICONS[i]
                            return (
                              <li className="resolve__sign" key={sign}>
                                {isIntegrationCase && (
                                  <span className="resolve__sign-icon" aria-hidden="true">
                                    <SignIcon />
                                  </span>
                                )}
                                {sign}
                              </li>
                            )
                          })}
                        </ul>
                      </div>

                      <div className="resolve__build">
                        <p className="label resolve__label">
                          O que normalmente construímos
                        </p>
                        {isIntegrationCase ? (
                          <div className="resolve__build-lead">
                            <span className="resolve__build-icon" aria-hidden="true">
                              <IconLinkNodes />
                            </span>
                            <p className="resolve__text">{problem.build}</p>
                          </div>
                        ) : (
                          <p className="resolve__text">{problem.build}</p>
                        )}
                        <p className="resolve__note">{problem.note}</p>
                        {isIntegrationCase && <IntegrationDiagram />}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
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
