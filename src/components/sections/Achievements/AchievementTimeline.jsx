import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ACHIEVEMENT_MILESTONES } from '@data/achievements'

function MilestoneCard({ milestone, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div ref={ref} className="flex items-center flex-shrink-0">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          delay: index * 0.08,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="flex-shrink-0 rounded-xl px-4 py-3 text-center"
        style={{
          minWidth: '136px',
          maxWidth: '152px',
          background: 'rgba(13, 31, 67, 0.85)',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          className="text-xs font-mono font-bold mb-1.5"
          style={{ color: 'var(--color-accent-blue)' }}
        >
          {milestone.year}
        </div>
        <div className="text-xs font-body font-semibold text-white leading-snug mb-1">
          {milestone.label}
        </div>
        <div
          className="text-xs font-body leading-snug"
          style={{ color: 'var(--color-muted)' }}
        >
          {milestone.sub}
        </div>
      </motion.div>

      {/* Connector (not after last) */}
      {!isLast && (
        <motion.div
          className="flex items-center mx-2 flex-shrink-0"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{
            duration: 0.35,
            delay: index * 0.08 + 0.25,
            ease: 'easeOut',
          }}
          style={{ transformOrigin: 'left' }}
          aria-hidden="true"
        >
          <div
            className="h-px w-8"
            style={{
              background:
                'linear-gradient(90deg, rgba(46,107,255,0.55), rgba(106,92,255,0.35))',
            }}
          />
          <span
            style={{
              color: 'rgba(106,92,255,0.55)',
              fontSize: '9px',
              marginLeft: '-1px',
              lineHeight: 1,
            }}
          >
            ▶
          </span>
        </motion.div>
      )}
    </div>
  )
}

function AchievementTimeline() {
  return (
    <section
      aria-label="Achievement journey timeline"
      className="mt-20"
    >
      <p
        className="text-xs font-mono font-medium tracking-widest uppercase mb-7 text-center"
        style={{ color: 'var(--color-muted)' }}
      >
        Journey Milestones
      </p>

      <div
        className="overflow-x-auto pb-4"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(46,107,255,0.25) transparent',
        }}
      >
        <div className="flex items-center px-2 min-w-max mx-auto">
          {ACHIEVEMENT_MILESTONES.map((milestone, i) => (
            <MilestoneCard
              key={milestone.label}
              milestone={milestone}
              index={i}
              isLast={i === ACHIEVEMENT_MILESTONES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AchievementTimeline
