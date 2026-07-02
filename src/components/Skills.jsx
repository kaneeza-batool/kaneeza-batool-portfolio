import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { skills } from '../data/skills.js'

const tabs = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'languages', label: 'Languages' },
  { key: 'tools', label: 'Tools' },
  { key: 'dsa', label: 'DSA' },
]

function SkillBadge({ skill, index }) {
  const isAmber = skill.inProgress

  return (
    <motion.div
      key={skill.name}
      className="rounded-2xl p-5 border border-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)]"
      style={{ background: 'rgba(255,255,255,0.03)' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.055 }}
      whileHover={{ background: 'rgba(124,58,237,0.05)' }}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span
            className="font-display font-semibold text-sm text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {skill.name}
          </span>
          {isAmber && (
            <span
              className="italic border border-amber-500/30 bg-amber-900/20 text-amber-400/90 rounded-full px-3 py-0.5"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem' }}
            >
              IN PROGRESS
            </span>
          )}
        </div>
        <span
          className={`font-mono text-sm ${isAmber ? 'text-brand-amber' : 'text-brand-violet-light'}`}
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {skill.percentage}%
        </span>
      </div>

      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isAmber
              ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
              : 'linear-gradient(90deg, #7C3AED, #A78BFA)',
            filter: isAmber ? undefined : 'drop-shadow(0 0 4px rgba(124,58,237,0.6))',
          }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${skill.percentage}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.04 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend')
  const activeSkills = skills[activeTab] ?? []

  return (
    <section id="skills" className="py-28 relative overflow-hidden" style={{ background: 'rgba(26,21,96,0.12)' }}>
      <div
        className="radial-glow"
        style={{ width: '400px', height: '400px', background: 'rgba(124,58,237,0.07)', top: '10%', left: '-5%' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-mono tracking-[0.2em] uppercase text-xs text-brand-violet mb-3">
            <span className="inline-block w-6 h-px bg-brand-violet mr-3 align-middle" />
            02 / Skills
          </p>
          <h2 className="section-heading text-4xl lg:text-5xl mb-10">
            Technical <span className="gradient-text">Skills</span>
          </h2>

          {/* Tab switcher */}
          <div className="glass rounded-2xl p-1.5 inline-flex gap-1 mb-4">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-brand-violet text-white rounded-xl px-5 py-2 font-semibold shadow-[0_0_16px_rgba(124,58,237,0.4)]'
                    : 'text-slate-400 hover:text-white px-5 py-2 rounded-xl hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <p
            className="font-mono text-xs text-slate-500 mb-6"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Showing {activeSkills.length} skills
          </p>

          {activeTab === 'backend' && (
            <div className="glass border-l-4 border-amber-500 rounded-xl p-4 mb-6 flex items-center gap-3">
              <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />
              <span
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  color: 'rgba(251,191,36,0.8)',
                }}
              >
                Currently learning - percentages reflect progress, not mastery targets.
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {activeSkills.map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
