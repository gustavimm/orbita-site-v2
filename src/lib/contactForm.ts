import { EMAIL } from '../content/site'

/* ==========================================================================
   Formulário de contato — validação e envio.
   Isolado da UI: o componente só conhece o resultado, nunca o transporte.
   ========================================================================== */

export type ContactValues = {
  nome: string
  empresa: string
  problema: string
  retorno: string
}

export type ContactField = keyof ContactValues

export type ContactErrors = Partial<Record<ContactField, string>>

/** Ordem dos campos no formulário — usada para focar o primeiro inválido. */
export const FIELD_ORDER: ContactField[] = [
  'nome',
  'empresa',
  'problema',
  'retorno',
]

export const EMPTY_VALUES: ContactValues = {
  nome: '',
  empresa: '',
  problema: '',
  retorno: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** Telefone brasileiro: aceita DDD, espaços, parênteses, hífen e +55. */
const PHONE_PATTERN = /^\+?[\d\s().-]{10,}$/

/** Validação básica no cliente. O endpoint valida de novo, por conta própria. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}

  if (values.nome.trim().length < 2) {
    errors.nome = 'Diga como podemos te chamar.'
  }

  if (values.problema.trim().length < 10) {
    errors.problema = 'Conte um pouco mais — mesmo que em uma frase.'
  }

  const retorno = values.retorno.trim()
  if (retorno.length === 0) {
    errors.retorno = 'Precisamos de um e-mail ou telefone para responder.'
  } else if (!EMAIL_PATTERN.test(retorno) && !PHONE_PATTERN.test(retorno)) {
    errors.retorno = 'Informe um e-mail válido ou um telefone com DDD.'
  }

  return errors
}

export type SubmitResult =
  | { status: 'sent' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string }

const ENDPOINT = '/api/contact'

const MENSAGEM_ERRO =
  'Não conseguimos enviar sua mensagem agora. Tente de novo em instantes ou escreva direto para o nosso e-mail.'

/**
 * Envia o formulário para a função serverless, que fala com a Resend.
 * A chave da API nunca passa por aqui.
 *
 * O campo `orbita_ref` é a armadilha de spam: fica fora da tela e do alcance
 * teclado e leitores, então só um bot o preenche.
 *
 * Nenhum caminho devolve `sent` sem uma resposta 2xx do endpoint.
 */
export async function submitContact(
  values: ContactValues,
  /** Honeypot. Vazio em um envio humano; o servidor decide o que fazer. */
  honeypot = '',
): Promise<SubmitResult> {
  try {
    const resposta = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: values.nome.trim(),
        empresa: values.empresa.trim(),
        problema: values.problema.trim(),
        contato: values.retorno.trim(),
        orbita_ref: honeypot,
      }),
    })

    if (resposta.ok) {
      return { status: 'sent' }
    }

    // Sem RESEND_API_KEY no ambiente: o site continua útil pelo mailto.
    if (resposta.status === 503) {
      return { status: 'not-configured' }
    }

    return { status: 'error', message: MENSAGEM_ERRO }
  } catch {
    // Rede indisponível, offline, bloqueio de extensão.
    return { status: 'error', message: MENSAGEM_ERRO }
  }
}

/** Fallback honesto quando o envio automático não está disponível. */
export function buildMailtoHref(values: ContactValues): string {
  const subject = values.empresa.trim()
    ? `Diagnóstico — ${values.empresa.trim()}`
    : 'Diagnóstico'

  const body = [
    `Nome: ${values.nome.trim()}`,
    values.empresa.trim() ? `Empresa: ${values.empresa.trim()}` : null,
    `Contato para retorno: ${values.retorno.trim()}`,
    '',
    'O que mais trava o dia hoje:',
    values.problema.trim(),
  ]
    .filter((line) => line !== null)
    .join('\n')

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
