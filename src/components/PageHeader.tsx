import './PageHeader.css'

type PageHeaderProps = {
  title: React.ReactNode
  lead?: React.ReactNode
  /** Modificador opcional, para a página ajustar a medida do texto. */
  className?: string
}

/** Abertura padrão das páginas internas: título e linha de apoio. */
export function PageHeader({ title, lead, className }: PageHeaderProps) {
  return (
    <header className={className ? `pagehead ${className}` : 'pagehead'}>
      <div className="wrap grid">
        <h1 className="pagehead__title" data-reveal="" style={{ transitionDelay: '80ms' }}>
          {title}
        </h1>

        {lead ? (
          <p className="pagehead__lead" data-reveal="" style={{ transitionDelay: '160ms' }}>
            {lead}
          </p>
        ) : null}
      </div>
    </header>
  )
}
