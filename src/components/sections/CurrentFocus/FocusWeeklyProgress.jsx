import { motion } from 'framer-motion'
import { GlassCard } from '@components/common'
import { fadeUp, viewportConfig } from '@utils/motion'
import { usePrefersReducedMotion } from '@hooks'
import { WEEKLY_PROGRESS } from '@data/currentFocus'

function FocusWeeklyProgress() {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <GlassCard hover={false} padding="lg">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-subheading font-heading font-semibold text-white">
                Weekly Focus
              </h3>
              <p className="text-xs text-muted mt-0.5">
                How I'm splitting my time this week
              </p>
            </div>
            <span className="text-xs font-mono text-text-secondary px-3 py-1.5 rounded-full bg-white/4 border border-white/10">
              This Week
            </span>
          </div>

          {/* Progress bars */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {WEEKLY_PROGRESS.map((item, i) => (
              <div key={item.id} className="flex flex-col gap-2" aria-label={`${item.label}: ${item.value}%`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-medium text-text-secondary">
                    {item.label}
                  </span>
                  <span className="text-xs font-mono font-semibold" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 1.1, ease: 'easeOut', delay: 0.2 + i * 0.08 }
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default FocusWeeklyProgress
