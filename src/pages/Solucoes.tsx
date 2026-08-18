import { PageHeader } from '../components/PageHeader'
import { Problema } from '../sections/Problema'
import { Solucoes as SolucoesSection } from '../sections/Solucoes'
import { ContatoCta } from '../sections/ContatoCta'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Solucoes() {
  usePageMeta(
    'Soluções',
    'Sistemas sob medida, automações, integrações e IA quando fizer sentido. O que entra em cada projeto vem do diagnóstico.',
  )

  return (
    <>
      <PageHeader
        index="01"
        label="Soluções"
        title={
          <>
            Tecnologia construída
            <br />
            ao redor da sua operação<span className="pagehead__accent">.</span>
          </>
        }
        lead="Quatro frentes de trabalho. Nenhuma delas começa pela ferramenta — todas começam pelo que está travando."
      />
      <Problema index="02" />
      <SolucoesSection index="03" label="As quatro frentes" />
      <ContatoCta index="04" />
    </>
  )
}
