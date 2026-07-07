import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import _CountUp from 'react-countup'
// react-countup ships CJS with a named `default` key — handle both interop shapes
const CountUp = (_CountUp && _CountUp.default) ? _CountUp.default : _CountUp
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { STATS } from '@data/about'

function StatItem({ end, suffix, label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-center text-center p-4 rounded-xl border transition-colors duration-300"
      style={{
        background: 'rgba(13, 31, 67, 0.5)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
      whileHover={{ borderColor: 'rgba(46,107,255,0.3)' }}
    >
      <span
        className="font-heading font-bold text-white tabular-nums"
        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.875rem)', lineHeight: 1.1 }}
        aria-live="polite"
      >
        {isInView ? (
          <CountUp start={0} end={end} suffix={suffix} duration={2.5} useEasing />
        ) : (
          `0${suffix}`
        )}
      </span>
      <span className="text-xs text-muted font-mono tracking-wider uppercase mt-2">
        {label}
      </span>
    </motion.div>
  )
}

function AboutStats() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="grid grid-cols-2 gap-3"
    >
      {STATS.map((stat, i) => (
        <StatItem key={i} {...stat} />
      ))}
    </motion.div>
  )
}

export default AboutStats
