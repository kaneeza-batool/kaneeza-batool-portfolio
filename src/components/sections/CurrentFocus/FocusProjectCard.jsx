import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { GlassCard } from '@components/common'
import { fadeUp, viewportConfig } from '@utils/motion'
import { usePrefersReducedMotion } from '@hooks'
import { COLOR_KEYS, PROJECT_STATUS } from '@data/currentFocus'

function FocusProjectCard({ project, index }) {
  const reduced = usePrefersReducedMotion()
  const colors = COLOR_KEYS[project.colorKey] ?? COLOR_KEYS.blue
  const status = PROJECT_STATUS[project.status] ?? PROJECT_STATUS.active

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.12 }}
      className="h-full"
    >
      <GlassCard hover padding="lg" className="relative overflow-hidden h-full flex flex-col gap-5">
        {/* Left accent bar */}
        <div
          className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{ background: colors.accent }}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 pl-3">
          <h3 className="text-subheading font-heading font-semibold text-white leading-snug">
            {project.title}
          </h3>
          <span
            className={`text-xs font-mono px-2.5 py-1 rounded-full shrink-0 ${status.badgeClass}`}
          >
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-body text-text-secondary leading-relaxed pl-3">
          {project.description}
        </p>

        {/* Progress */}
        <div className="flex flex-col gap-2 pl-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted tracking-wide">Progress</span>
            <span className="text-xs font-mono font-semibold" style={{ color: colors.accent }}>
              {project.progress}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: colors.bar }}
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              viewport={{ once: true }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 1.2, ease: 'easeOut', delay: 0.3 + index * 0.12 }
              }
            />
          </div>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-2 pl-3">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        {project.link && (
          <div className="pl-3 mt-auto">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono transition-opacity duration-200 hover:opacity-80"
              style={{ color: colors.accent }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <FiGithub size={13} aria-hidden="true" />
              View on GitHub
              <FiExternalLink size={11} aria-hidden="true" />
            </a>
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}

export default FocusProjectCard
