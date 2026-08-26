import { PageHeader } from '../components/PageHeader'
import { usePageMeta } from '../hooks/usePageMeta'
import './Sobre.css'

const BLOCKS = [
  {
    label: 'Como pensamos',
    text: 'A tecnologia deve se adaptar ao negócio, não o contrário. A primeira pergunta nunca é qual ferramenta usar — é o que está travando.',
  },
  {
    label: 'Para quem',
    text: 'Micro e pequenas empresas — onde quem decide também executa, não existe time de tecnologia, e cada hora perdida numa tarefa manual falta em outro lugar.',
  },
  {
    label: 'Como começamos',
    text: 'Entendendo a operação como ela é hoje, com quem trabalha nela todo dia. Só depois falamos em solução — o problema da primeira conversa raramente é o real.',
  },
  {
    label: 'O que não fazemos',
    text: 'Não recomendamos IA quando uma regra simples resolve. Não vendemos o que o diagnóstico não pediu, nem entregamos um sistema que exige a sua equipe mudar para caber nele.',
  },
]

export default function Sobre() {
  usePageMeta(
    'Sobre',
    'A Órbita constrói tecnologia próxima da realidade de micro e pequenas empresas. Entendemos a operação antes de recomendar uma solução.',
  )

  return (
    <>
      <PageHeader
        title={
          <>
            Não começamos pelo código.
            <br />
            Começamos pelo problema<span className="pagehead__accent">.</span>
          </>
        }
        lead="A Órbita é uma software house focada em micro e pequenas empresas. Construímos sistemas, automações e integrações a partir da operação que já existe."
      />

      <section className="sobre section">
        <div className="wrap">
          <ol className="sobre__list">
            {BLOCKS.map((block) => (
              <li className="sobre__item" key={block.label}>
                <div className="sobre__card" data-reveal="">
                  <p className="label sobre__label">{block.label}</p>
                  <p className="sobre__text">{block.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
