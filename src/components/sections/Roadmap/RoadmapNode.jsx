import { memo } from 'react'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { STATUS_CONFIG } from '@data/roadmap'

function RoadmapNode({ item, small = false }) {
  const cfg = STATUS_CONFIG[item.status]
  const Icon = item.icon
  const reduced = usePrefersReducedMotion()
  const isCurrent = item.status === 'current'
  const isCompleted = item.status === 'completed'

  const size = small ? 'w-9 h-9' : 'w-11 h-11'
  const iconSize = small ? 'w-4 h-4' : 'w-5 h-5'

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse ring — current only */}
      {isCurrent && !reduced && (
        <>
          <motion.div
            className={`absolute rounded-full ${small ? 'w-14 h-14' : 'w-16 h-16'}`}
            style={{ backgroundColor: cfg.color, opacity: 0 }}
            animate={{ scale: [0.7, 1.4, 0.7], opacity: [0.18, 0, 0.18] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className={`absolute rounded-full ${small ? 'w-12 h-12' : 'w-14 h-14'}`}
            style={{ backgroundColor: cfg.color, opacity: 0 }}
            animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.12, 0, 0.12] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
        </>
      )}

      {/* Node circle */}
      <div
        className={`relative z-10 flex items-center justify-center rounded-full ${size} transition-all duration-300`}
        style={{
          backgroundColor: cfg.bgColor,
          border: `2px solid ${cfg.borderColor}`,
          boxShadow: `0 0 ${isCurrent ? 20 : isCompleted ? 12 : 8}px ${cfg.glowColor}`,
        }}
      >
        {isCompleted ? (
          <FiCheck className={iconSize} style={{ color: cfg.color }} strokeWidth={2.5} />
        ) : (
          <Icon className={iconSize} style={{ color: cfg.color }} />
        )}
      </div>
    </div>
  )
}

export default memo(RoadmapNode)
