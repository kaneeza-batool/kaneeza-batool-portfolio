import { motion } from 'framer-motion'
import { TbPuzzle, TbPalette, TbStack2, TbRocket } from 'react-icons/tb'
import { cn } from '@utils/helpers'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import { PROJECT_LEARNINGS } from '@data/projects'

const ICONS = {
  puzzle: TbPuzzle,
  design: TbPalette,
  layers: TbStack2,
  rocket: TbRocket,
}

const CARD_ACCENTS = [
  { from: 'rgba(46,107,255,0.18)',  to: 'rgba(106,92,255,0.08)',  border: 'rgba(46,107,255,0.2)',  iconColor: '#2E6BFF', iconBg: 'rgba(46,107,255,0.12)'  },
  { from: 'rgba(106,92,255,0.18)', to: 'rgba(46,107,255,0.08)',  border: 'rgba(106,92,255,0.2)', iconColor: '#6A5CFF', iconBg: 'rgba(106,92,255,0.12)' },
  { from: 'rgba(34,197,94,0.14)',  to: 'rgba(46,107,255,0.06)',  border: 'rgba(34,197,94,0.2)',  iconColor: '#22C55E', iconBg: 'rgba(34,197,94,0.12)'  },
  { from: 'rgba(245,158,11,0.14)', to: 'rgba(106,92,255,0.06)', border: 'rgba(245,158,11,0.2)', iconColor: '#F59E0B', iconBg: 'rgba(245,158,11,0.12)' },
]

function LearningCard({ item, index }) {
  const Icon = ICONS[item.iconType] ?? TbRocket
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]

  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-2xl p-6 border glass-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-card-hover"
      style={{
        background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.to} 100%)`,
        borderColor: accent.border,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
        style={{ background: accent.iconBg, border: `1px solid ${accent.border}` }}
        aria-hidden="true"
      >
        <Icon className="w-5 h-5" style={{ color: accent.iconColor }} />
      </div>

      <h4 className="font-heading font-semibold text-white text-base mb-2">
        {item.title}
      </h4>
      <p
        className="text-sm font-body leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {item.description}
      </p>
    </motion.div>
  )
}

function ProjectLearnings() {
  return (
    <motion.div
      variants={staggerContainer(0.08, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {/* Panel header */}
      <motion.div variants={fadeUp} className="text-center mb-10">
        <p
          className="text-xs font-mono font-medium tracking-widest uppercase mb-3"
          style={{ color: 'var(--color-accent-blue)' }}
        >
          Reflections
        </p>
        <h3 className="text-subheading font-heading font-bold text-white">
          What I've Learned Through Building
        </h3>
      </motion.div>

      {/* 4-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {PROJECT_LEARNINGS.map((item, i) => (
          <LearningCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default ProjectLearnings
