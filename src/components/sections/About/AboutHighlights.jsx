import { motion } from 'framer-motion'
import { GlassCard } from '@components/common'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { HIGHLIGHT_CARDS } from '@data/about'

function HighlightCard({ icon: Icon, title, description }) {
  return (
    <GlassCard hover padding="md" className="flex flex-col gap-3 group h-full">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:border-accent-blue/40"
        style={{
          background: 'rgba(46,107,255,0.08)',
          border: '1px solid rgba(46,107,255,0.2)',
        }}
      >
        <Icon size={18} className="text-accent-blue" aria-hidden="true" />
      </div>

      <h4 className="font-heading font-semibold text-white leading-snug" style={{ fontSize: '0.9rem' }}>
        {title}
      </h4>

      <p className="text-text-secondary leading-relaxed" style={{ fontSize: '0.8125rem' }}>
        {description}
      </p>
    </GlassCard>
  )
}

function AboutHighlights() {
  return (
    <div>
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewportConfig}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-4"
      >
        <span
          className="h-px w-6 shrink-0"
          style={{ background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)' }}
          aria-hidden="true"
        />
        <span className="font-mono text-xs text-accent-blue tracking-widest uppercase font-medium">
          What Drives Me
        </span>
      </motion.div>

      {/* 2×2 grid */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-2 gap-3"
      >
        {HIGHLIGHT_CARDS.map((card, i) => (
          <motion.div key={i} variants={fadeUp}>
            <HighlightCard {...card} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default AboutHighlights
