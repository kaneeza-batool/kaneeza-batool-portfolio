import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiEye } from 'react-icons/fi'
import { cn } from '@utils/helpers'
import { ACCENT_COLORS, CATEGORY_META } from '@data/projects'
import { usePrefersReducedMotion } from '@hooks'
import ProjectImagePlaceholder from './ProjectImagePlaceholder'

function StatusBadge({ status }) {
  const map = {
    completed:    { label: 'Completed',    dot: '#22C55E', bg: 'rgba(34,197,94,0.14)',   border: 'rgba(34,197,94,0.28)'    },
    'in-progress':{ label: 'In Progress',  dot: '#F59E0B', bg: 'rgba(245,158,11,0.14)',  border: 'rgba(245,158,11,0.28)'   },
    planned:      { label: 'Planned',      dot: '#6E7B9C', bg: 'rgba(110,123,156,0.14)', border: 'rgba(110,123,156,0.28)'  },
  }
  const s = map[status] ?? map.planned
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-xs font-body font-medium"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.dot }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} aria-hidden="true" />
      {s.label}
    </span>
  )
}

function TechChip({ tech, color }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.span
      whileHover={reduced ? {} : { scale: 1.08, y: -1 }}
      transition={{ duration: 0.15 }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-mono font-medium border"
      style={{
        color: color.hex,
        borderColor: `rgba(${color.rgb}, 0.28)`,
        background: `rgba(${color.rgb}, 0.08)`,
      }}
    >
      {tech}
    </motion.span>
  )
}

function FeaturedProjectCard({ project, onViewDetails }) {
  const reduced = usePrefersReducedMotion()
  const color = ACCENT_COLORS[project.accentColor] ?? ACCENT_COLORS.blue
  const catMeta = CATEGORY_META[project.category[0]] ?? CATEGORY_META.react
  const catColor = ACCENT_COLORS[catMeta.colorKey] ?? ACCENT_COLORS.blue

  const cardVariants = {
    rest: {
      y: 0,
      boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
    },
    hover: {
      y: reduced ? 0 : -8,
      boxShadow: reduced
        ? '0 4px 32px rgba(0,0,0,0.4)'
        : `0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(${color.rgb}, 0.22)`,
    },
  }

  const borderVariants = {
    rest:  { opacity: 0 },
    hover: { opacity: reduced ? 0 : 1 },
  }

  const imageVariants = {
    rest:  { scale: 1 },
    hover: { scale: reduced ? 1 : 1.05 },
  }

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-3xl overflow-hidden flex flex-col h-full"
      style={{
        background: '#0D1F43',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      role="article"
      aria-label={`Featured project: ${project.title}`}
    >
      {/* Animated glow border on hover */}
      <motion.div
        variants={borderVariants}
        transition={{ duration: 0.25 }}
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl pointer-events-none z-20"
        style={{ boxShadow: `inset 0 0 0 1px rgba(${color.rgb}, 0.5)` }}
      />

      {/* ── Image area ── */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ paddingTop: '56.25%' }}>
        <motion.div
          variants={imageVariants}
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

        {/* Bottom fade into card background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0D1F43 0%, transparent 100%)' }}
        />

        {/* Category badge — top left */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-pill text-xs font-body font-semibold"
            style={{
              background: `rgba(${catColor.rgb}, 0.2)`,
              border: `1px solid rgba(${catColor.rgb}, 0.4)`,
              color: catColor.hex,
            }}
          >
            {catMeta.label}
          </span>
        </div>

        {/* Status badge — top right */}
        <div className="absolute top-4 right-4 z-10">
          <StatusBadge status={project.status} />
        </div>

        {/* Year — bottom right inside image */}
        <div className="absolute bottom-3 right-4 z-10">
          <span
            className="text-xs font-mono"
            style={{ color: 'var(--color-muted)' }}
          >
            {project.year}
          </span>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="flex flex-col flex-1 p-7 gap-5">
        {/* Title + description */}
        <div>
          <h3 className="text-2xl font-heading font-bold text-white mb-2.5 leading-tight tracking-tight">
            {project.title}
          </h3>
          <p
            className="text-sm font-body leading-relaxed line-clamp-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 5).map((tech) => (
            <TechChip key={tech} tech={tech} color={color} />
          ))}
          {project.techStack.length > 5 && (
            <span
              className="inline-flex items-center px-2 py-0.5 text-xs font-mono"
              style={{ color: 'var(--color-muted)' }}
            >
              +{project.techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-auto pt-3 flex-wrap">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-body font-medium',
                'border transition-all duration-200',
                'text-text-secondary border-[rgba(255,255,255,0.1)] hover:text-white hover:border-white/20 hover:bg-white/5'
              )}
            >
              <FiGithub className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
          )}

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo of ${project.title}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-body font-medium border transition-all duration-200"
              style={{
                color: color.hex,
                borderColor: `rgba(${color.rgb}, 0.35)`,
                background: `rgba(${color.rgb}, 0.08)`,
              }}
            >
              <FiExternalLink className="w-4 h-4" aria-hidden="true" />
              Live Demo
            </a>
          )}

          {/* View Details — placeholder for modal (next prompt) */}
          <motion.button
            whileHover={reduced ? {} : { scale: 1.03 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            onClick={() => onViewDetails(project)}
            aria-label={`View full details for ${project.title}`}
            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-body font-semibold transition-all duration-200"
            style={{
              color: '#fff',
              background: `linear-gradient(135deg, rgba(${color.rgb}, 0.9), rgba(${color.rgb}, 0.65))`,
              border: `1px solid rgba(${color.rgb}, 0.5)`,
              boxShadow: `0 4px 20px rgba(${color.rgb}, 0.2)`,
            }}
          >
            <FiEye className="w-4 h-4" aria-hidden="true" />
            View Details
          </motion.button>
        </div>
      </div>
    </motion.article>
  )
}

export default FeaturedProjectCard
