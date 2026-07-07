let _lenis = null

export const getLenis = () => _lenis
export const setLenis = (instance) => { _lenis = instance }

export function scrollTo(target, options = {}) {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target, options)
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) {
    const offset = options.offset || 0
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
