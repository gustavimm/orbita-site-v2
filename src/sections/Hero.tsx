import { Link } from 'react-router-dom'
import { OrbitSystem } from '../components/OrbitSystem'
import { SectionHead } from '../components/SectionHead'
import { CTA_LABEL, CTA_TO } from '../content/site'
import './Hero.css'

const CAPABILITIES = [
  'Sistemas sob medida',
  'Automações',
  'Integrações',
  'IA quando faz sentido',
]

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner wrap grid">
        <div className="hero__content">
          <SectionHead
            index="01"
            label="Software house para micro e pequenas empresas"
          />

          <h1 className="hero__title" data-reveal="" style={{ transitionDelay: '80ms' }}>
            Seu negócio
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
          {CAPABILITIES.map((item) => (
            <li className="hero__rail-item label" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
