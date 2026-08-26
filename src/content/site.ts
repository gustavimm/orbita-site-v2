/* ==========================================================================
   Conteúdo compartilhado entre páginas.
   Editar aqui atualiza Home e páginas internas ao mesmo tempo.
   ========================================================================== */

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/o-que-resolvemos', label: 'O que resolvemos' },
  { to: '/como-trabalhamos', label: 'Como trabalhamos' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
]

export const SITE_URL = 'https://weorbita.com.br'
export const SITE_DOMAIN = 'weorbita.com.br'
export const INSTAGRAM_HANDLE = '@weorbita'
export const INSTAGRAM_URL = 'https://instagram.com/weorbita'
export const EMAIL = 'contato@weorbita.com.br'
export const WHATSAPP_URL = 'https://wa.me/5545988213870'

export const CTA_LABEL = 'Agendar diagnóstico'
export const CTA_TO = '/contato'

/* --- O que resolvemos -------------------------------------------------------
   Situações de operação, não catálogo de tecnologia. `when` são fragmentos
   curtos, sinais que o visitante deve reconhecer de relance; `build` é uma
   única frase direta — a resposta, não um pitch.
   --------------------------------------------------------------------------- */

export const PROBLEMS = [
  {
    title: 'Orçamentos demorados',
    when: [
      'Proposta montada do zero a cada vez',
      'Preço depende de quem lembra a regra',
      'Resposta espera a agenda de uma pessoa só',
    ],
    build: 'Um fluxo de orçamento com as regras já dentro, sempre no mesmo padrão.',
  },
  {
    title: 'Planilhas controlando a empresa',
    when: [
      'Só uma pessoa entende a estrutura da planilha',
      'Fórmula quebrada, célula sobrescrita sem aviso',
      'Ninguém sabe qual arquivo é o atual',
    ],
    build: 'Um sistema com as mesmas contas e regras, mas com histórico e acesso por pessoa.',
  },
  {
    title: 'Informações espalhadas',
    when: [
      'Mesmo cliente espalhado entre WhatsApp, e-mail e planilha',
      'Cada área usa a própria versão do dado',
      'Uma pergunta simples exige abrir três lugares',
    ],
    build: 'Um lugar único onde cadastro, histórico e documentos ficam sempre atualizados.',
  },
  {
    title: 'Atendimento repetitivo',
    when: [
      'Mesmas perguntas todo dia, respostas iguais',
      'Alguém para tudo pra repetir a mesma resposta',
      'Primeiro contato depende de alguém disponível',
    ],
    build:
      'Respostas automáticas para o previsível, com caminho aberto pra uma pessoa quando foge do padrão.',
  },
  {
    title: 'Processos manuais',
    when: [
      'Mesma sequência refeita toda semana, na mão',
      'Tarefa só acontece se alguém lembrar',
      'Erro de digitação e retrabalho na rotina',
    ],
    build: 'Rotinas que rodam sozinhas, em horário definido ou a partir de um evento.',
  },
  {
    title: 'Sistemas que não conversam',
    when: [
      'Mesmo dado digitado em duas ou três ferramentas',
      'Dois sistemas mostram números diferentes',
      'Exportação manual no meio do processo',
    ],
    build: 'Integração entre as ferramentas que você já usa — cadastro feito uma vez só.',
  },
]

/* --- 02 · Problema --------------------------------------------------------- */

export const PAINS = [
  {
    title: 'Processos manuais que se repetem',
    text: 'A mesma sequência de tarefas toda semana, feita na mão, do mesmo jeito.',
  },
  {
    title: 'O mesmo dado digitado três vezes',
    text: 'A informação entra numa ferramenta, é copiada para outra e conferida numa terceira.',
  },
  {
    title: 'Uma planilha que ninguém pode perder',
    text: 'Ela sustenta a operação inteira e só uma pessoa entende como funciona de verdade.',
  },
  {
    title: 'Orçamento que demora a sair',
    text: 'Cada proposta começa do zero e disputa o tempo de quem também toca o resto.',
  },
  {
    title: 'Cobrança que depende de memória',
    text: 'Se ninguém lembrar, o dinheiro entra atrasado — ou não entra.',
  },
]

/* --- 03 · Soluções ---------------------------------------------------------
   `text` aparece no resumo da home; `detail` e `notes`, só na página interna.
   --------------------------------------------------------------------------- */

