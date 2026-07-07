import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => {
    const DURATION = 1100
    const start = performance.now()
    let rafId

    const tick = (now) => {
      const elapsed = now - start
      const p = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(p)

      if (p < 100) {
        rafId = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(() => onCompleteRef.current?.(), 520)
        }, 260)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050E20]"
          role="status"
          aria-label="Loading portfolio"
          aria-busy="true"
        >
          {/* Soft radial glow behind monogram */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 700px 500px at 50% 50%, rgba(46,107,255,0.07) 0%, transparent 70%)',
            }}
          />

          {/* KB Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="relative mb-10 select-none"
            aria-hidden="true"
          >
            <div className="flex items-end gap-[3px]">
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 800,
                  fontSize: '5rem',
                  lineHeight: 1,
                  color: '#ffffff',
                }}
              >
                K
              </span>
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 800,
                  fontSize: '5rem',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #2E6BFF 0%, #6A5CFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                B
              </span>
            </div>

            {/* Accent underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.48, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-1.5 h-[2px] rounded-full origin-left"
              style={{ background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)' }}
            />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.3 }}
            className="w-36 h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)',
                transition: 'width 0.06s linear',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
