import './Logo.css'

type LogoProps = {
  /** Reduz o símbolo e o texto, usado na navbar em estado compacto. */
  compact?: boolean
}

/**
 * Marca da Órbita.
 * Dois arquivos oficiais, um por tema — cada um já vem com o ponto central
 * na cor certa (verde-ciano no escuro, grafite no claro) e com alpha real,
 * ao contrário do antigo `/logo-orbita.png` (opaco, por isso o CSS tinha
 * borda arredondada simulando um "selo" — removido, não é mais necessário).
 * Os dois <img> ficam sempre no DOM; só a visibilidade troca via CSS
 * (:root[data-theme]), then a troca de tema nunca espera um fetch de
 * imagem novo — sem flash do arquivo errado. Sem filtro, recorte, máscara
 * ou redesenho em nenhum dos dois.
 */
export function Logo({ compact = false }: LogoProps) {
  return (
    <span className={compact ? 'logo logo--compact' : 'logo'}>
      <img
        className="logo__mark logo__mark--dark"
        src="/logo-orbita-transparent.png"
        alt=""
        width={30}
        height={30}
        aria-hidden="true"
      />
      <img
        className="logo__mark logo__mark--light"
        src="/logo-orbita-light.png"
        alt=""
        width={30}
        height={30}
        aria-hidden="true"
      />
      <span className="logo__word">Órbita</span>
    </span>
  )
}
