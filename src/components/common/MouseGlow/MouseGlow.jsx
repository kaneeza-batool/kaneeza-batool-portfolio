import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

function MouseGlow({ color = 'rgba(46,107,255,0.08)', size = 600 }) {
  const reducedMotion = usePrefersReducedMotion()
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    if (reducedMotion) return

    const move = (e) => {
      mouseX.set(e.clientX - size / 2)
      mouseY.set(e.clientY - size / 2)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [reducedMotion, mouseX, mouseY, size])

  if (reducedMotion) return null

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-cursor overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        }}
        className="absolute rounded-full"
      />
    </motion.div>
  )
}

export default MouseGlow
