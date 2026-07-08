import { useMemo } from 'react'
import { getInitials } from '@utils/helpers'
import { ACCENT_COLORS } from '@data/projects'

function ProjectImagePlaceholder({ title, accentColor }) {
  const color = ACCENT_COLORS[accentColor] ?? ACCENT_COLORS.blue
  const initials = useMemo(() => getInitials(title), [title])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(${color.rgb}, 0.22) 0%, transparent 55%),
          radial-gradient(ellipse at 80% 80%, rgba(${color.rgb}, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 15%, rgba(${color.rgb}, 0.08) 0%, transparent 40%),
          #050E20
        `,
      }}
    >
      {/* Large ambient blob — top left */}
      <div
        aria-hidden="true"
        className="absolute -top-8 -left-8 w-48 h-48 rounded-full blur-3xl"
        style={{ background: `rgba(${color.rgb}, 0.18)` }}
      />
      {/* Smaller blob — bottom right */}
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full blur-2xl"
        style={{ background: `rgba(${color.rgb}, 0.12)` }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(${color.rgb}, 0.1) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Abstract ring — large outer */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '140%',
          paddingBottom: '140%',
          border: `1px solid rgba(${color.rgb}, 0.09)`,
        }}
      />
      {/* Abstract ring — mid */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '90%',
          paddingBottom: '90%',
          border: `1px solid rgba(${color.rgb}, 0.13)`,
        }}
      />
      {/* Abstract ring — inner */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '45%',
          paddingBottom: '45%',
          border: `1px solid rgba(${color.rgb}, 0.2)`,
        }}
      />

      {/* Initials centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-heading font-extrabold select-none"
          style={{
            fontSize: 'clamp(2.75rem, 7vw, 4.5rem)',
            color: `rgba(${color.rgb}, 0.38)`,
            textShadow: `0 0 80px rgba(${color.rgb}, 0.6), 0 0 160px rgba(${color.rgb}, 0.25)`,
            letterSpacing: '-0.03em',
          }}
          aria-hidden="true"
        >
          {initials}
        </span>
      </div>
    </div>
  )
}

export default ProjectImagePlaceholder
