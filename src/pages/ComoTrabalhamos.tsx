import { PageHeader } from '../components/PageHeader'
import { Processo } from '../sections/Processo'
import { ContatoCta } from '../sections/ContatoCta'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ComoTrabalhamos() {
  usePageMeta(
    'Como trabalhamos',
    'Diagnóstico, protótipo, validação e implementação. Quatro etapas para sair do problema real até algo funcionando.',
  )

  return (
    <>
      <PageHeader
        index="01"
        label="Como trabalhamos"
        title={
          <>
            Quatro etapas entre o problema
            <br />e algo funcionando<span className="pagehead__accent">.</span>
          </>
        }
        lead="Cada etapa existe para responder uma pergunta. Enquanto a pergunta não estiver respondida, não faz sentido avançar."
      />
      <Processo index="02" label="O caminho" />
      <ContatoCta index="03" />
    </>
  )
}
