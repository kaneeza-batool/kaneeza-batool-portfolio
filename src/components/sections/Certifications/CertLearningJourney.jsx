import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CERT_LEARNING_JOURNEY, CERT_COLORS } from '@data/certifications'

function JourneyStep({ step, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const colors = CERT_COLORS[step.colorKey] ?? CERT_COLORS.blue

  return (
    <div ref={ref} className="flex items-center flex-shrink-0">
      {/* Step card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-shrink-0 rounded-2xl px-5 py-4 flex flex-col items-center text-center"
        style={{
          minWidth: '150px',
          maxWidth: '168px',
          background: 'rgba(13,31,67,0.85)',
          border: `1px solid rgba(${colors.rgb},0.18)`,
          backdropFilter: 'blur(10px)',
          boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 0px rgba(${colors.rgb},0)`,
        }}
      >
        {/* Phase number */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold mb-2.5"
          style={{
            background: `rgba(${colors.rgb},0.15)`,
            border: `1px solid rgba(${colors.rgb},0.3)`,
            color: colors.hex,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Year */}
        <div
          className="text-xs font-mono font-bold mb-1"
          style={{ color: colors.hex }}
        >
          {step.year}
        </div>

        {/* Phase label */}
        <div className="text-xs font-heading font-bold text-white mb-1.5 leading-tight">
          {step.label}
        </div>

        {/* Description */}
        <div
          className="text-xs font-body leading-snug"
          style={{ color: 'var(--color-muted)' }}
        >
          {step.description}
        </div>
      </motion.div>

      {/* Connector (not after last) */}
      {!isLast && (
        <motion.div
          className="flex items-center mx-3 flex-shrink-0"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.35, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
          aria-hidden="true"
        >
          <div
            className="h-px w-10"
            style={{
              background: 'linear-gradient(90deg, rgba(46,107,255,0.5), rgba(106,92,255,0.3))',
            }}
          />
          <span
            style={{
              color: 'rgba(106,92,255,0.45)',
              fontSize: '9px',
              marginLeft: '-1px',
              lineHeight: 1,
            }}
          >
            ▶
          </span>
        </motion.div>
      )}
    </div>
  )
}

function CertLearningJourney() {
  return (
    <section
      aria-label="Learning journey progression"
      className="mt-20"
    >
      <p
        className="text-xs font-mono font-medium tracking-widest uppercase mb-7 text-center"
        style={{ color: 'var(--color-muted)' }}
      >
        Learning Progression
      </p>

      <div
        className="overflow-x-auto pb-4"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(46,107,255,0.25) transparent',
        }}
      >
        <div className="flex items-stretch px-2 min-w-max mx-auto">
          {CERT_LEARNING_JOURNEY.map((step, i) => (
            <JourneyStep
              key={step.id}
              step={step}
              index={i}
              isLast={i === CERT_LEARNING_JOURNEY.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertLearningJourney
