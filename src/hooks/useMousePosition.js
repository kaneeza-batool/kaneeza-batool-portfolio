import { useState, useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useMousePosition() {
  const reducedMotion = usePrefersReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion) return

    const update = (e) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', update)
    return () => window.removeEventListener('mousemove', update)
  }, [reducedMotion])

  return position
}
