import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { ACHIEVEMENT_THEMES } from '@data/achievements'
import { ACHIEVEMENT_ICON_MAP } from './achievementIcons'

function ThemeCard({ theme }) {
  const IconComponent = ACHIEVEMENT_ICON_MAP[theme.icon]

  return (
    <motion.div
      whileHover={{ y: -5, borderColor: 'rgba(46,107,255,0.3)' }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-2xl p-6 border"
      style={{
        background: 'rgba(13, 31, 67, 0.65)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: 'rgba(46,107,255,0.12)',
          border: '1px solid rgba(46,107,255,0.2)',
        }}
        aria-hidden="true"
      >
        {IconComponent && (
          <IconComponent
            style={{ width: 20, height: 20, color: 'var(--color-accent-blue)' }}
            aria-hidden="true"
          />
        )}
      </div>

      <h4 className="text-sm font-heading font-bold text-white mb-2">
        {theme.title}
      </h4>
      <p
        className="text-xs font-body leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {theme.description}
      </p>
    </motion.div>
  )
}

function AchievementMeaning() {
  return (
    <section
      aria-label="What these milestones mean"
      className="mt-20 pt-16"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="text-center mb-10"
      >
        <span
          className="text-xs font-mono font-medium tracking-widest uppercase mb-3 block"
          style={{ color: 'var(--color-accent-blue)' }}
        >
          Reflection
        </span>
        <h3
          className="font-heading font-bold text-white mb-3"
          style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)' }}
        >
          What These Milestones Mean
        </h3>
        <p
          className="text-sm font-body max-w-xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          More than a list of programs and certificates — these milestones tell a story of how I
          learn, build, and grow.
        </p>
      </motion.div>

      {/* Theme cards */}
      <motion.div
        variants={staggerContainer(0.08, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
      >
        {ACHIEVEMENT_THEMES.map((theme) => (
          <motion.div key={theme.id} variants={fadeUp}>
            <ThemeCard theme={theme} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default AchievementMeaning
