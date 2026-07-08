import { motion } from 'framer-motion'
import { GlassCard } from '@components/common'
import { fadeUp, viewportConfig } from '@utils/motion'
import { usePrefersReducedMotion } from '@hooks'
import { LEARNING_CATEGORY_CONFIG } from '@data/currentFocus'

function FocusLearningCard({ item, index }) {
  const reduced = usePrefersReducedMotion()
  const cat = LEARNING_CATEGORY_CONFIG[item.category] ?? LEARNING_CATEGORY_CONFIG.Backend

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.09 }}
      className="h-full"
    >
      <GlassCard hover padding="md" className="flex flex-col gap-3.5 h-full">
        {/* Title + category */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-small font-heading font-semibold text-white leading-snug">
            {item.title}
          </p>
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full border shrink-0 ${cat.badgeClass}`}>
            {item.category}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Progress</span>
            <span className="text-xs font-mono font-medium" style={{ color: cat.color }}>
              {item.progress}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: cat.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${item.progress}%` }}
              viewport={{ once: true }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 1, ease: 'easeOut', delay: 0.25 + index * 0.09 }
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-muted">Est. done</span>
          <span className="text-xs font-mono text-text-secondary">{item.estimatedCompletion}</span>
        </div>

        {/* Resource tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.resources.map((r) => (
            <span
              key={r}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/4 border border-white/8 text-muted"
            >
              {r}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default FocusLearningCard
