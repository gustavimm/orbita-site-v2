import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { CtaLink } from './CtaLink'
import { useScrolled } from '../hooks/useScrolled'
import { CTA_LABEL, CTA_TO, NAV_LINKS } from '../content/site'
import './Navbar.css'

export function Navbar() {
  const scrolled = useScrolled(24)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  // O menu guarda em qual rota foi aberto. Assim, trocar de página o fecha
  // sem precisar de um efeito que escreve estado depois da renderização.
  const [menu, setMenu] = useState({ open: false, path: pathname })
  const menuOpen = menu.open && menu.path === pathname

  // Fechar ao navegar: não devolve o foco ao botão, que sai da tela.
  const dismissMenu = useCallback(() => {
    setMenu({ open: false, path: pathname })
  }, [pathname])

  // Fechar sem navegar (Esc, botão): o foco volta para quem abriu.
  const closeMenu = useCallback(() => {
    setMenu({ open: false, path: pathname })
    toggleRef.current?.focus()
  }, [pathname])

  // Trava a rolagem e permite fechar com Esc enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!menuOpen) return

    document.body.dataset.scrollLocked = 'true'

    // Com o menu aberto, o resto da página fica atrás do overlay: o Tab não
    // pode alcançá-la. O ciclo é fechado dentro do header, que contém tanto a
    // marca e o botão quanto os links do menu.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }

      if (event.key !== 'Tab') return

      const header = headerRef.current
      if (!header) return

      const focusable = Array.from(
        header.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => el.offsetParent !== null)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !header.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !header.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }

    const desktop = window.matchMedia('(min-width: 901px)')
    const onBreakpoint = () => dismissMenu()

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)

    return () => {
      delete document.body.dataset.scrollLocked
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [menuOpen, closeMenu, dismissMenu])

  return (
    <header
      ref={headerRef}
      className={`nav${scrolled ? ' is-scrolled' : ''}`}
      data-open={menuOpen}
    >
      <div className="nav__inner wrap">
        <Link className="nav__brand" to="/" aria-label="Órbita — página inicial">
          <Logo compact={scrolled} />
        </Link>

        <nav className="nav__nav" aria-label="Navegação principal">
          <ul className="nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink className="nav__link" to={link.to}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink className="nav__cta" to={CTA_TO}>
          {CTA_LABEL}
        </NavLink>

        <button
          ref={toggleRef}
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenu({ open: !menuOpen, path: pathname })}
        >
          <span className="nav__toggle-lines" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="u-visually-hidden">
            {menuOpen ? 'Fechar menu' : 'Abrir menu'}
          </span>
        </button>
      </div>

      <span className="nav__rule" aria-hidden="true" />

      {/* Navegação mobile: composição própria, não uma versão espremida do desktop. */}
      <div id="nav-menu" className="navmenu" inert={!menuOpen}>
        <div className="navmenu__inner wrap">
          <ul className="navmenu__list">
            {NAV_LINKS.map((link, i) => (
              <li className="navmenu__item" key={link.to}>
                <NavLink className="navmenu__link" to={link.to} onClick={dismissMenu}>
                  <span className="index navmenu__index">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="navmenu__foot">
            <CtaLink to={CTA_TO} onClick={dismissMenu}>
              {CTA_LABEL}
            </CtaLink>
          </div>
        </div>
      </div>
    </header>
  )
}
