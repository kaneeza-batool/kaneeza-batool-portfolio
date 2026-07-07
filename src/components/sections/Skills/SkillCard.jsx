import { memo } from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { Badge, GlassCard } from '@components/common'
import { isTouchDevice } from '@utils/helpers'
import { viewportConfig } from '@utils/motion'

function SkillCard({ skill }) {
  const { name, icon: Icon, level, description, status, statusVariant, color } = skill
  const noTilt = isTouchDevice()

  const iconBg = `${color}18`
  const iconColor = color

  return (
    <Tilt
      tiltMaxAngleX={noTilt ? 0 : 7}
      tiltMaxAngleY={noTilt ? 0 : 7}
      tiltEnable={!noTilt}
      glareEnable={!noTilt}
      glareMaxOpacity={0.06}
      glareBorderRadius="16px"
      scale={noTilt ? 1 : 1.025}
      transitionSpeed={450}
      className="h-full"
    >
      <GlassCard
        hover={false}
        padding="md"
        className={[
          'h-full flex flex-col gap-4',
          'transition-all duration-300',
          'hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]',
        ].join(' ')}
        style={{
          '--hover-glow': `${color}22`,
        }}
      >
        {/* ── Icon ── */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300"
          style={{ background: iconBg }}
          aria-hidden="true"
        >
          <Icon size={24} style={{ color: iconColor }} />
        </div>

        {/* ── Name + Status ── */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-semibold text-white text-base leading-tight">
            {name}
          </h3>
          <Badge variant={statusVariant} className="flex-shrink-0 mt-0.5">
            {status}
          </Badge>
        </div>

        {/* ── Description ── */}
        <p
          className="text-xs leading-relaxed flex-grow"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {description}
        </p>

        {/* ── Progress ── */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-mono"
              style={{ color: 'var(--color-muted)' }}
            >
              Proficiency
            </span>
            <span
              className="text-xs font-mono font-semibold"
              style={{ color: 'var(--color-accent-blue)' }}
            >
              {level}%
            </span>
          </div>

          {/* Track */}
          <div
            className="h-[3px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {/* Fill — animates when scrolled into view */}
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))`,
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: level / 100 }}
              viewport={{ ...viewportConfig, margin: '-40px' }}
              transition={{
                duration: 1.1,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.15,
              }}
            />
          </div>
        </div>
      </GlassCard>
    </Tilt>
  )
}

export default memo(SkillCard)
