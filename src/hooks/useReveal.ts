import { useEffect } from 'react'

/**
 * Revela elementos marcados com `data-reveal` quando entram na viewport.
 * Um único observer para a página inteira — sem biblioteca de animação.
 *
 * @param key muda a cada rota, para reobservar o conteúdo recém-montado.
 */
export function useReveal(key?: string): void {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal=""]')
    if (targets.length === 0) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-reveal', 'in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-reveal', 'in')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    )

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [key])
}
