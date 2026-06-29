import { useEffect, useRef, useState } from 'react'

export function useCountUp(end, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    if (!start) return

    const startTime = performance.now()

    const easeOutQuad = (t) => t * (2 - t)

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuad(progress)
      setCount(Math.round(eased * end))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration, start])

  return count
}
