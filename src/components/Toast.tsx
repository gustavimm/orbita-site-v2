import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Toast.css'

/* ==========================================================================
   Aviso flutuante de confirmação.

   Vive num portal para o <body>, não na árvore do formulário: o painel de
   contato carrega `data-reveal`, e um ancestral com `transform` quebraria o
   `position: fixed` do aviso.
   ========================================================================== */

/** Espelha `--toast-duration` no CSS — as duas precisam andar juntas. */
const DURATION = 7000

type ToastProps = {
  open: boolean
  onClose: () => void
  title: string
  children?: ReactNode
}

export function Toast({ open, onClose, title, children }: ToastProps) {
  useEffect(() => {
    if (!open) return

    const timer = window.setTimeout(onClose, DURATION)

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', aoTeclar)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [open, onClose])

  // A região com `aria-live` fica sempre no DOM, mesmo vazia: um live region
  // que nasce junto com o conteúdo costuma não ser anunciado. Sem filhos ela
  // não ocupa nada e não intercepta cliques.
  return createPortal(
    <div className="toast-region" role="status" aria-live="polite">
      {open ? (
        <div className="toast">
          <span className="toast__mark" aria-hidden="true" />

          <div className="toast__body">
            <p className="toast__title">{title}</p>
            {children ? <p className="toast__text">{children}</p> : null}
          </div>

          <button
            className="toast__close"
            type="button"
            onClick={onClose}
            aria-label="Fechar aviso"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      ) : null}
    </div>,
    document.body,
  )
}
