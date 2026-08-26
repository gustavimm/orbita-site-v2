import { Link } from 'react-router-dom'
import { OrbitSystem } from '../components/OrbitSystem'
import { VideoText } from '../components/VideoText'
import { CTA_LABEL, CTA_TO } from '../content/site'
import './Hero.css'

/* Ícones de linha fina — mesmo vocabulário visual da órbita (arcos, pontos,
   nós, marcações técnicas), não uma biblioteca externa de ícones genéricos. */

function IconMeasured() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8V5a1 1 0 0 1 1-1h3" />
      <path d="M16 4h3a1 1 0 0 1 1 1v3" />
      <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
      <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLoop() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 0 1 13.2-6.1" />
      <path d="M20 12a8 8 0 0 1-13.2 6.1" />
      <path d="M17 3v3.4h-3.4" />
      <path d="M7 21v-3.4h3.4" />
    </svg>
  )
}

function IconNodes() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="7" r="2.2" />
      <circle cx="18" cy="17" r="2.2" />
      <path d="M7.8 8.6 16.2 15.4" />
    </svg>
  )
}

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4c0 3.5 1.5 6.5 4 8-2.5 1.5-4 4.5-4 8 0-3.5-1.5-6.5-4-8 2.5-1.5 4-4.5 4-8Z" />
    </svg>
  )
}

const CAPABILITIES = [
  { label: 'Sistemas sob medida', Icon: IconMeasured },
  { label: 'Automações', Icon: IconLoop },
  { label: 'Integrações', Icon: IconNodes },
  { label: 'IA quando faz sentido', Icon: IconSpark },
]

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner wrap grid">
        <div className="hero__content">
          <h1 className="hero__title" data-reveal="" style={{ transitionDelay: '0ms' }}>
            Seu{' '}
            <VideoText
              src="/videos/orbita-videotext-v2-boomerang.webm"
              fallbackSrc="/videos/orbita-videotext-v2-boomerang.mp4"
              autoPlay
              muted
              loop
              fontSize="var(--fs-display)"
              fontWeight="var(--fw-bold)"
            >
              negócio
            </VideoText>
            <br />
            no centro<span className="hero__title-dot">.</span>
          </h1>

          <p className="hero__lead" data-reveal="" style={{ transitionDelay: '160ms' }}>
            Sistemas e automações construídos ao redor do que realmente trava o
            seu negócio.
          </p>

          <div data-reveal="" style={{ transitionDelay: '240ms' }}>
            <Link className="hero__cta cta-solid" to={CTA_TO}>
              {CTA_LABEL}
              <span className="cta-solid__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="hero__orbit" data-reveal="" style={{ transitionDelay: '200ms' }}>
          <OrbitSystem />
        </div>
      </div>

      <div className="hero__rail wrap">
        <ul className="hero__rail-list grid" data-reveal="" style={{ transitionDelay: '320ms' }}>
          {CAPABILITIES.map(({ label, Icon }) => (
            <li className="hero__rail-item" key={label}>
              <span className="hero__rail-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="label hero__rail-label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
