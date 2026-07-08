import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'
import { fadeLeft, fadeRight, viewportConfig } from '@utils/motion'
import { usePrefersReducedMotion } from '@hooks'
import ExperienceCard from './ExperienceCard'

function TimelineNode({ index }) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-5 h-5"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.12,
        duration: 0.45,
        ease: [0.175, 0.885, 0.32, 1.275],
      }}
    >
      {/* Outer pulse ring */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{ background: 'rgba(46, 107, 255, 0.25)' }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
      />
      {/* Inner dot */}
      <span
        className="w-3.5 h-3.5 rounded-full flex-shrink-0 z-10"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-purple))',
          boxShadow: '0 0 12px rgba(46, 107, 255, 0.6)',
        }}
      />
    </motion.div>
  )
}

function ExperienceRow({ exp, index, prefersReducedMotion }) {
  const isLeft = index % 2 === 0
  const cardVariant = prefersReducedMotion
    ? {}
    : isLeft
    ? fadeLeft
    : fadeRight

  return (
    <div className="relative flex items-start mb-14 md:mb-20 last:mb-0">
      {/* ── Timeline node: left-6 mobile, center desktop ─── */}
      <div
        className="absolute top-5 z-10 left-6 md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      >
        <TimelineNode index={index} />
      </div>

      {/* ── Card ─────────────────────────────────────────── */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className={cn(
          // Mobile: indent to clear the left-side node
          'pl-14 w-full',
          // Desktop: alternating halves
          'md:pl-0 md:w-[45%]',
          isLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'
        )}
      >
        <ExperienceCard exp={exp} />
      </motion.div>
    </div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="py-20 text-center"
    >
      <p
        className="text-sm font-body"
        style={{ color: 'var(--color-muted)' }}
      >
        No experiences in this category yet.
      </p>
    </motion.div>
  )
}

function ExperienceTimeline({ experiences }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="relative">
      {/* ── Vertical timeline line ───────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute top-5 bottom-5 w-px left-6 md:left-1/2 md:-translate-x-px"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(46,107,255,0.7) 15%, rgba(106,92,255,0.6) 85%, transparent 100%)',
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* ── Experience rows ──────────────────────────────── */}
      <AnimatePresence mode="wait">
        {experiences.length === 0 ? (
          <EmptyState key="empty" />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {experiences.map((exp, i) => (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                index={i}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ExperienceTimeline
