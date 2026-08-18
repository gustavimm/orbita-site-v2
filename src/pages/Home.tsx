import { Hero } from '../sections/Hero'
import { usePageMeta } from '../hooks/usePageMeta'

/**
 * A home é só a primeira dobra. O conteúdo mora nas páginas internas —
 * as seções Problema, Soluções, Processo, Manifesto e ContatoCta continuam
 * sendo usadas por elas.
 */
export default function Home() {
  usePageMeta(
    'Órbita — Seu negócio no centro',
    'Software house que constrói sistemas sob medida, automações e integrações para micro e pequenas empresas. Começamos pelo problema, não pelo código.',
  )

  return <Hero />
}
