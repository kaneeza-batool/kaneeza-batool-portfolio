import { motion } from 'framer-motion'
import { GlassCard } from '@components/common'
import { fadeUp, viewportConfig } from '@utils/motion'
import { usePrefersReducedMotion } from '@hooks'
import { READING_TYPE_CONFIG } from '@data/currentFocus'

function FocusReadingCard({ item, index }) {
  const reduced = usePrefersReducedMotion()
  const config = READING_TYPE_CONFIG[item.type] ?? READING_TYPE_CONFIG.Book
  const Icon = item.icon

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.09 }}
      className="h-full"
    >
      <GlassCard hover padding="sm" className="flex flex-col gap-3 h-full">
        {/* Type badge + icon */}
        <div className="flex items-center gap-2">
          <Icon size={14} style={{ color: config.color }} aria-hidden="true" />
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${config.badgeClass}`}>
            {item.type}
          </span>
        </div>

        {/* Title + author */}
        <div className="flex-1">
          <p className="text-xs font-heading font-semibold text-white leading-snug">
            {item.title}
          </p>
          {item.author && (
            <p className="text-[10px] text-muted mt-0.5">by {item.author}</p>
          )}
        </div>

        {/* Category + progress */}
        <div className="flex flex-col gap-1.5 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted">{item.category}</span>
            <span className="text-[10px] font-mono" style={{ color: config.color }}>
              {item.progress}%
            </span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: config.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${item.progress}%` }}
              viewport={{ once: true }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.9, ease: 'easeOut', delay: 0.2 + index * 0.09 }
              }
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default FocusReadingCard
