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
  'HTML5':       { icon: FaHtml5,       color: 'text-orange-400', borderColor: 'rgba(251,146,60,0.4)' },
  'CSS3':        { icon: FaCss3Alt,     color: 'text-blue-400',   borderColor: 'rgba(96,165,250,0.4)' },
  'Bootstrap 5': { icon: FaBootstrap,   color: 'text-purple-400', borderColor: 'rgba(192,132,252,0.4)' },
  'JavaScript':  { icon: SiJavascript,  color: 'text-yellow-400', borderColor: 'rgba(250,204,21,0.4)' },
  'React':       { icon: FaReact,       color: 'text-cyan-400',   borderColor: 'rgba(34,211,238,0.4)' },
  'Redux':       { icon: SiRedux,       color: 'text-purple-500', borderColor: 'rgba(168,85,247,0.4)' },
  'Tailwind CSS':{ icon: SiTailwindcss, color: 'text-cyan-300',   borderColor: 'rgba(103,232,249,0.4)' },
  'Node.js':     { icon: FaNodeJs,      color: 'text-green-400',  borderColor: 'rgba(74,222,128,0.4)' },
  'Express.js':  { icon: SiExpress,     color: 'text-slate-300',  borderColor: 'rgba(203,213,225,0.4)' },
  'MongoDB':     { icon: SiMongodb,     color: 'text-green-500',  borderColor: 'rgba(34,197,94,0.4)' },
  'Java':        { icon: FaJava,        color: 'text-red-400',    borderColor: 'rgba(248,113,113,0.4)' },
  'C++':         { icon: SiCplusplus,   color: 'text-blue-500',   borderColor: 'rgba(59,130,246,0.4)' },
  'Python':      { icon: FaPython,      color: 'text-yellow-300', borderColor: 'rgba(253,224,71,0.4)' },
  'Git':         { icon: FaGit,         color: 'text-orange-500', borderColor: 'rgba(249,115,22,0.4)' },
  'GitHub':      { icon: FaGithub,      color: 'text-slate-200',  borderColor: 'rgba(226,232,240,0.4)' },
  'VS Code':     { icon: VscVscode,     color: 'text-blue-400',   borderColor: 'rgba(96,165,250,0.4)' },
  'Notion':      { icon: SiNotion,      color: 'text-slate-200',  borderColor: 'rgba(226,232,240,0.4)' },
  'Vercel':      { icon: SiVercel,      color: 'text-slate-200',  borderColor: 'rgba(226,232,240,0.4)' },
  'Netlify':     { icon: SiNetlify,     color: 'text-teal-400',   borderColor: 'rgba(45,212,191,0.4)' },
  'Arrays':      { icon: Layers,        color: 'text-brand-violet-light', borderColor: 'rgba(167,139,250,0.4)' },
  'Strings':     { icon: Type,          color: 'text-brand-violet-light', borderColor: 'rgba(167,139,250,0.4)' },
  'Simulation':  { icon: Cpu,           color: 'text-brand-violet-light', borderColor: 'rgba(167,139,250,0.4)' },
  'Two Pointers':{ icon: ArrowLeftRight, color: 'text-amber-400', borderColor: 'rgba(251,191,36,0.4)' },
  'HashMaps':    { icon: Database,      color: 'text-amber-400',  borderColor: 'rgba(251,191,36,0.4)' },
}

const CORE_SKILLS = ['HTML5', 'CSS3', 'JavaScript']
const FRAMEWORK_SKILLS = ['Bootstrap 5', 'React', 'Redux', 'Tailwind CSS']

function SkillBadge({ skill, index, size = 'small' }) {
  const iconData = iconMap[skill.name]
  const IconComponent = iconData?.icon
  const padding = size === 'large' ? 'p-7' : size === 'normal' ? 'p-6' : 'p-5'
  const iconSize = 32
  const bottomBorderColor = iconData?.borderColor ?? 'rgba(255,255,255,0.1)'

  const badgeStyle = skill.inProgress
    ? {
        background: 'rgba(120,53,15,0.1)',
        borderTop: '1px solid rgba(245,158,11,0.2)',
        borderLeft: '1px solid rgba(245,158,11,0.2)',
        borderRight: '1px solid rgba(245,158,11,0.2)',
        borderBottom: `2px solid ${bottomBorderColor}`,
      }
    : { borderBottom: `2px solid ${bottomBorderColor}` }

  return (
    <motion.div
      className={`glass rounded-3xl ${padding} flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2 hover:border-brand-violet/40 hover:shadow-[0_8px_24px_rgba(124,58,237,0.15)]`}
      style={badgeStyle}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.055 }}
    >
      <div style={{ width: iconSize + 16, height: iconSize + 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {IconComponent && <IconComponent size={iconSize} className={iconData.color} />}
      </div>
      <span
        className="font-display font-medium text-sm text-white text-center"
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
    <section id="skills" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#0D0B1F' }}>
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
          <p className="font-mono tracking-[0.3em] uppercase text-sm text-brand-violet mb-3">
            <span className="inline-block w-6 h-px bg-brand-violet mr-3 align-middle" />
            02 / Skills
          </p>
          <h2 className="section-heading text-5xl lg:text-6xl">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto text-center mt-4 mb-12">
            Technologies I work with and am currently learning
          </p>

          {/* Tab switcher */}
          <div className="glass rounded-2xl p-1.5 inline-flex flex-wrap gap-1 mb-4">
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
            >
              {activeTab === 'frontend' ? (
                <>
                  <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-3">Core</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mb-2">
                    {activeSkills
                      .filter(s => CORE_SKILLS.includes(s.name))
                      .map((skill, i) => (
                        <SkillBadge key={skill.name} skill={skill} index={i} size="large" />
                      ))}
                  </div>
                  <p className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-3 mt-6">Frameworks</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                    {activeSkills
                      .filter(s => FRAMEWORK_SKILLS.includes(s.name))
                      .map((skill, i) => (
                        <SkillBadge key={skill.name} skill={skill} index={i + CORE_SKILLS.length} size="normal" />
                      ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                  {activeSkills.map((skill, index) => (
                    <SkillBadge key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
