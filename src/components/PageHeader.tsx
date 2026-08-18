import { SectionHead } from './SectionHead'
import './PageHeader.css'

type PageHeaderProps = {
  index: string
  label: string
  title: React.ReactNode
  lead?: React.ReactNode
  /** Modificador opcional, para a página ajustar a medida do texto. */
  className?: string
}

/** Abertura padrão das páginas internas: eyebrow, título e linha de apoio. */
export function PageHeader({ index, label, title, lead, className }: PageHeaderProps) {
  return (
    <header className={className ? `pagehead ${className}` : 'pagehead'}>
      <div className="wrap grid">
        <div className="pagehead__meta">
          <SectionHead index={index} label={label} />
        </div>

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
