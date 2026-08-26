import { Hero } from '../sections/Hero'
import { Problema } from '../sections/Problema'
import { Solucoes } from '../sections/Solucoes'
import { usePageMeta } from '../hooks/usePageMeta'

/**
 * Fluxo da home: Hero → Problema → Soluções (teaser). O Footer já traz a chamada de contato.
 */
export default function Home() {
  usePageMeta(
    'Órbita — Seu negócio no centro',
    'Software house que constrói sistemas sob medida, automações e integrações para micro e pequenas empresas. Começamos pelo problema, não pelo código.',
  )

  return (
    <>
      <Hero />
      <Problema index="02" />
      <Solucoes index="03" />
    </>
  )
}
