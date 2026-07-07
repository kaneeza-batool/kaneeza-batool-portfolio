import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'
import { scrollTo } from '@utils/lenis'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { cn } from '@utils/helpers'

function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{
            duration: reducedMotion ? 0 : 0.3,
            ease: [0.175, 0.885, 0.32, 1.275],
          }}
          whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: reducedMotion ? 1 : 0.92 }}
          onClick={() => scrollTo(0, { duration: 1.8 })}
          className={cn(
            'fixed bottom-8 right-8 z-[250]',
            'w-11 h-11 rounded-full',
            'glass flex items-center justify-center',
            'cursor-pointer group',
            'focus-visible:outline-2 focus-visible:outline-[#2E6BFF] focus-visible:outline-offset-3',
          )}
          aria-label="Scroll to top"
        >
          <HiArrowUp
            className="w-4 h-4 text-[#A8B2D1] group-hover:text-white transition-colors duration-200"
            aria-hidden="true"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop
