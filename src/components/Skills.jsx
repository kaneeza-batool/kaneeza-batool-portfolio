import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data/skills.js'

const tabs = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'languages', label: 'Languages' },
  { key: 'tools', label: 'Tools' },
  { key: 'dsa', label: 'DSA' },
]

function SkillBadge({ skill, index }) {
  const [hovered, setHovered] = useState(false)
  const isAmber = skill.inProgress

  return (
    <motion.div
      key={skill.name}
      className="glass-hover p-5 relative"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.055 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
              className="border border-brand-amber/40 text-brand-amber px-2 py-0.5 rounded-full"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                background: 'rgba(251,191,36,0.08)',
              }}
            >
              IN PROGRESS
            </span>
          )}
        </div>
        <span
          className={`font-mono text-xs transition-all duration-200 ${hovered ? 'opacity-100' : 'opacity-0'} ${isAmber ? 'text-brand-amber' : 'text-brand-violet-light'}`}
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          {skill.percentage}%
        </span>
      </div>

      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isAmber
              ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
              : 'linear-gradient(90deg, #7C3AED, #A78BFA)',
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
          <span className="section-label">02 / Skills</span>
          <h2 className="section-heading mb-10">
            Technical <span className="gradient-text">Skills</span>
          </h2>

          {/* Tab switcher */}
          <div className="flex gap-2 flex-wrap mb-10">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  activeTab === key ? 'tab-active' : 'tab-inactive'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'backend' && (
            <div
              className="mb-6 px-4 py-3 rounded-xl border border-brand-amber/25 inline-flex items-center gap-2"
              style={{ background: 'rgba(251,191,36,0.07)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#FBBF24' }}
            >
              <span>⚡</span>
              <span>Currently learning — percentages reflect progress, not mastery targets.</span>
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
