import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star } from 'lucide-react'
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
      className="bg-brand-violet/10 border border-brand-violet/25 text-brand-violet-light rounded-lg px-3 py-1 font-mono text-xs"
      style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
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
  const filteredCount = (showFeatured ? 1 : 0) + otherProjects.length

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Centered background blob */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          backgroundColor: 'rgba(124,58,237,0.04)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">03 / Projects</span>
          <h2 className="section-heading mb-8">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          {/* Filter tabs - glass pill container */}
          <div className="glass rounded-2xl p-1.5 inline-flex flex-wrap gap-1 mb-4">
            {filters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={`px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
                  activeFilter === value ? 'tab-active' : 'tab-inactive'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Project count */}
          <p className="font-mono text-xs text-slate-500 mb-10">
            {filteredCount} projects
          </p>
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
              className="mb-8 overflow-hidden rounded-2xl"
              style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(124,58,237,0.3)',
              }}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ background: 'linear-gradient(90deg, #7C3AED, #A78BFA, #7C3AED)' }}
              />
              <div className="p-8">
                {/* Featured label - top left */}
                <div className="flex items-center gap-1.5 mb-6">
                  <Star size={11} className="text-brand-violet-light" />
                  <span className="gradient-text font-mono text-xs uppercase tracking-widest">
                    Featured
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                  <div>
                    <h3
                      className="font-display font-black text-3xl text-white mb-3"
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
                          className="flex items-center gap-2 text-sm text-white px-5 py-2 rounded-full transition-all hover:shadow-[0_0_24px_rgba(124,58,237,0.55)]"
                          style={{ background: 'linear-gradient(135deg, #7C3AED, #A78BFA)' }}
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
                          className="flex items-center gap-2 text-sm text-[rgba(249,250,251,0.7)] px-5 py-2 rounded-full border border-brand-violet/30 hover:border-brand-violet hover:text-white transition-all"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          <FaGithub size={14} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Decorative panel with grid pattern */}
                  <div
                    className="relative flex items-center justify-center rounded-xl overflow-hidden min-h-[150px]"
                    style={{
                      backgroundColor: 'rgba(26,21,96,0.5)',
                      border: '1px solid rgba(124,58,237,0.12)',
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(124,58,237,0.06) 28px, rgba(124,58,237,0.06) 29px), repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(124,58,237,0.06) 28px, rgba(124,58,237,0.06) 29px)',
                    }}
                  >
                    <span
                      className="relative text-center px-4 font-mono text-sm text-brand-violet/20"
                    >
                      dexopk.netlify.app
                    </span>
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
                className="flex flex-col rounded-2xl p-6 border border-white/8 hover:border-brand-violet/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(124,58,237,0.18)]"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.07 }}
              >
                {/* Category dot */}
                <div className="flex items-center mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        project.category === 'hackathon'
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

                <div
                  className="flex gap-4 pt-4 mt-auto"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
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
                    <span className="font-mono text-xs text-slate-600 italic">
                      Repo private or coming soon
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
