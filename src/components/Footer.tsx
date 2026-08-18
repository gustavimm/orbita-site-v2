import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { CtaLink } from './CtaLink'
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_DOMAIN,
} from '../content/site'
import './Footer.css'

/**
 * O rodapé é uma chamada para o contato, não um segundo menu.
 * A navegação já existe na navbar — repeti-la aqui só adiciona ruído.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__call grid">
          <h2 className="footer__headline" data-reveal="">
            Tem algo travando
            <br />o seu negócio<span className="footer__mark">?</span>
          </h2>

          <div
            className="footer__action"
            data-reveal=""
            style={{ transitionDelay: '80ms' }}
          >
            <CtaLink className="footer__cta" to="/contato">
              Falar com a Órbita
            </CtaLink>
          </div>
        </div>

        <div className="footer__bottom grid">
          <Link className="footer__brand" to="/" aria-label="Órbita — página inicial">
            <Logo />
          </Link>

          <p className="footer__meta">
            <a
              className="footer__social"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              {INSTAGRAM_HANDLE}
            </a>
            <span className="footer__domain">{SITE_DOMAIN}</span>
          </p>

          <p className="label footer__copy">
            © {new Date().getFullYear()} Órbita
          </p>
        </div>
      </div>
    </footer>
  )
}
