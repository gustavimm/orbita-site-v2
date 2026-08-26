import { STEPS } from '../content/site'
import './Processo.css'

/* Ícones de linha fina — mesmo vocabulário do Hero e de "O que resolvemos". */

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.6-4.6" />
    </svg>
  )
}

function IconWrench() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2.5-2.5Z" />
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

/* "Implementação": prefiro entrega verificada (caixa + check) a um foguete —
   o tom da marca evita imagética de startup/lançamento. */
function IconShipped() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="7" width="16" height="13" rx="1.6" />
      <path d="M4 7l8-4 8 4" />
      <path d="m9 13 2.3 2.3L16 10.8" />
    </svg>
  )
}

const STEP_ICONS = [IconSearch, IconWrench, IconCheckRing, IconShipped]

export function Processo() {
  return (
    <section className="processo section" id="como-trabalhamos">
      <div className="wrap">
        <div className="processo__head grid">
          <h2 className="processo__statement" data-reveal="" style={{ transitionDelay: '0ms' }}>
            Um caminho curto entre entender o problema e ter algo funcionando.
          </h2>
        </div>

        <ol className="processo__detail">
          {STEPS.map((step, i) => {
            const StepIcon = STEP_ICONS[i]
            return (
              <li className="processo__detail-item" key={step.title}>
                <div className="card processo__detail-card" data-reveal="">
                  <div className="processo__detail-head">
                    <span className="processo__detail-icon" aria-hidden="true">
                      <StepIcon />
                    </span>
                    <h3 className="card__title processo__detail-title">{step.title}</h3>
                    <span className="index processo__detail-index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="processo__question">{step.question}</p>
                  <p className="card__body processo__detail-text">{step.detail}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
