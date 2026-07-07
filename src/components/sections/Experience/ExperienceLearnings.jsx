import { motion } from 'framer-motion'
import { TbBrain, TbSparkles } from 'react-icons/tb'
import { FaUsers, FaCode } from 'react-icons/fa'
import { cn } from '@utils/helpers'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import { EXPERIENCE_LEARNINGS } from '@data/experience'

const ICONS = {
  brain:  TbBrain,
  team:   FaUsers,
  code:   FaCode,
  growth: TbSparkles,
}

const CARD_ACCENTS = [
  'from-accent-blue/20 to-accent-purple/10 border-accent-blue/20',
  'from-accent-purple/20 to-accent-blue/10 border-accent-purple/20',
  'from-success/20 to-accent-blue/10 border-success/20',
  'from-warning/15 to-accent-purple/10 border-warning/20',
]

function LearningCard({ item, index }) {
  const Icon = ICONS[item.iconType] ?? TbSparkles
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'relative rounded-2xl p-6',
        'bg-gradient-to-br border',
        accent,
        'glass-sm',
        'transition-all duration-300 hover:scale-[1.02] hover:shadow-card-hover'
      )}
    >
      {/* Icon badge */}
      <div
        className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
        style={{ background: 'rgba(46,107,255,0.12)', border: '1px solid rgba(46,107,255,0.2)' }}
        aria-hidden="true"
      >
        <Icon className="w-5 h-5" style={{ color: 'var(--color-accent-blue)' }} />
      </div>

      <h4 className="font-heading font-semibold text-white text-base mb-2">
        {item.title}
      </h4>
      <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {item.description}
      </p>
    </motion.div>
  )
}

function ExperienceLearnings() {
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
          Key Takeaways
        </p>
        <h3 className="text-subheading font-heading font-bold text-white">
          What These Experiences Taught Me
        </h3>
      </motion.div>

      {/* 4-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {EXPERIENCE_LEARNINGS.map((item, i) => (
          <LearningCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default ExperienceLearnings
