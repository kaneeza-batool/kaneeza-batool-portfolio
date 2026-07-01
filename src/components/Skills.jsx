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

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend')

  const activeSkills = skills[activeTab] ?? []

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-3">
          03 / Skills
        </p>

        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-10">
          My <span className="gradient-text">Skills</span>
        </h2>

        {/* Tab switcher */}
        <div className="flex gap-2 flex-wrap mb-10">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={
                activeTab === key
                  ? 'bg-brand-violet text-white font-bold px-4 py-2 rounded-full text-sm'
                  : 'text-slate-400 hover:text-white px-4 py-2 rounded-full text-sm hover:bg-white/5 transition-all'
              }
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'backend' && (
              <p className="font-mono text-xs text-amber-400/70 mb-6">
                ⚡ Currently learning — numbers reflect current progress, not a target.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="glass p-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-display font-semibold text-sm text-white">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {skill.inProgress && (
                        <span className="bg-amber-900/40 text-amber-400 border border-amber-500/30 font-mono text-xs px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      )}
                      <span className="font-mono text-xs text-slate-400">{skill.percentage}%</span>
                    </div>
                  </div>

                  <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: skill.inProgress
                          ? '#F59E0B'
                          : 'linear-gradient(90deg, #7C3AED, #A78BFA)',
                      }}
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 1, ease: 'easeOut', delay: index * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
