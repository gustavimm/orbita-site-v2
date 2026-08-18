import { useEffect } from 'react'
import { SITE_URL } from '../content/site'

const SITE_NAME = 'Órbita'

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content)
}

/** Define title, description, canonical e Open Graph da rota atual. */
export function usePageMeta(title: string, description: string): void {
  useEffect(() => {
    // Um título que já começa pela marca é usado como veio.
    const fullTitle = title.startsWith(SITE_NAME) ? title : `${title} — ${SITE_NAME}`
    const url = `${SITE_URL}${window.location.pathname}`

    document.title = fullTitle
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', fullTitle)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', url)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [title, description])
}
