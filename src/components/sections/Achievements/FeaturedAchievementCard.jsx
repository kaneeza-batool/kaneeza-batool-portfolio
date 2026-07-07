import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks'
import { CATEGORY_COLORS, STATUS_META } from '@data/achievements'
import { ACHIEVEMENT_ICON_MAP } from './achievementIcons'

function FeaturedAchievementCard({ achievement }) {
  const reduced = usePrefersReducedMotion()
  const catColor = CATEGORY_COLORS[achievement.category] ?? CATEGORY_COLORS.award
  const statusMeta = STATUS_META[achievement.status] ?? STATUS_META.awarded
  const IconComponent = ACHIEVEMENT_ICON_MAP[achievement.icon]

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-3xl overflow-hidden mb-12"
      style={{
        background: 'linear-gradient(135deg, #0D1F43 0%, #102A59 60%, #0D1F43 100%)',
        border: '1px solid rgba(245,158,11,0.22)',
        boxShadow: '0 4px 60px rgba(0,0,0,0.4)',
      }}
      role="article"
      aria-label={`Featured achievement: ${achievement.title} — ${achievement.issuer}`}
    >
      {/* Pulsing ambient glow */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 0px rgba(245,158,11,0)',
              '0 0 50px rgba(245,158,11,0.12)',
              '0 0 0px rgba(245,158,11,0)',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Corner ribbon */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute top-5 -right-8 w-36 py-1.5 text-center text-xs font-mono font-bold tracking-widest uppercase rotate-45"
          style={{
            background: 'linear-gradient(90deg, #D97706, #F59E0B, #FCD34D)',
            color: '#050E20',
          }}
        >
          AWARD
        </div>
      </div>

      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(245,158,11,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Left radial accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 5% 50%, rgba(245,158,11,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
        {/* Icon */}
        <div
          className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.06))',
            border: '1px solid rgba(245,158,11,0.32)',
            boxShadow: '0 0 28px rgba(245,158,11,0.12)',
          }}
          aria-hidden="true"
        >
          {IconComponent && (
            <IconComponent style={{ width: 40, height: 40, color: '#F59E0B' }} aria-hidden="true" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span
              className="text-xs font-mono font-bold tracking-widest uppercase"
              style={{ color: '#F59E0B' }}
            >
              {achievement.highlight}
            </span>

            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-xs font-body font-medium"
              style={{
                background: statusMeta.bg,
                border: `1px solid ${statusMeta.border}`,
                color: statusMeta.dot,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: statusMeta.dot }}
                aria-hidden="true"
              />
              {statusMeta.label}
            </span>

            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-body font-medium"
              style={{
                background: `rgba(${catColor.rgb}, 0.12)`,
                border: `1px solid rgba(${catColor.rgb}, 0.28)`,
                color: catColor.hex,
              }}
            >
              {catColor.label}
            </span>
          </div>

          <h3
            className="font-heading font-bold text-white mb-1 leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
          >
            {achievement.title}
          </h3>

          <p
            className="text-base font-body font-medium mb-4"
            style={{ color: '#F59E0B', opacity: 0.82 }}
          >
            {achievement.issuer}
          </p>

          <p
            className="text-sm font-body leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {achievement.description}
          </p>
        </div>

        {/* Year badge — hidden on mobile, shown on md+ */}
        <div className="hidden md:flex flex-shrink-0 flex-col items-center gap-2">
          <span
            className="px-5 py-2.5 rounded-xl font-mono font-bold text-xl"
            style={{
              color: '#F59E0B',
              background: 'rgba(245,158,11,0.10)',
              border: '1px solid rgba(245,158,11,0.22)',
            }}
          >
            {achievement.year}
          </span>
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--color-muted)' }}
          >
            Year
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default FeaturedAchievementCard
