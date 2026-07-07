import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { STATUS_CONFIG } from '@data/roadmap'

function RoadmapProgressBar({ status }) {
  const cfg = STATUS_CONFIG[status]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const reduced = usePrefersReducedMotion()

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium" style={{ color: cfg.color }}>
          Progress
        </span>
        <span className="text-xs font-mono font-semibold" style={{ color: cfg.color }}>
          {cfg.progress}%
        </span>
      </div>

      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
      >
        {/* Filled portion */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: cfg.color }}
          initial={{ width: '0%' }}
          animate={{ width: inView ? `${cfg.progress}%` : '0%' }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }
          }
        />

        {/* Shimmer sweep for current stage */}
        {status === 'current' && !reduced && (
          <motion.div
            className="absolute top-0 bottom-0 w-10 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
            }}
            initial={{ left: '-15%' }}
            animate={inView ? { left: '115%' } : { left: '-15%' }}
            transition={
              inView
                ? {
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: 'linear',
                    delay: 1.6,
                  }
                : {}
            }
          />
        )}
      </div>
    </div>
  )
}

export default RoadmapProgressBar
