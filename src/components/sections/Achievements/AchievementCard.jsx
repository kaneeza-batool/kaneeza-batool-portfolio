import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import { cn } from '@utils/helpers'
import { usePrefersReducedMotion } from '@hooks'
import { CATEGORY_COLORS, STATUS_META } from '@data/achievements'
import { ACHIEVEMENT_ICON_MAP } from './achievementIcons'

function AchievementCard({ achievement }) {
  const reduced = usePrefersReducedMotion()
  const catColor = CATEGORY_COLORS[achievement.category] ?? CATEGORY_COLORS.program
  const statusMeta = STATUS_META[achievement.status] ?? STATUS_META.completed
  const IconComponent = ACHIEVEMENT_ICON_MAP[achievement.icon]

  const cardVariants = {
    rest: {
      y: 0,
      boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      borderColor: 'rgba(255,255,255,0.08)',
    },
    hover: {
      y: reduced ? 0 : -6,
      boxShadow: reduced
        ? '0 2px 20px rgba(0,0,0,0.3)'
        : `0 16px 48px rgba(0,0,0,0.5), 0 0 28px rgba(${catColor.rgb}, 0.1)`,
      borderColor: `rgba(${catColor.rgb}, 0.32)`,
    },
  }

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col h-full rounded-2xl p-7 border card-highlight"
      style={{
        background: 'rgba(13, 31, 67, 0.78)',
        backdropFilter: 'blur(14px)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
      role="article"
      aria-label={`${achievement.title} — ${achievement.issuer}`}
    >
      {/* Top row: icon + year */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `rgba(${catColor.rgb}, 0.12)`,
            border: `1px solid rgba(${catColor.rgb}, 0.22)`,
          }}
          aria-hidden="true"
        >
          {IconComponent && (
            <IconComponent
              style={{ width: 22, height: 22, color: catColor.hex }}
              aria-hidden="true"
            />
          )}
        </div>
        <span
          className="text-xs font-mono flex-shrink-0 mt-0.5"
          style={{ color: 'var(--color-muted)' }}
        >
          {achievement.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-heading font-bold text-white mb-1 leading-snug">
        {achievement.title}
      </h3>

      {/* Issuer */}
      <p
        className="text-xs font-body font-medium mb-3"
        style={{ color: catColor.hex, opacity: 0.82 }}
      >
        {achievement.issuer}
      </p>

      {/* Description */}
      <p
        className="text-xs font-body leading-relaxed flex-1 mb-5"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {achievement.description}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2 flex-wrap mt-auto">
        {/* Category */}
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-pill text-xs font-body font-medium"
          style={{
            background: `rgba(${catColor.rgb}, 0.1)`,
            border: `1px solid rgba(${catColor.rgb}, 0.22)`,
            color: catColor.hex,
          }}
        >
          {catColor.label}
        </span>

        {/* Status */}
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-pill text-xs font-body"
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

        {/* Optional credential link */}
        {achievement.credentialUrl && (
          <a
            href={achievement.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View credential for ${achievement.title}`}
            className={cn(
              'ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-body',
              'transition-colors duration-200 border',
              'text-text-secondary border-[rgba(255,255,255,0.1)] hover:text-white hover:border-white/20 hover:bg-white/5'
            )}
          >
            <FiExternalLink className="w-3 h-3" aria-hidden="true" />
            Credential
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default AchievementCard
