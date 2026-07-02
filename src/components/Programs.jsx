import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { programs } from '../data/programs.js'

const borderColorMap = {
  completed: '#34D399',
  active: '#7C3AED',
  qualified: '#FBBF24',
}

const statusConfig = {
  completed: {
    label: 'Completed',
    dotColor: '#34D399',
    style: { background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34D399' },
  },
  active: {
    label: 'Active',
    dotColor: '#A78BFA',
    style: { background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.35)', color: '#A78BFA' },
  },
  qualified: {
    label: 'Round 2',
    dotColor: '#FBBF24',
    style: { background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#FBBF24' },
  },
}

export default function Programs() {
  return (
    <section
      id="programs"
      className="py-32 relative overflow-hidden bg-[#0F0D2A] border-t border-b border-white/[0.04]"
      style={{ backgroundColor: '#0F0D2A' }}
    >
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
          <p className="font-mono tracking-[0.3em] uppercase text-sm text-brand-violet mb-3">
            <span className="inline-block w-6 h-px bg-brand-violet mr-3 align-middle" />
            04 / Programs
          </p>
          <h2 className="section-heading text-5xl lg:text-6xl">
            Programs &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto text-center mt-4 mb-8">
            Programs, fellowships, and competitions I have been part of
          </p>
          <p className="font-mono text-xs text-slate-500 mb-12">
            {programs.length} programs and counting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const accentColor = borderColorMap[program.status] || '#7C3AED'
            const statusConf = statusConfig[program.status]

            return (
              <motion.div
                key={program.id}
                className="flex flex-col rounded-3xl p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(124,58,237,0.15)]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  borderRight: '1px solid rgba(255,255,255,0.08)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  borderLeft: `4px solid ${accentColor}`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
              >
                {/* Accent glow strip */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '4px',
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
                    {/* Org and year with separator dot */}
                    <p
                      className="mt-1.5 font-mono text-xs"
                      style={{ color: 'rgba(148,163,184,0.7)' }}
                    >
                      {program.org} · {program.year}
                    </p>
                  </div>

                  {/* Status badge with colored dot */}
                  <div className="shrink-0">
                    <span
                      className="px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-mono"
                      style={{ fontSize: '0.65rem', ...statusConf.style }}
                    >
                      <span
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: statusConf.dotColor,
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                      {statusConf.label}
                    </span>
                  </div>
                </div>

                {/* Top performer badge - own row */}
                {program.badge === 'top-performer' && (
                  <div className="mb-3">
                    <span
                      className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full text-yellow-400"
                      style={{
                        backgroundColor: 'rgba(113,63,18,0.2)',
                        border: '1px solid rgba(234,179,8,0.2)',
                      }}
                    >
                      <Star size={12} />
                      Top Performer
                    </span>
                  </div>
                )}

                {/* Gold / Round 2 badge */}
                {program.badge === 'gold' && (
                  <div className="mb-3">
                    <span
                      className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 rounded-full text-amber-300"
                      style={{
                        backgroundColor: 'rgba(120,53,15,0.2)',
                        border: '1px solid rgba(245,158,11,0.2)',
                      }}
                    >
                      Round 2 - 200/324 Teams
                    </span>
                  </div>
                )}

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
