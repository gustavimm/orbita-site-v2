import { Link } from 'react-router-dom'

type CtaLinkProps = {
  to: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

/**
 * Chamada textual do sistema: texto + seta, com régua de 1px que avança
 * em #00E6A8 no hover. Estilo em `.cta-inline` (layout.css).
 */
export function CtaLink({ to, children, onClick, className }: CtaLinkProps) {
  return (
    <Link
      className={className ? `cta-inline ${className}` : 'cta-inline'}
      to={to}
      onClick={onClick}
    >
      {children}
      <span className="cta-inline__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  )
}
