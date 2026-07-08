import { FaRegCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa'
import { cn } from '@utils/helpers'
import { Badge } from '@components/common'

const TYPE_BADGE_VARIANTS = {
  training:  'primary',
  community: 'secondary',
  mentorship:'success',
  leadership:'warning',
  programs:  'outline',
}

const LOGO_COLORS = {
  blue:   'from-accent-blue to-accent-purple',
  purple: 'from-accent-purple to-accent-blue',
  green:  'from-success to-accent-blue',
  amber:  'from-warning to-accent-purple',
  red:    'from-error to-accent-purple',
}

function ExperienceCard({ exp }) {
  const badgeVariant = TYPE_BADGE_VARIANTS[exp.type] ?? 'outline'
  const logoGradient = LOGO_COLORS[exp.logoColor] ?? LOGO_COLORS.blue

  return (
    <article
      className={cn(
        'glass rounded-2xl p-7 h-full',
        'transition-all duration-300',
        'hover:border-accent-blue/25 hover:shadow-[0_20px_56px_rgba(0,0,0,0.45),_0_0_28px_rgba(46,107,255,0.08)]',
        'card-highlight',
        'group'
      )}
      aria-label={`${exp.organization} — ${exp.role}`}
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-start gap-4 mb-6">
        {/* Logo placeholder */}
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-xl',
            'bg-gradient-to-br',
            logoGradient,
            'flex items-center justify-center',
            'shadow-md group-hover:shadow-glow-blue transition-shadow duration-300'
          )}
          aria-hidden="true"
        >
          <span className="text-[10px] font-mono font-bold text-white tracking-tight">
            {exp.logoPlaceholder}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-white text-base leading-snug mb-1">
            {exp.organization}
          </h3>
          <p
            className="text-sm font-body font-medium"
            style={{ color: 'var(--color-accent-blue)' }}
          >
            {exp.role}
          </p>
        </div>

        <Badge variant={badgeVariant} className="flex-shrink-0 capitalize self-start">
          {exp.type}
        </Badge>
      </div>

      {/* ── Meta ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
        <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
          <FaRegCalendarAlt className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          {exp.duration}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
          <FaMapMarkerAlt className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          {exp.location}
        </span>
      </div>

      {/* ── Description ──────────────────────────────── */}
      <p className="text-sm font-body leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        {exp.description}
      </p>

      {/* ── Technologies ─────────────────────────────── */}
      {exp.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5" aria-label="Technologies used">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className={cn(
                'px-2.5 py-0.5 text-xs font-mono rounded-md',
                'bg-surface border border-accent-blue/20',
                'transition-colors duration-200 group-hover:border-accent-blue/40'
              )}
              style={{ color: 'var(--color-accent-blue)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* ── Achievements ─────────────────────────────── */}
      <ul className="space-y-2" aria-label="Achievements">
        {exp.achievements.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <FaCheckCircle
              className="w-3 h-3 flex-shrink-0"
              style={{ color: 'var(--color-accent-blue)', opacity: 0.7 }}
              aria-hidden="true"
            />
            <span className="text-xs font-body" style={{ color: 'var(--color-text-secondary)' }}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* ── External link ────────────────────────────── */}
      {exp.website && (
        <a
          href={exp.website}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'mt-4 inline-flex items-center gap-1.5',
            'text-xs font-body font-medium',
            'transition-colors duration-200',
            'hover:text-white focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:rounded-sm'
          )}
          style={{ color: 'var(--color-accent-blue)' }}
          aria-label={`Visit ${exp.organization} website`}
        >
          Visit website
          <FaExternalLinkAlt className="w-2.5 h-2.5" aria-hidden="true" />
        </a>
      )}
    </article>
  )
}

export default ExperienceCard
