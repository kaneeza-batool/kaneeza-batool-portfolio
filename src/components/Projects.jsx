import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/projects.js'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'HTML/CSS', value: 'html-css' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Hackathon', value: 'hackathon' },
]

function TagPill({ tag }) {
  return (
    <span
      className="px-2.5 py-0.5 rounded-full border border-brand-violet/25 text-brand-violet-light"
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        background: 'rgba(124,58,237,0.08)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {tag}
    </span>
  )
}

function matchesFilter(project, filter) {
  if (filter === 'all') return true
  return project.category === filter
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const featuredProject = projects.find(p => p.featured)
  const showFeatured = featuredProject && matchesFilter(featuredProject, activeFilter)
  const otherProjects = projects.filter(p => !p.featured && matchesFilter(p, activeFilter))

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: '500px', height: '500px', background: 'rgba(96,165,250,0.05)', bottom: '10%', right: '0' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">03 / Projects</span>
          <h2 className="section-heading mb-10">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-10">
            {filters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  activeFilter === value ? 'tab-active' : 'tab-inactive'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured project */}
        <AnimatePresence>
          {showFeatured && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16, transition: { duration: 0.18 } }}
              transition={{ duration: 0.35 }}
              className="glass mb-8 overflow-hidden"
              style={{ border: '1px solid rgba(124,58,237,0.3)' }}
            >
              {/* Featured header bar */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA, #7C3AED)' }}
              />
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="px-3 py-1 rounded-full border border-brand-violet/40 text-brand-violet-light"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      background: 'rgba(124,58,237,0.1)',
                    }}
                  >
                    ★ Featured Project
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                  <div>
                    <h3
                      className="font-display font-bold text-2xl text-white mb-3"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                      {featuredProject.title}
                    </h3>
                    <p className="font-body text-[rgba(249,250,251,0.7)] text-sm leading-relaxed mb-5">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.tags.map(tag => (
                        <TagPill key={tag} tag={tag} />
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {featuredProject.liveUrl && (
                        <a
                          href={featuredProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm"
                          style={{ padding: '0.5rem 1.25rem' }}
                        >
                          <ExternalLink size={14} />
                          Live Site
                        </a>
                      )}
                      {featuredProject.githubUrl && (
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 border border-white/15 text-[rgba(249,250,251,0.7)] px-5 py-2 rounded-full text-sm hover:border-brand-violet/50 hover:text-white transition-all"
                        >
                          <FaGithub size={14} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Decorative panel */}
                  <div
                    className="relative flex items-center justify-center rounded-xl overflow-hidden min-h-[150px]"
                    style={{ background: 'rgba(26,21,96,0.5)', border: '1px solid rgba(124,58,237,0.12)' }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(124,58,237,0.6) 28px, rgba(124,58,237,0.6) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(124,58,237,0.6) 28px, rgba(124,58,237,0.6) 29px)',
                      }}
                    />
                    <div className="relative text-center px-4">
                      <div className="text-2xl mb-2">🏠</div>
                      <span
                        className="text-brand-violet/50"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem' }}
                      >
                        dexopk.netlify.app
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-hover p-6 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.07 }}
              >
                {/* Category dot */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: project.category === 'hackathon'
                        ? '#34D399'
                        : project.category === 'react'
                        ? '#60A5FA'
                        : '#7C3AED',
                    }}
                  />
                </div>

                <h3
                  className="font-display font-semibold text-base text-white mb-2"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {project.title}
                </h3>
                <p className="font-body text-[rgba(249,250,251,0.6)] text-sm leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map(tag => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>

                <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[rgba(249,250,251,0.5)] hover:text-brand-violet-light transition-colors"
                    >
                      <ExternalLink size={13} />
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[rgba(249,250,251,0.5)] hover:text-brand-violet-light transition-colors"
                    >
                      <FaGithub size={13} />
                      Code
                    </a>
                  )}
                  {!project.liveUrl && !project.githubUrl && (
                    <span
                      className="text-xs text-[rgba(249,250,251,0.25)]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      No links yet
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
