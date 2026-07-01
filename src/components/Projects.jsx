import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/projects.js'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'HTML/CSS', value: 'html-css' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Hackathon', value: 'hackathon' },
]

function TagPill({ tag }) {
  return (
    <span className="bg-brand-violet/10 border border-brand-violet/30 text-brand-violet-light font-mono text-xs rounded-full px-3 py-1">
      {tag}
    </span>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const featuredProject = projects.find(p => p.featured)
  const showFeatured =
    activeFilter === 'all' || featuredProject?.category === activeFilter

  const otherProjects = projects.filter(
    p => !p.featured && (activeFilter === 'all' || p.category === activeFilter)
  )

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-3">
          03 / Projects
        </p>

        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-10">
          Latest <span className="gradient-text">Projects</span>
        </h2>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={
                activeFilter === value
                  ? 'bg-brand-violet text-white font-bold px-4 py-2 rounded-full text-sm'
                  : 'text-slate-400 hover:text-white px-4 py-2 rounded-full text-sm hover:bg-white/5 transition-all'
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Featured project */}
        <AnimatePresence>
          {showFeatured && featuredProject && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass p-8 mb-8 relative"
            >
              <span className="absolute top-6 right-6 bg-brand-violet/20 text-brand-violet-light font-mono text-xs rounded-full px-3 py-1">
                Featured
              </span>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left */}
                <div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    {featuredProject.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
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
                        className="bg-brand-violet text-white font-bold px-4 py-2 rounded-full text-sm hover:glow-violet transition-all"
                      >
                        Live Site ↗
                      </a>
                    )}
                    {featuredProject.githubUrl && (
                      <a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-brand-violet/40 text-slate-300 px-4 py-2 rounded-full text-sm hover:border-brand-violet hover:text-white transition-all"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Right — decorative */}
                <div className="relative flex items-center justify-center bg-brand-secondary/40 rounded-xl border border-brand-violet/10 min-h-[160px] overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(124,58,237,0.3) 24px, rgba(124,58,237,0.3) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(124,58,237,0.3) 24px, rgba(124,58,237,0.3) 25px)',
                    }}
                  />
                  <span className="relative font-mono text-brand-violet/30 text-xs">
                    dexopk.netlify.app
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass p-6 flex flex-col cursor-default hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)] hover:border-brand-violet/40 transition-all duration-250"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
              >
                <h3 className="font-display font-semibold text-base text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-white/5">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-brand-violet-light text-sm flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-brand-violet-light text-sm flex items-center gap-1 transition-colors"
                    >
                      <FaGithub size={14} />
                      Code
                    </a>
                  ) : null}
                  {!project.liveUrl && !project.githubUrl ? (
                    <span className="font-mono text-xs text-slate-600">No links yet</span>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
