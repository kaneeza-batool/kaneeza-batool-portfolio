import { useScroll, useSpring, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reducedMotion = usePrefersReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reducedMotion ? 1000 : 100,
    damping: reducedMotion ? 200 : 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[301] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)',
      }}
      aria-hidden="true"
    />
  )
}

export default ScrollProgress
