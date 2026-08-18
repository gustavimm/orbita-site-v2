import { PageHeader } from '../components/PageHeader'
import { ContatoCta } from '../sections/ContatoCta'
import { usePageMeta } from '../hooks/usePageMeta'
import './Sobre.css'

const BLOCKS = [
  {
    label: 'Como pensamos',
    text: 'A tecnologia deve se adaptar ao negócio, e não o contrário. Por isso a primeira pergunta nunca é qual ferramenta usar — é o que está travando. Um sistema só é bom se a operação continuar fazendo sentido depois que ele existir.',
  },
  {
    label: 'Para quem',
    text: 'Micro e pequenas empresas. Operações onde quem decide também executa, onde não existe um time de tecnologia para intermediar e onde cada hora perdida em tarefa manual é uma hora que faltou em outro lugar.',
  },
  {
    label: 'Como começamos',
    text: 'Entendendo a operação como ela é hoje, com quem trabalha nela todo dia. Só depois disso falamos em solução — porque o problema que aparece na primeira conversa raramente é o problema real.',
  },
  {
    label: 'O que não fazemos',
    text: 'Não recomendamos IA quando uma regra simples resolve. Não vendemos o que o diagnóstico não pediu. E não entregamos um sistema que só funciona se a sua equipe mudar de jeito para caber nele.',
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
        index="01"
        label="Sobre"
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
                <div className="sobre__row grid" data-reveal="">
                  <p className="label sobre__label">{block.label}</p>
                  <p className="sobre__text">{block.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContatoCta index="02" />
    </>
  )
}
