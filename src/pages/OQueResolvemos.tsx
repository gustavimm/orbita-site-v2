import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { SectionHead } from '../components/SectionHead'
import { CTA_LABEL, CTA_TO, PROBLEMS } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './OQueResolvemos.css'

export default function OQueResolvemos() {
  usePageMeta(
    'O que resolvemos',
    'Situações que travam a operação de micro e pequenas empresas. Nem todo problema pede um sistema novo — o primeiro passo é entender qual é o problema.',
  )

  return (
    <>
      <PageHeader
        className="pagehead--resolve"
        index="01"
        label="O que resolvemos"
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
          <div className="resolve__head">
            <SectionHead index="02" label="Situações comuns" />
          </div>

          <ol className="resolve__list">
            {PROBLEMS.map((problem, i) => (
              <li className="resolve__item" key={problem.title}>
                <div className="resolve__row grid" data-reveal="">
                  <p className="index resolve__index">
                    {String(i + 1).padStart(2, '0')}
                  </p>

                  <h2 className="resolve__title">{problem.title}</h2>

                  <div className="resolve__when">
                    <p className="label resolve__label">
                      Quando isso costuma acontecer
                    </p>
                    <ul className="resolve__signs">
                      {problem.when.map((sign) => (
                        <li className="resolve__sign" key={sign}>
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="resolve__build">
                    <p className="label resolve__label">
                      O que normalmente construímos
                    </p>
                    <p className="resolve__text">{problem.build}</p>
                    <p className="resolve__note">{problem.note}</p>
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
        </div>
      </section>
    </>
  )
}
