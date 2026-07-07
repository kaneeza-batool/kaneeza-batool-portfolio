import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { cn } from '@utils/helpers'
import { TIMELINE } from '@data/about'

function TimelineNode({ stage, title, description, active, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="relative flex gap-5 pb-9 last:pb-0"
    >
      {/* Dot column */}
      <div className="relative z-10 flex-shrink-0 mt-1">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: index * 0.08,
            ease: [0.175, 0.885, 0.32, 1.275],
          }}
          className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center',
            active
              ? 'bg-accent-blue border-accent-blue'
              : 'bg-surface border-border'
          )}
          style={active ? { boxShadow: '0 0 10px rgba(46,107,255,0.5)' } : undefined}
          aria-hidden="true"
        >
          {active && (
            <div className="w-[6px] h-[6px] rounded-full bg-white/80" />
          )}
        </motion.div>

        {/* Pulse ring — active nodes only */}
        {active && isInView && (
          <motion.div
            className="absolute inset-0 rounded-full border border-accent-blue/40"
            animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 pt-0.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              'text-xs font-mono font-medium tracking-wider px-2 py-0.5 rounded-md',
              active
                ? 'text-accent-blue bg-accent-blue/10 border border-accent-blue/20'
                : 'text-muted bg-surface/80 border border-border'
            )}
          >
            {stage}
          </span>
          {!active && (
            <span className="text-xs text-muted font-mono italic">upcoming</span>
          )}
        </div>

        <h4 className="font-heading font-semibold text-white leading-snug mt-1" style={{ fontSize: '0.9375rem' }}>
          {title}
        </h4>

        <p className="text-text-secondary leading-relaxed" style={{ fontSize: '0.8125rem' }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function AboutTimeline() {
  const containerRef = useRef(null)
  const isContainerInView = useInView(containerRef, { once: true, margin: '-80px' })

  return (
    <div>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6"
      >
        <span
          className="h-px w-6 shrink-0"
          style={{ background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)' }}
          aria-hidden="true"
        />
        <span className="font-mono text-xs text-accent-blue tracking-widest uppercase font-medium">
          Learning Journey
        </span>
      </motion.div>

      {/* Timeline container */}
      <div ref={containerRef} className="relative">
        {/* Animated vertical connector line */}
        <motion.div
          className="absolute left-[9px] top-[10px] w-[2px] origin-top pointer-events-none"
          style={{
            height: 'calc(100% - 20px)',
            background:
              'linear-gradient(to bottom, rgba(46,107,255,0.45) 0%, rgba(106,92,255,0.25) 70%, transparent 100%)',
          }}
          initial={{ scaleY: 0 }}
          animate={isContainerInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          aria-hidden="true"
        />

        {/* Nodes */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {TIMELINE.map((item, i) => (
            <TimelineNode key={i} {...item} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AboutTimeline
