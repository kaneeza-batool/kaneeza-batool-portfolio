import { useState, useEffect } from 'react'

export function useScrollSpy(ids = [], options = {}) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const { rootMargin = '-20% 0% -70% 0%' } = options

    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin }
      )

      observer.observe(el)
      return observer
    })

    return () => {
      observers.forEach((obs, i) => {
        const el = document.getElementById(ids[i])
        if (obs && el) obs.unobserve(el)
      })
    }
  }, [ids, options])

  return activeId
}
