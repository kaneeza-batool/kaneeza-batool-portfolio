import { motion } from 'framer-motion'
import { programs } from '../data/programs.js'

const borderColorMap = {
  completed: '#34D399',
  active: '#7C3AED',
  qualified: '#FBBF24',
}

const statusConfig = {
  completed: {
    label: 'Completed',
    style: { background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34D399' },
  },
  active: {
    label: 'Active',
    style: { background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.35)', color: '#A78BFA' },
  },
  qualified: {
    label: 'Round 2',
    style: { background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#FBBF24' },
  },
}

const badgeConfig = {
  'top-performer': { label: '⭐ Top Performer', color: '#FBBF24' },
  round2: { label: '🏆 Round 2 / 324 Teams', color: '#FBBF24' },
  gold: { label: '🏆 Round 2 / 324 Teams', color: '#FBBF24' },
}

export default function Programs() {
  return (
    <section id="programs" className="py-28 relative overflow-hidden" style={{ background: 'rgba(26,21,96,0.1)' }}>
      <div
        className="radial-glow"
        style={{ width: '450px', height: '450px', background: 'rgba(124,58,237,0.07)', bottom: '0', left: '-5%' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">04 / Programs</span>
          <h2 className="section-heading mb-12">
            Programs &amp; <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program, index) => {
            const accentColor = borderColorMap[program.status] || '#7C3AED'
            const statusConf = statusConfig[program.status]
            const badgeConf = program.badge ? badgeConfig[program.badge] : null

            return (
              <motion.div
                key={program.id}
                className="glass-hover p-6 flex flex-col relative overflow-hidden"
                style={{ borderLeft: `3px solid ${accentColor}` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
              >
                {/* Accent glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0, width: '3px',
                    background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
                    opacity: 0.6,
                  }}
                />

                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0 pr-3">
                    <h3
                      className="font-display font-semibold text-[0.95rem] text-white leading-snug"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {program.title}
                    </h3>
                    <p
                      className="mt-1"
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.65rem',
                        color: '#A78BFA',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {program.org}
                    </p>
                    <p
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.62rem',
                        color: 'rgba(249,250,251,0.35)',
                        marginTop: '2px',
                      }}
                    >
                      {program.year}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', ...statusConf.style }}
                    >
                      {statusConf.label}
                    </span>
                    {badgeConf && (
                      <span
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.62rem',
                          color: badgeConf.color,
                        }}
                      >
                        {badgeConf.label}
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-body text-[rgba(249,250,251,0.58)] text-sm leading-relaxed flex-1">
                  {program.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
