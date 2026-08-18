import { Link } from 'react-router-dom'
import { SectionHead } from '../components/SectionHead'
import { CTA_LABEL, CTA_TO } from '../content/site'
import './ContatoCta.css'

type ContatoCtaProps = {
  index?: string
  label?: string
}

/** Fechamento de página: a pergunta central e o CTA principal. */
export function ContatoCta({ index, label = 'Contato' }: ContatoCtaProps) {
  return (
    <section className="contatocta section" id="contato">
      <div className="wrap grid">
        {index ? (
          <div className="contatocta__meta">
            <SectionHead index={index} label={label} />
          </div>
        ) : null}

        <h2 className="contatocta__question" data-reveal="" style={{ transitionDelay: '80ms' }}>
          Qual parte do seu dia mais te trava hoje
          <span className="contatocta__mark">?</span>
        </h2>

        <div className="contatocta__action" data-reveal="" style={{ transitionDelay: '160ms' }}>
          <Link className="cta-solid" to={CTA_TO}>
            {CTA_LABEL}
            <span className="cta-solid__arrow" aria-hidden="true">
              →
            </span>
          </Link>

          <p className="contatocta__note">
            A primeira conversa é o diagnóstico. Sem compromisso de projeto.
          </p>
        </div>
      </div>
    </section>
  )
}
