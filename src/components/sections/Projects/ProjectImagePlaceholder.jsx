import { useMemo } from 'react'
import { getInitials } from '@utils/helpers'
import { ACCENT_COLORS } from '@data/projects'

function ProjectImagePlaceholder({ title, accentColor }) {
  const color = ACCENT_COLORS[accentColor] ?? ACCENT_COLORS.blue
  const initials = useMemo(() => getInitials(title), [title])

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse at 25% 25%, rgba(${color.rgb}, 0.18) 0%, transparent 60%),
          radial-gradient(ellipse at 75% 75%, rgba(${color.rgb}, 0.10) 0%, transparent 50%),
          #050E20
        `,
      }}
    >
      {/* Decorative orbs */}
      <div
        aria-hidden="true"
        className="absolute top-[18%] left-[12%] w-32 h-32 rounded-full blur-3xl"
        style={{ background: `rgba(${color.rgb}, 0.14)` }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[15%] right-[12%] w-20 h-20 rounded-full blur-2xl"
        style={{ background: `rgba(${color.rgb}, 0.10)` }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(${color.rgb}, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${color.rgb}, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Initials */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-heading font-bold select-none"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            color: `rgba(${color.rgb}, 0.32)`,
            textShadow: `0 0 60px rgba(${color.rgb}, 0.5), 0 0 120px rgba(${color.rgb}, 0.2)`,
            letterSpacing: '-0.02em',
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
