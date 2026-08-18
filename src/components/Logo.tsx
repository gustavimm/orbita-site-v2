import './Logo.css'

type LogoProps = {
  /** Reduz o símbolo e o texto, usado na navbar em estado compacto. */
  compact?: boolean
}

/**
 * Marca da Órbita.
 * Usa o arquivo oficial `/logo-orbita.png` (1024×1024, quadrado) sem qualquer
 * tratamento: nada de filtro, recorte, máscara ou redesenho.
 */
export function Logo({ compact = false }: LogoProps) {
  return (
    <span className={compact ? 'logo logo--compact' : 'logo'}>
      <img
        className="logo__mark"
        src="/logo-orbita.png"
        alt=""
        width={30}
        height={30}
        aria-hidden="true"
      />
      <span className="logo__word">Órbita</span>
    </span>
  )
}
