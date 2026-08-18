import { useRef, useState } from 'react'
import {
  buildMailtoHref,
  EMPTY_VALUES,
  FIELD_ORDER,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
  type SubmitResult,
} from '../lib/contactForm'
import { EMAIL } from '../content/site'
import './ContactForm.css'

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [sending, setSending] = useState(false)
  // Armadilha de spam: fora de ContactValues de propósito, para não entrar na
  // validação nem no corpo do e-mail de fallback.
  const [honeypot, setHoneypot] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    // Um "enviada" de uma mensagem anterior não pode ficar pairando sobre a
    // próxima que está sendo escrita.
    setResult((current) => (current?.status === 'sent' ? null : current))
    // Some o erro assim que o campo começa a ser corrigido.
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const found = validateContact(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setResult(null)
      const first = FIELD_ORDER.find((field) => found[field])
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${first}"]`)
        ?.focus()
      return
    }

    setSending(true)
    const outcome = await submitContact(values, honeypot)
    setSending(false)
    setResult(outcome)

    if (outcome.status === 'sent') {
      setValues(EMPTY_VALUES)
    }
  }

  const describedBy = (field: ContactField) =>
    errors[field] ? `${field}-erro` : undefined

  return (
    <form
      ref={formRef}
      className="form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Fora da tela, fora do tab, invisível para leitores de tela.
          Humano nunca preenche; bot que varre o DOM preenche. */}
      <div className="form__trap" aria-hidden="true">
        <label htmlFor="orbita_ref">Não preencha este campo</label>
        <input
          id="orbita_ref"
          name="orbita_ref"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="form__fields">
        <div className="field field--nome" data-invalid={Boolean(errors.nome)}>
          <label className="label field__label" htmlFor="nome">
            Nome
          </label>
          <input
            className="field__input"
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            value={values.nome}
            onChange={(event) => update('nome', event.target.value)}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={describedBy('nome')}
          />
          {errors.nome ? (
            <p className="field__error" id="nome-erro">
              {errors.nome}
            </p>
          ) : null}
        </div>

        <div className="field field--empresa">
          <label className="label field__label" htmlFor="empresa">
            Empresa <span className="field__optional">(opcional)</span>
          </label>
          <input
            className="field__input"
            id="empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            value={values.empresa}
            onChange={(event) => update('empresa', event.target.value)}
          />
        </div>

        <div
          className="field field--problema"
          data-invalid={Boolean(errors.problema)}
        >
          <label className="label field__label" htmlFor="problema">
            O que mais trava seu dia hoje?
          </label>
          <textarea
            className="field__input field__textarea"
            id="problema"
            name="problema"
            rows={5}
            value={values.problema}
            onChange={(event) => update('problema', event.target.value)}
            aria-invalid={Boolean(errors.problema)}
            aria-describedby={describedBy('problema')}
          />
          {errors.problema ? (
            <p className="field__error" id="problema-erro">
              {errors.problema}
            </p>
          ) : null}
        </div>

        <div
          className="field field--retorno"
          data-invalid={Boolean(errors.retorno)}
        >
          <label className="label field__label" htmlFor="retorno">
            E-mail ou telefone para retorno
          </label>
          <input
            className="field__input"
            id="retorno"
            name="retorno"
            type="text"
            inputMode="email"
            autoComplete="email"
            value={values.retorno}
            onChange={(event) => update('retorno', event.target.value)}
            aria-invalid={Boolean(errors.retorno)}
            aria-describedby={describedBy('retorno')}
          />
          {errors.retorno ? (
            <p className="field__error" id="retorno-erro">
              {errors.retorno}
            </p>
          ) : null}
        </div>

        <div className="form__action">
          <button className="cta-solid" type="submit" disabled={sending}>
            {sending ? 'Enviando…' : 'Enviar'}
            <span className="cta-solid__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Só declara envio concluído com resposta 2xx do endpoint. */}
      <div className="form__status" id="form-retorno" aria-live="polite">
        {result?.status === 'sent' ? (
          <p className="form__notice form__notice--ok">
            Mensagem enviada. Respondemos no contato que você deixou.
          </p>
        ) : null}

        {result?.status === 'not-configured' ? (
          <p className="form__notice">
            O envio automático ainda não está ativo neste site. Seus dados não
            saíram daqui — abra a mensagem já preenchida no seu e-mail ou
            escreva para{' '}
            <a className="form__mail" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            .{' '}
            <a className="form__open" href={buildMailtoHref(values)}>
              Abrir no meu e-mail
              <span aria-hidden="true"> →</span>
            </a>
          </p>
        ) : null}

        {result?.status === 'error' ? (
          <p className="form__notice form__notice--error">{result.message}</p>
        ) : null}
      </div>
    </form>
  )
}
