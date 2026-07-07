import { useEffect } from 'react'
import { SITE } from '@constants'

function SEO({
  title,
  description = SITE.description,
  keywords = SITE.keywords,
  ogImage = '/og-image.png',
  canonical,
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — Portfolio`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    setMeta('description', description)
    setMeta('keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords)
    if (noIndex) setMeta('robots', 'noindex, nofollow')

    // Open Graph
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:image', ogImage, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', SITE.name, 'property')
    if (canonical || SITE.url) {
      setMeta('og:url', canonical ?? SITE.url, 'property')
    }

    // Twitter
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)

    // Canonical
    if (canonical) setLink('canonical', canonical)
  }, [fullTitle, description, keywords, ogImage, canonical, noIndex])

  return null
}

export default SEO
