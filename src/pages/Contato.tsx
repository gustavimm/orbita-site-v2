import { PageHeader } from '../components/PageHeader'
import { SectionHead } from '../components/SectionHead'
import { CtaLink } from '../components/CtaLink'
import { ContactForm } from '../components/ContactForm'
import { CHANNELS, EMAIL } from '../content/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './Contato.css'

const EXPECTATIONS = [
  'Você conta o que está travando hoje, com as palavras da sua operação.',
  'A gente entende como o processo funciona antes de sugerir qualquer coisa.',
  'Se existir um caminho mais simples que um sistema, é ele que vamos apontar.',
]

const WHATSAPP_URL = 'https://wa.me/5545988213870'

export default function Contato() {
  usePageMeta(
    'Contato',
    'Conte qual parte do seu dia mais trava hoje. A primeira conversa é um diagnóstico da sua operação.',
  )

  return (
    <>
      <PageHeader
        index="01"
        label="Contato"
        title={
          <>
            Qual parte do seu dia
            <br />
            mais te trava hoje<span className="pagehead__accent">?</span>
          </>
        }
        lead="A primeira conversa é um diagnóstico: entender a operação, achar o gargalo real e dizer com honestidade se dá para resolver."
      />

      <section className="contato section">
        <div className="wrap">
          <div className="contato__head grid">
            <div className="contato__meta">
              <SectionHead index="02" label="O que esperar" />
            </div>
          </div>

          <ol className="contato__list">
            {EXPECTATIONS.map((item, i) => (
              <li className="contato__item" key={item}>
                <div className="contato__row grid" data-reveal="">
                  <span className="index contato__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="contato__text">{item}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="contato__foot grid" data-reveal="">
            <CtaLink className="contato__cta" to="/como-trabalhamos">
              Ver como trabalhamos
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="contato-wpp section">
        <div className="wrap grid">
          <h2 className="contato-wpp__title" data-reveal="">
            Prefere conversar pelo WhatsApp?
          </h2>

          <div
            className="contato-wpp__aside"
            data-reveal=""
            style={{ transitionDelay: '60ms' }}
          >
            <p className="contato-wpp__text">
              Se for mais prático, fale diretamente com a gente. Respondemos o
              mais rápido possível.
            </p>

            <a
              className="cta-inline contato-wpp__cta"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Conversar no WhatsApp
              <span className="cta-inline__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="contato-form section" id="formulario">
        <div className="wrap grid">
          <div className="contato-form__aside">
            <SectionHead index="03" label="Conte o que trava" />

            <h2 className="contato-form__title" data-reveal="" style={{ transitionDelay: '60ms' }}>
              Comece pelo que está travando.
            </h2>

            <p className="contato-form__lead" data-reveal="" style={{ transitionDelay: '120ms' }}>
              Quatro campos. Quanto mais concreto for o terceiro, mais útil
              fica a primeira conversa.
            </p>

            <p className="contato-form__alt" data-reveal="" style={{ transitionDelay: '180ms' }}>
              Prefere e-mail?{' '}
              <a className="contato-form__mail" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
          </div>

          <div className="contato-form__panel" data-reveal="" style={{ transitionDelay: '120ms' }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {CHANNELS.length > 0 ? (
        <section className="contato-canais section">
          <div className="wrap">
            <div className="contato__head grid">
              <div className="contato__meta">
                <SectionHead index="04" label="Outros canais" />
              </div>
            </div>

            <ul className="canais__list">
              {CHANNELS.map((channel) => (
                <li className="canais__item" key={channel.href}>
                  <a
                    className="canais__link grid"
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    <span className="label canais__label">{channel.label}</span>
                    <span className="canais__value">{channel.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  )
}
