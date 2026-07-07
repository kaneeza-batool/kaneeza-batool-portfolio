import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { LEARNING_PHILOSOPHY } from '@data/roadmap'

function RoadmapPhilosophy() {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="mt-16 lg:mt-24"
    >
      {/* Glass card wrapper */}
      <motion.div
        variants={fadeUp}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(13,31,67,0.65) 0%, rgba(8,27,58,0.75) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        }}
      >
        {/* Top accent */}
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(46,107,255,0.5), rgba(106,92,255,0.5), transparent)',
          }}
        />

        <div className="p-7 sm:p-10">
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-accent-blue px-3 py-1 rounded-pill bg-accent-blue/10 border border-accent-blue/20 inline-flex items-center gap-2 mb-4">
              <span className="w-1 h-1 rounded-full bg-accent-blue inline-block" />
              My Learning Loop
            </span>
            <h3 className="text-subheading font-heading font-bold text-white mt-2">
              How I Learn
            </h3>
            <p className="text-sm font-body text-text-secondary max-w-md mx-auto mt-2">
              Every skill I have added to my stack followed this same five-step loop.
              It is not a methodology — it is what actually works for me.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="flex flex-col items-center gap-0 max-w-sm mx-auto">
            {LEARNING_PHILOSOPHY.map((item, idx) => {
              const Icon = item.icon
              const isLast = idx === LEARNING_PHILOSOPHY.length - 1

              return (
                <div key={item.step} className="flex flex-col items-center w-full">
                  {/* Step card */}
                  <motion.div
                    variants={fadeUp}
                    className="w-full rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: `${item.color}08`,
                      border: `1px solid ${item.color}20`,
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                      style={{
                        backgroundColor: `${item.color}12`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-xs font-mono font-semibold tracking-wide"
                          style={{ color: item.color }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-sm font-heading font-bold text-white">
                          {item.step}
                        </h4>
                      </div>
                      <p className="text-xs font-body text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Connector line */}
                  {!isLast && (
                    <motion.div
                      variants={fadeUp}
                      className="w-px h-5"
                      style={{
                        background: `linear-gradient(to bottom, ${item.color}40, ${LEARNING_PHILOSOPHY[idx + 1].color}30)`,
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(106,92,255,0.4), rgba(46,107,255,0.4), transparent)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default RoadmapPhilosophy
