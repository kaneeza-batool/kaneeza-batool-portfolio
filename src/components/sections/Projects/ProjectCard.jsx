import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiEye } from 'react-icons/fi'
import { cn } from '@utils/helpers'
import { ACCENT_COLORS, CATEGORY_META } from '@data/projects'
import { usePrefersReducedMotion } from '@hooks'
import ProjectImagePlaceholder from './ProjectImagePlaceholder'

function ProjectCard({ project, onViewDetails }) {
  const reduced = usePrefersReducedMotion()
  const color = ACCENT_COLORS[project.accentColor] ?? ACCENT_COLORS.blue
  const catMeta = CATEGORY_META[project.category[0]] ?? CATEGORY_META.react
  const catColor = ACCENT_COLORS[catMeta.colorKey] ?? ACCENT_COLORS.blue

  return (
    <motion.article
      whileHover={reduced ? {} : {
        y: -6,
        boxShadow: `0 16px 48px rgba(0,0,0,0.55), 0 0 28px rgba(${color.rgb}, 0.14)`,
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: '#0D1F43',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
      }}
      role="article"
      aria-label={`Project: ${project.title}`}
    >
      {/* ── Image area ── */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ paddingTop: '52%' }}>
        <motion.div
          whileHover={reduced ? {} : { scale: 1.04 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`Screenshot of ${project.title}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <ProjectImagePlaceholder title={project.title} accentColor={project.accentColor} />
          )}
        </motion.div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0D1F43 0%, transparent 100%)' }}
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-pill text-xs font-body font-semibold"
            style={{
              background: `rgba(${catColor.rgb}, 0.2)`,
              border: `1px solid rgba(${catColor.rgb}, 0.35)`,
              color: catColor.hex,
            }}
          >
            {catMeta.label}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-pill"
            style={{
              color: 'var(--color-muted)',
              background: 'rgba(5,14,32,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="text-base font-heading font-bold text-white mb-1.5 leading-tight tracking-tight">
            {project.title}
          </h3>
          <p
            className="text-xs font-body leading-relaxed line-clamp-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* Tech chips (max 4) */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded-pill text-xs font-mono"
              style={{
                color: color.hex,
                border: `1px solid rgba(${color.rgb}, 0.22)`,
                background: `rgba(${color.rgb}, 0.07)`,
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              className="text-xs font-mono px-1.5 py-0.5"
              style={{ color: 'var(--color-muted)' }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action row */}
        <div className={cn('flex items-center gap-1.5 mt-auto pt-1')}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-white/6"
              style={{ color: 'var(--color-muted)' }}
            >
              <FiGithub className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-white/6"
              style={{ color: 'var(--color-muted)' }}
            >
              <FiExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          )}

          {/* View Details placeholder — modal coming next prompt */}
          <button
            onClick={() => onViewDetails(project)}
            aria-label={`View details for ${project.title}`}
            className="ml-auto inline-flex items-center gap-1 text-xs font-body font-medium transition-colors duration-200 hover:opacity-80"
            style={{ color: color.hex }}
          >
            <FiEye className="w-3.5 h-3.5" aria-hidden="true" />
            Details
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
