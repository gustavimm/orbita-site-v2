import { CircleCheck, Scale, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { CTA_LABEL, CTA_TO, PROBLEMS } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './OQueResolvemos.css'

/* Ícones da trilha de decisão via lucide-react — depois de duas tentativas
   de desenhar à mão (a da balança em particular saía torta), trocamos por
   uma lib testada em vez de arriscar geometria mal fechada de novo.
   strokeWidth 1.4 pra bater com o peso de traço do resto do vocabulário
   visual do site (Hero, Processo.tsx); size/cor controlados via CSS
   (.resolve-cta__step-icon svg e a troca de color por posição), igual já
   funcionava com os ícones desenhados à mão. */
const DECISION_STEPS = [
  { label: 'Entender', Icon: Target },
  { label: 'Avaliar', Icon: Scale },
  { label: 'Decidir', Icon: CircleCheck },
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
            <span className="resolve-cta__steps-beam" aria-hidden="true" />
            <ol className="resolve-cta__steps-list">
              {DECISION_STEPS.map(({ label, Icon }) => (
                <li className="resolve-cta__step" key={label}>
                  <span className="resolve-cta__step-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.4} />
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