export const SOLUTIONS = [
  {
    title: 'Sistemas sob medida',
    text: 'Um sistema construído em cima da sua operação, com as regras que ela já tem.',
    detail:
      'Software genérico obriga o negócio a mudar para caber na ferramenta. Aqui é o contrário: partimos das regras que a sua operação já usa, inclusive as que não estão escritas em lugar nenhum, e construímos em cima delas. O sistema nasce falando a língua de quem vai usar.',
    notes: [
      'Cadastros e fluxos com os nomes que a sua equipe já usa',
      'As exceções da operação tratadas como regra, não como gambiarra',
      'Acesso por perfil, para cada pessoa ver o que precisa',
    ],
  },
  {
    title: 'Automações',
    text: 'O que se repete passa a acontecer sozinho, sem depender de alguém lembrar.',
    detail:
      'Toda operação tem tarefas que se repetem em intervalo previsível e não exigem decisão humana. Elas consomem tempo de gente que deveria estar decidindo outra coisa, e falham exatamente quando alguém está ocupado. Automação é tirar essas tarefas do campo da memória.',
    notes: [
      'Rotinas que rodam em horário definido, sem ninguém iniciar',
      'Avisos e lembretes disparados a partir de um evento',
      'Documentos e relatórios que se montam a partir do dado que já existe',
    ],
  },
  {
    title: 'Integrações',
    text: 'As ferramentas que você já usa conversando entre si, com o dado digitado uma vez só.',
    detail:
      'Na maior parte dos casos as ferramentas certas já estão lá — elas só não se falam. O custo aparece na digitação repetida, na divergência entre dois sistemas e no tempo gasto conferindo qual dos dois está certo. Integrar é fazer o dado atravessar as ferramentas inteiro.',
    notes: [
      'Um cadastro feito uma vez, disponível onde for necessário',
      'Ferramentas que você já paga finalmente conectadas',
      'Fim da conferência manual entre dois sistemas',
    ],
  },
  {
    title: 'IA quando fizer sentido',
    text: 'Usamos IA onde ela resolve um problema concreto. Onde não resolve, não entra.',
    detail:
      'IA é uma ferramenta boa para um conjunto específico de problemas: entender texto solto, classificar, resumir, extrair informação de documento. Fora desse conjunto, quase sempre existe uma solução mais simples, mais barata e mais previsível — e é essa que vamos recomendar.',
    notes: [
      'Entra depois do diagnóstico, nunca como ponto de partida',
      'Sempre com uma forma de conferir o resultado',
      'Se uma regra simples resolve, a regra simples ganha',
    ],
  },
]

/* --- 04 · Como trabalhamos --------------------------------------------------
   `question` é a pergunta que a etapa existe para responder.
   --------------------------------------------------------------------------- */

export const STEPS = [
  {
    title: 'Diagnóstico',
    text: 'Entendemos a operação como ela é hoje, antes de propor qualquer coisa.',
    question: 'Onde exatamente o tempo está indo?',
    detail:
      'Conversamos com quem executa, não só com quem decide, e olhamos o processo real — inclusive os contornos que ninguém documentou. Saímos sabendo qual é o gargalo de verdade.',
  },
  {
    title: 'Protótipo',
    text: 'Uma versão concreta e navegável, para você ver a solução antes de ela existir.',
    question: 'É isso mesmo que resolve?',
    detail:
      'Em vez de descrever a solução num documento, montamos algo que dá para abrir e percorrer. Discutir uma tela concreta é mais barato do que discutir uma ideia abstrata.',
  },
  {
    title: 'Validação / ajuste',
    text: 'Você usa e aponta o que não fecha. Corrigimos enquanto mudar ainda é barato.',
    question: 'O que ainda não fecha?',
    detail:
      'Quem conhece a operação testa o protótipo e aponta o que não corresponde à realidade. Mudar de direção aqui custa uma conversa — depois de construído, custa muito mais.',
  },
  {
    title: 'Implementação',
    text: 'Com o caminho validado, entram escopo, prazo e construção.',
    question: 'O que entra agora e o que fica para depois?',
    detail:
      'Com o problema entendido e a solução validada, dá para falar de escopo com honestidade: o que resolve a maior parte da dor primeiro, o que pode esperar depois.',
  },
]
