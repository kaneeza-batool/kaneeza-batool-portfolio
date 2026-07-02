import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Layers, Type, Cpu, ArrowLeftRight, Database } from 'lucide-react'
import {
  FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaNodeJs, FaJava, FaGit, FaGithub, FaPython,
} from 'react-icons/fa'
import {
  SiJavascript, SiRedux, SiTailwindcss, SiExpress, SiMongodb, SiCplusplus,
  SiNotion, SiVercel, SiNetlify,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { skills } from '../data/skills.js'

const tabs = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'languages', label: 'Languages' },
  { key: 'tools', label: 'Tools' },
  { key: 'dsa', label: 'DSA' },
]

const iconMap = {
  'HTML5':       { icon: FaHtml5,            color: 'text-orange-400' },
  'CSS3':        { icon: FaCss3Alt,           color: 'text-blue-400' },
  'Bootstrap 5': { icon: FaBootstrap,         color: 'text-purple-400' },
  'JavaScript':  { icon: SiJavascript,        color: 'text-yellow-400' },
  'React':       { icon: FaReact,             color: 'text-cyan-400' },
  'Redux':       { icon: SiRedux,             color: 'text-purple-500' },
  'Tailwind CSS':{ icon: SiTailwindcss,       color: 'text-cyan-300' },
  'Node.js':     { icon: FaNodeJs,            color: 'text-green-400' },
  'Express.js':  { icon: SiExpress,           color: 'text-slate-300' },
  'MongoDB':     { icon: SiMongodb,           color: 'text-green-500' },
  'Java':        { icon: FaJava,              color: 'text-red-400' },
  'C++':         { icon: SiCplusplus,         color: 'text-blue-500' },
  'Python':      { icon: FaPython,            color: 'text-yellow-300' },
  'Git':         { icon: FaGit,              color: 'text-orange-500' },
  'GitHub':      { icon: FaGithub,            color: 'text-slate-200' },
  'VS Code':     { icon: VscVscode,            color: 'text-blue-400' },
  'Notion':      { icon: SiNotion,            color: 'text-slate-200' },
  'Vercel':      { icon: SiVercel,            color: 'text-slate-200' },
  'Netlify':     { icon: SiNetlify,           color: 'text-teal-400' },
  'Arrays':      { icon: Layers,              color: 'text-brand-violet-light' },
  'Strings':     { icon: Type,               color: 'text-brand-violet-light' },
  'Simulation':  { icon: Cpu,                color: 'text-brand-violet-light' },
  'Two Pointers':{ icon: ArrowLeftRight,      color: 'text-amber-400' },
  'HashMaps':    { icon: Database,            color: 'text-amber-400' },
}

function SkillBadge({ skill, index }) {
  const iconData = iconMap[skill.name]
  const IconComponent = iconData?.icon

  return (
    <motion.div
      className="glass rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/40 hover:shadow-[0_8px_24px_rgba(124,58,237,0.15)]"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.055 }}
    >
      <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {IconComponent && <IconComponent size={32} className={iconData.color} />}
      </div>
      <span
        className="font-display font-semibold text-sm text-white text-center"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {skill.name}
      </span>
      {skill.inProgress && (
        <span
          className="font-mono text-xs text-amber-400 italic"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          In Progress
        </span>
      )}
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
                Currently learning - these are works in progress, not mastered skills.
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
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
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
