import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { CAREER_DESTINATION, STATUS_CONFIG } from '@data/roadmap'

function RoadmapDestination() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(0.12, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="mt-20 lg:mt-28"
    >
      {/* Section label */}
      <motion.div variants={fadeUp} className="flex justify-center mb-10">
        <span className="text-xs font-mono font-medium tracking-widest uppercase text-accent-purple px-3 py-1 rounded-pill bg-accent-purple/10 border border-accent-purple/20 inline-flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-accent-purple inline-block" />
          Career Destination
        </span>
      </motion.div>

      {/* Destination cards */}
      <div className="flex flex-col items-center gap-0 max-w-lg mx-auto">
        {CAREER_DESTINATION.map((dest, idx) => {
          const cfg = STATUS_CONFIG[dest.status]
          const Icon = dest.icon
          const isLast = idx === CAREER_DESTINATION.length - 1
          const isCurrent = dest.status === 'current'

          return (
            <div key={dest.label} className="flex flex-col items-center w-full">
              {/* Card */}
              <motion.div
                variants={fadeUp}
                className="w-full rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: isCurrent
                    ? 'linear-gradient(135deg, rgba(46,107,255,0.1) 0%, rgba(13,31,67,0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(13,31,67,0.5) 0%, rgba(8,27,58,0.6) 100%)',
                  border: `1px solid ${isCurrent ? 'rgba(46,107,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: isCurrent
                    ? '0 0 28px rgba(46,107,255,0.18), 0 4px 20px rgba(0,0,0,0.3)'
                    : '0 4px 20px rgba(0,0,0,0.25)',
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                    style={{
                      backgroundColor: cfg.bgColor,
                      border: `1px solid ${cfg.borderColor}`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-heading font-semibold text-white">
                        {dest.label}
                      </h4>
                      <span
                        className={`text-2xs font-mono px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.badgeClass}`}
                      >
                        {isCurrent ? 'In Progress' : 'Vision'}
                      </span>
                    </div>
                    <p className="text-xs font-body text-text-secondary leading-relaxed">
                      {dest.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Arrow connector */}
              {!isLast && (
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col items-center py-2 gap-0.5"
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-0.5 h-2 rounded-full"
                      style={{ backgroundColor: 'rgba(106,92,255,0.3)' }}
                      animate={
                        !reduced && inView
                          ? { opacity: [0.2, 0.8, 0.2] }
                          : undefined
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: dot * 0.2,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                  <FiArrowDown
                    className="w-3.5 h-3.5 mt-0.5"
                    style={{ color: 'rgba(106,92,255,0.5)' }}
                  />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default RoadmapDestination
