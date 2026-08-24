/* ==========================================================================
   POST /api/contact
   Recebe o formulário da página de contato e dispara um e-mail pela Resend.

   A chave vive apenas aqui, em variável de ambiente — nunca chega ao cliente.
   ========================================================================== */

/**
 * Subconjunto do req/res que a Vercel entrega ao runtime Node.
 * Declarado localmente para não depender de `@vercel/node` só por tipos.
 */
type ApiRequest = {
  method?: string
  body?: unknown
  headers?: Record<string, string | string[] | undefined>
}

type ApiResponse = {
  status(code: number): ApiResponse
  json(body: unknown): unknown
  setHeader(name: string, value: string): unknown
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

/** Destinatário. Configurável, com o endereço da Órbita como padrão. */
const TO = process.env.CONTACT_TO_EMAIL || 'weorbita@gmail.com'

/**
 * Remetente. A Resend só entrega de um domínio verificado.
 * Enquanto weorbita.com.br não estiver verificado no painel, o sandbox
 * `onboarding@resend.dev` funciona, mas só entrega para o e-mail do dono da
 * conta Resend. Ver o relatório para o passo de verificação.
 */
const FROM = process.env.CONTACT_FROM_EMAIL || 'Órbita <onboarding@resend.dev>'

const SUBJECT_PREFIX = 'Novo contato — Órbita'

/** Limites de tamanho por campo, aplicados no servidor. */
const LIMITS = {
  nome: 120,
  empresa: 160,
  problema: 4000,
  contato: 160,
  whatsapp: 40,
} as const

type Campo = keyof typeof LIMITS

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARS = /^\+?[\d\s().-]+$/

/** Mesma regra do cliente: conta dígitos, aceita com ou sem DDD e sem máscara. */
function ehTelefone(valor: string): boolean {
  if (!PHONE_CHARS.test(valor)) return false
  const digitos = valor.replace(/\D/g, '')
  return digitos.length >= 8 && digitos.length <= 13
}

/**
 * Normaliza um campo recebido: descarta o que não for string, remove
 * caracteres de controle (incluindo CR/LF, que poderiam ser usados para
 * injetar cabeçalhos) e corta no limite.
 */
function sanitize(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''

  let limpo = ''
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0
    const controle = code < 0x20 || code === 0x7f
    // Quebras de linha só são preservadas no campo longo, tratado adiante.
    if (controle && char !== '\n' && char !== '\t') continue
    limpo += char
  }

  return limpo.trim().slice(0, max)
}

/** Mesmas regras da validação do cliente — o cliente não é autoridade. */
function validar(dados: Record<Campo, string>): Partial<Record<Campo, string>> {
  const erros: Partial<Record<Campo, string>> = {}

  if (dados.nome.length < 2) {
    erros.nome = 'Nome muito curto.'
  }

  if (dados.problema.length < 10) {
    erros.problema = 'Descrição muito curta.'
  }

  if (dados.contato.length === 0) {
    erros.contato = 'Contato para retorno é obrigatório.'
  } else if (
    !EMAIL_PATTERN.test(dados.contato) &&
    !ehTelefone(dados.contato)
  ) {
    erros.contato = 'Informe um e-mail válido ou um telefone com DDD.'
  }

  if (dados.whatsapp.length === 0) {
    erros.whatsapp = 'WhatsApp é obrigatório.'
  } else if (!ehTelefone(dados.whatsapp)) {
    erros.whatsapp = 'Número de WhatsApp inválido.'
  }

  return erros
}

function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function corpoTexto(d: Record<Campo, string>): string {
  return [
    `Nome: ${d.nome}`,
    `Empresa: ${d.empresa || '—'}`,
    `Contato para retorno: ${d.contato}`,
    `WhatsApp: ${d.whatsapp}`,
    '',
    'O que mais trava o dia hoje:',
    d.problema,
  ].join('\n')
}

function corpoHtml(d: Record<Campo, string>): string {
  const linha = (rotulo: string, valor: string) =>
    `<tr>
      <td style="padding:6px 16px 6px 0;color:#6b7280;font-size:13px;vertical-align:top;white-space:nowrap;">${rotulo}</td>
      <td style="padding:6px 0;color:#111827;font-size:15px;">${escaparHtml(valor)}</td>
    </tr>`

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;">
  <h2 style="margin:0 0 20px;font-size:17px;color:#111827;">${SUBJECT_PREFIX}</h2>
  <table style="border-collapse:collapse;margin-bottom:24px;">
    ${linha('Nome', d.nome)}
    ${linha('Empresa', d.empresa || '—')}
    ${linha('Retorno', d.contato)}
    ${linha('WhatsApp', d.whatsapp)}
  </table>
  <p style="margin:0 0 8px;color:#6b7280;font-size:13px;">O que mais trava o dia hoje</p>
  <p style="margin:0;color:#111827;font-size:15px;white-space:pre-wrap;">${escaparHtml(d.problema)}</p>
</div>`
}

/**
 * Honeypot. O campo `orbita_ref` fica fora da tela, fora do tab e escondido de
 * leitores de tela — nenhum humano o preenche. Qualquer valor presente indica
 * preenchimento automático.
 */
function ehArmadilha(valor: unknown): boolean {
  if (valor === undefined || valor === null) return false
  return String(valor).trim().length > 0
}

/** O corpo pode chegar já parseado ou como string, dependendo do runtime. */
function lerCorpo(body: unknown): Record<string, unknown> {
  if (typeof body === 'string') {
    try {
      const parsed: unknown = JSON.parse(body)
      return typeof parsed === 'object' && parsed !== null
        ? (parsed as Record<string, unknown>)
        : {}
    } catch {
      return {}
    }
  }

  return typeof body === 'object' && body !== null
    ? (body as Record<string, unknown>)
    : {}
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  const bruto = lerCorpo(req.body)

  if (ehArmadilha(bruto.orbita_ref)) {
    // Resposta idêntica à de um envio bem-sucedido, de propósito: um retorno
    // diferente ensinaria o bot exatamente qual campo deixar em branco.
    // O descarte fica registrado só no log da função.
    console.warn('[contact] descartado pelo honeypot')
    return res.status(200).json({ ok: true })
  }

  const chave = process.env.RESEND_API_KEY
  if (!chave) {
    // Sem chave não há envio. A UI cai no aviso honesto com o mailto.
    return res.status(503).json({ ok: false, error: 'not_configured' })
  }

  const dados: Record<Campo, string> = {
    nome: sanitize(bruto.nome, LIMITS.nome),
    empresa: sanitize(bruto.empresa, LIMITS.empresa),
    problema: sanitize(bruto.problema, LIMITS.problema),
    contato: sanitize(bruto.contato, LIMITS.contato),
    whatsapp: sanitize(bruto.whatsapp, LIMITS.whatsapp),
  }

  const erros = validar(dados)
  if (Object.keys(erros).length > 0) {
    return res.status(400).json({ ok: false, error: 'validation', fields: erros })
  }

  // Responder direto do Gmail cai no contato certo quando ele é um e-mail.
  const replyTo = EMAIL_PATTERN.test(dados.contato) ? dados.contato : undefined
  const assunto = dados.empresa
    ? `${SUBJECT_PREFIX} — ${dados.empresa}`
    : SUBJECT_PREFIX

  try {
    const resposta = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${chave}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: assunto,
        text: corpoTexto(dados),
        html: corpoHtml(dados),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    })

    if (!resposta.ok) {
      const detalhe = await resposta.text()
      // O detalhe fica no log da função, não na resposta ao cliente.
      console.error('[contact] Resend respondeu', resposta.status, detalhe)
      return res.status(502).json({ ok: false, error: 'send_failed' })
    }

    return res.status(200).json({ ok: true })
  } catch (erro) {
    console.error('[contact] falha ao chamar a Resend', erro)
    return res.status(502).json({ ok: false, error: 'send_failed' })
  }
}
