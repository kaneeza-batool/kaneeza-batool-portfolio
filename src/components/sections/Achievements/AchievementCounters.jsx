import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import _CountUp from 'react-countup'
const CountUp = (_CountUp && _CountUp.default) ? _CountUp.default : _CountUp
import { staggerContainer, fadeUp } from '@utils/motion'
import { ACHIEVEMENT_COUNTERS } from '@data/achievements'
import { cn } from '@utils/helpers'

function CounterItem({ label, value, suffix, isFirst }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className={cn(
        'flex flex-col items-center text-center px-5 py-4',
        !isFirst && 'border-l'
      )}
      style={!isFirst ? { borderColor: 'rgba(255,255,255,0.08)' } : {}}
    >
      <span
        className="font-heading font-bold text-white tabular-nums leading-none"
        style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
        aria-live="polite"
      >
        {isInView ? (
          <CountUp start={0} end={value} suffix={suffix} duration={2} useEasing />
        ) : (
          `0${suffix}`
        )}
      </span>
      <span
        className="text-xs font-mono tracking-wider uppercase mt-1.5 whitespace-nowrap"
        style={{ color: 'var(--color-muted)' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

function AchievementCounters() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="flex items-stretch"
      role="region"
      aria-label="Achievement statistics"
    >
      {ACHIEVEMENT_COUNTERS.map((counter, i) => (
        <CounterItem
          key={counter.label}
          {...counter}
          isFirst={i === 0}
        />
      ))}
    </motion.div>
  )
}

export default AchievementCounters
