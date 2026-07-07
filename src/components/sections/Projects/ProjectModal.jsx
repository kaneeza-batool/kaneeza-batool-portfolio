import { useEffect, useRef, useMemo, useCallback, memo } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX, FiGithub, FiExternalLink,
  FiChevronLeft, FiChevronRight, FiChevronDown,
  FiUser, FiMonitor, FiServer, FiDatabase, FiCpu, FiCloud,
  FiZap, FiShield, FiUsers, FiBarChart2, FiSearch,
  FiActivity, FiLayers, FiCode, FiStar, FiPackage,
} from 'react-icons/fi'
import { ACCENT_COLORS, CATEGORY_META } from '@data/projects'
import { usePrefersReducedMotion } from '@hooks'
import { cn } from '@utils/helpers'
import { staggerContainer, fadeUp } from '@utils/motion'
import ProjectImagePlaceholder from './ProjectImagePlaceholder'

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_MAP = {
  completed:     { label: 'Completed',   dot: '#22C55E', bg: 'rgba(34,197,94,0.12)',    border: 'rgba(34,197,94,0.28)'    },
  'in-progress': { label: 'In Progress', dot: '#F59E0B', bg: 'rgba(245,158,11,0.12)',   border: 'rgba(245,158,11,0.28)'   },
  planned:       { label: 'Planned',     dot: '#6E7B9C', bg: 'rgba(110,123,156,0.12)',  border: 'rgba(110,123,156,0.28)'  },
}

const ARCH_TYPE_STYLE = {
  user:     { Icon: FiUser,     rgb: '46,107,255',  typeLabel: 'User'     },
  frontend: { Icon: FiMonitor,  rgb: '106,92,255',  typeLabel: 'Frontend' },
  backend:  { Icon: FiServer,   rgb: '34,197,94',   typeLabel: 'Backend'  },
  database: { Icon: FiDatabase, rgb: '245,158,11',  typeLabel: 'Database' },
  ai:       { Icon: FiCpu,      rgb: '6,182,212',   typeLabel: 'AI'       },
  service:  { Icon: FiCloud,    rgb: '236,72,153',  typeLabel: 'Service'  },
}

const TECH_GROUP_ORDER = ['frontend', 'backend', 'database', 'ai', 'tools']
const TECH_GROUP_LABELS = {
  frontend: 'Frontend',
  backend:  'Backend',
  database: 'Database',
  ai:       'AI',
  tools:    'Tools',
}

const FEATURE_ICON_POOL = [FiZap, FiShield, FiLayers, FiCpu, FiUsers, FiBarChart2, FiSearch, FiCode, FiActivity, FiStar, FiPackage]

// ─── StatusBadge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.planned
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-body font-medium"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.dot }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} aria-hidden="true" />
      {s.label}
    </span>
  )
}

// ─── CategoryBadge ────────────────────────────────────────────────────────────

function CategoryBadge({ cat }) {
  const meta  = CATEGORY_META[cat]
  if (!meta) return null
  const color = ACCENT_COLORS[meta.colorKey] ?? ACCENT_COLORS.blue
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-body font-semibold"
      style={{
        background:  `rgba(${color.rgb}, 0.18)`,
        border:      `1px solid rgba(${color.rgb}, 0.35)`,
        color:       color.hex,
      }}
    >
      {meta.label}
    </span>
  )
}

// ─── TechChip ─────────────────────────────────────────────────────────────────

function TechChip({ tech, color, small }) {
  return (
    <motion.span
      whileHover={{ scale: 1.06, y: -1 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'inline-flex items-center rounded-full font-mono font-medium border cursor-default select-none',
        small ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
      )}
      style={{
        color:        color.hex,
        borderColor:  `rgba(${color.rgb}, 0.28)`,
        background:   `rgba(${color.rgb}, 0.08)`,
      }}
    >
      {tech}
    </motion.span>
  )
}

// ─── ModalSection ─────────────────────────────────────────────────────────────

function ModalSection({ title, children, className }) {
  return (
    <motion.section variants={fadeUp} className={cn('', className)}>
      {title && (
        <p
          className="text-xs font-mono font-semibold uppercase tracking-widest mb-4"
          style={{ color: 'var(--color-accent-blue)' }}
        >
          {title}
        </p>
      )}
      {children}
    </motion.section>
  )
}

// ─── Architecture flow ────────────────────────────────────────────────────────

function ArchNode({ node }) {
  const style = ARCH_TYPE_STYLE[node.type] ?? ARCH_TYPE_STYLE.service
  const { Icon, rgb, typeLabel } = style
  return (
    <div
      className="flex items-center gap-3 w-full max-w-sm px-4 py-3 rounded-2xl border"
      style={{
        background:  `rgba(${rgb}, 0.07)`,
        borderColor: `rgba(${rgb}, 0.22)`,
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `rgba(${rgb}, 0.16)` }}
        aria-hidden="true"
      >
        <Icon size={15} style={{ color: `rgb(${rgb})` }} />
      </div>
      <span className="text-sm font-body font-medium text-white flex-1 leading-tight">
        {node.label}
      </span>
      <span
        className="text-xs font-mono px-2 py-0.5 rounded-lg flex-shrink-0"
        style={{ color: `rgb(${rgb})`, background: `rgba(${rgb}, 0.14)` }}
      >
        {typeLabel}
      </span>
    </div>
  )
}

function ArchFlow({ nodes }) {
  if (!nodes?.length) return null
  return (
    <div className="flex flex-col items-center gap-0">
      {nodes.map((node, i) => (
        <div key={`${node.label}-${i}`} className="flex flex-col items-center w-full">
          <ArchNode node={node} />
          {i < nodes.length - 1 && (
            <div className="flex flex-col items-center py-1" aria-hidden="true">
              <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <FiChevronDown size={13} style={{ color: 'var(--color-muted)' }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Feature grid ─────────────────────────────────────────────────────────────

function FeatureGrid({ features, color }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {features.map((feature, i) => {
        const Icon = FEATURE_ICON_POOL[i % FEATURE_ICON_POOL.length]
        return (
          <div
            key={i}
            className="flex items-start gap-3 p-3.5 rounded-2xl border"
            style={{
              background:  `rgba(${color.rgb}, 0.04)`,
              borderColor: `rgba(${color.rgb}, 0.14)`,
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `rgba(${color.rgb}, 0.16)` }}
              aria-hidden="true"
            >
              <Icon size={13} style={{ color: color.hex }} />
            </div>
            <span
              className="text-sm font-body leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {feature}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Tech stack grouped ───────────────────────────────────────────────────────

function TechGroupPanel({ techGroups, accentColor }) {
  const color  = ACCENT_COLORS[accentColor] ?? ACCENT_COLORS.blue
  const groups = TECH_GROUP_ORDER.filter((key) => techGroups?.[key]?.length > 0)
  if (!groups.length) return null

  return (
    <div className="flex flex-col gap-3">
      {groups.map((key) => (
        <div key={key} className="flex items-start gap-4">
          <span
            className="text-xs font-mono font-medium w-20 flex-shrink-0 pt-1"
            style={{ color: 'var(--color-muted)' }}
          >
            {TECH_GROUP_LABELS[key]}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {techGroups[key].map((tech) => (
              <TechChip key={tech} tech={tech} color={color} small />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Screenshot gallery ───────────────────────────────────────────────────────

function ScreenshotGallery({ gallery, title, accentColor }) {
  if (!gallery?.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden"
            style={{
              paddingTop:  '62.5%',
              background:  '#0D1F43',
              border:      '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="absolute inset-0">
              <ProjectImagePlaceholder
                title={`${title} ${i + 1}`}
                accentColor={accentColor}
              />
            </div>
            <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-lg"
                style={{
                  color:      'var(--color-muted)',
                  background: 'rgba(5,14,32,0.7)',
                  border:     '1px solid rgba(255,255,255,0.06)',
                }}
              >
                Screenshot coming soon
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {gallery.map((src, i) => (
        <div
          key={i}
          className="relative rounded-2xl overflow-hidden"
          style={{ paddingTop: '62.5%' }}
        >
          <motion.img
            src={src}
            alt={`${title} screenshot ${i + 1}`}
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

// ─── Future improvements ──────────────────────────────────────────────────────

function ImprovementChips({ text, color }) {
  const items = text
    .split(', ')
    .map((s) => s.replace(/^and\s+/i, '').trim())
    .filter(Boolean)

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-body border"
          style={{
            color:        'var(--color-text-secondary)',
            borderColor:  `rgba(${color.rgb}, 0.18)`,
            background:   `rgba(${color.rgb}, 0.05)`,
          }}
        >
          <span
            className="w-1 h-1 rounded-full flex-shrink-0"
            style={{ background: color.hex }}
            aria-hidden="true"
          />
          {item}
        </span>
      ))}
    </div>
  )
}

// ─── Related project card ─────────────────────────────────────────────────────

function RelatedCard({ project, onNavigate, reduced }) {
  const color   = ACCENT_COLORS[project.accentColor] ?? ACCENT_COLORS.blue
  const catMeta = CATEGORY_META[project.category[0]]

  return (
    <motion.button
      onClick={() => onNavigate(project)}
      whileHover={reduced ? {} : {
        y: -5,
        boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(${color.rgb}, 0.12)`,
      }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-left w-full rounded-2xl overflow-hidden border"
      style={{
        background:   '#0D1F43',
        borderColor:  'rgba(255,255,255,0.08)',
        boxShadow:    '0 4px 20px rgba(0,0,0,0.3)',
      }}
      aria-label={`Open ${project.title}`}
    >
      <div className="relative overflow-hidden flex-shrink-0" style={{ paddingTop: '56%' }}>
        <div className="absolute inset-0">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <ProjectImagePlaceholder title={project.title} accentColor={project.accentColor} />
          )}
        </div>
        {catMeta && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className="text-xs font-body font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: `rgba(${color.rgb}, 0.22)`,
                border:     `1px solid rgba(${color.rgb}, 0.35)`,
                color:      color.hex,
              }}
            >
              {catMeta.label}
            </span>
          </div>
        )}
      </div>
      <div className="p-3.5">
        <p className="text-sm font-heading font-bold text-white leading-tight truncate">
          {project.title}
        </p>
        <p
          className="text-xs mt-1 leading-snug line-clamp-2"
          style={{ color: 'var(--color-muted)' }}
        >
          {project.shortDescription}
        </p>
      </div>
    </motion.button>
  )
}

// ─── Sticky top bar ───────────────────────────────────────────────────────────

function StickyBar({ project, allProjects, onClose, onNavigate, reduced }) {
  const currentIndex = allProjects.findIndex((p) => p.id === project.id)
  const prevProject  = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject  = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 md:px-6 flex-shrink-0"
      style={{
        background:   'rgba(8,27,58,0.96)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* Prev / Next navigation */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button
          onClick={() => prevProject && onNavigate(prevProject)}
          disabled={!prevProject}
          aria-label="Previous project"
          className={cn(
            'p-2 rounded-lg transition-colors duration-150',
            prevProject
              ? 'hover:bg-white/8 cursor-pointer'
              : 'opacity-25 cursor-not-allowed',
          )}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <FiChevronLeft size={16} aria-hidden="true" />
        </button>
        <button
          onClick={() => nextProject && onNavigate(nextProject)}
          disabled={!nextProject}
          aria-label="Next project"
          className={cn(
            'p-2 rounded-lg transition-colors duration-150',
            nextProject
              ? 'hover:bg-white/8 cursor-pointer'
              : 'opacity-25 cursor-not-allowed',
          )}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <FiChevronRight size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Title + counter */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-heading font-bold text-white truncate leading-tight">
          {project.title}
        </p>
        <p className="text-xs font-mono leading-tight" style={{ color: 'var(--color-muted)' }}>
          {currentIndex + 1} / {allProjects.length}
        </p>
      </div>

      {/* GitHub shortcut (compact) */}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub for ${project.title}`}
          className="hidden sm:flex p-2 rounded-lg transition-colors duration-150 hover:bg-white/8"
          style={{ color: 'var(--color-muted)' }}
        >
          <FiGithub size={15} aria-hidden="true" />
        </a>
      )}

      {/* Close */}
      <motion.button
        whileHover={reduced ? {} : { scale: 1.1 }}
        whileTap={reduced ? {} : { scale: 0.92 }}
        onClick={onClose}
        aria-label="Close modal"
        className="p-2 rounded-xl transition-colors duration-150 hover:bg-white/8 flex-shrink-0"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <FiX size={18} aria-hidden="true" />
      </motion.button>
    </div>
  )
}

// ─── Modal content (re-mounts per project) ────────────────────────────────────

const ModalContent = memo(function ModalContent({ project, allProjects, onNavigate, reduced }) {
  const color = useMemo(
    () => ACCENT_COLORS[project.accentColor] ?? ACCENT_COLORS.blue,
    [project.accentColor],
  )

  const relatedProjects = useMemo(() => {
    const others = allProjects.filter((p) => p.id !== project.id)
    const scored = others
      .map((p) => ({
        p,
        score: p.category.filter((c) => project.category.includes(c)).length,
      }))
      .sort((a, b) => b.score - a.score)
    return scored.slice(0, 3).map((s) => s.p)
  }, [project, allProjects])

  const containerVariants = useMemo(
    () => staggerContainer(reduced ? 0 : 0.07, reduced ? 0 : 0.08),
    [reduced],
  )

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Hero image ── */}
      <motion.div variants={fadeUp} className="relative overflow-hidden" style={{ paddingTop: '45%' }}>
        <div className="absolute inset-0">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover"
            />
          ) : (
            <ProjectImagePlaceholder title={project.title} accentColor={project.accentColor} />
          )}
        </div>
        {/* Bottom gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #081B3A 0%, transparent 100%)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Header: title, badges, buttons ── */}
      <motion.div variants={fadeUp} className="px-6 md:px-8 pb-6 pt-4">
        {/* Category + status badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.category.map((cat) => (
            <CategoryBadge key={cat} cat={cat} />
          ))}
          <StatusBadge status={project.status} />
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full"
            style={{
              color:      'var(--color-muted)',
              background: 'rgba(255,255,255,0.05)',
              border:     '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h2
          id="modal-project-title"
          className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight mb-4"
        >
          {project.title}
        </h2>

        {/* Tech chips (header row) */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <TechChip key={tech} tech={tech} color={color} />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              whileHover={reduced ? {} : { scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-medium border transition-colors duration-200 hover:bg-white/5"
              style={{
                color:       'var(--color-text-secondary)',
                borderColor: 'rgba(255,255,255,0.12)',
              }}
            >
              <FiGithub size={15} aria-hidden="true" />
              GitHub
            </motion.a>
          )}
          {project.liveDemo && (
            <motion.a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo of ${project.title}`}
              whileHover={reduced ? {} : { scale: 1.03, boxShadow: `0 8px 24px rgba(${color.rgb},0.3)` }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-semibold border transition-all duration-200"
              style={{
                color:       '#fff',
                background:  `linear-gradient(135deg, rgba(${color.rgb},0.85), rgba(${color.rgb},0.6))`,
                borderColor: `rgba(${color.rgb},0.45)`,
                boxShadow:   `0 4px 16px rgba(${color.rgb},0.2)`,
              }}
            >
              <FiExternalLink size={15} aria-hidden="true" />
              Live Demo
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* ── Section divider ── */}
      <div
        className="mx-6 md:mx-8 mb-8"
        style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
        aria-hidden="true"
      />

      {/* ── Content sections ── */}
      <div className="px-6 md:px-8 flex flex-col gap-10 pb-12">

        {/* Overview */}
        <ModalSection title="Overview">
          <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {project.overview}
          </p>
        </ModalSection>

        {/* Problem + Solution */}
        <ModalSection title="Problem & Solution">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="p-4 rounded-2xl border"
              style={{
                background:  'rgba(245,158,11,0.05)',
                borderColor: 'rgba(245,158,11,0.16)',
              }}
            >
              <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: '#F59E0B' }}>
                Problem
              </p>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {project.problem}
              </p>
            </div>
            <div
              className="p-4 rounded-2xl border"
              style={{
                background:  `rgba(${color.rgb}, 0.05)`,
                borderColor: `rgba(${color.rgb}, 0.18)`,
              }}
            >
              <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: color.hex }}>
                Solution
              </p>
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {project.solution}
              </p>
            </div>
          </div>
        </ModalSection>

        {/* Key Features */}
        {project.features?.length > 0 && (
          <ModalSection title="Key Features">
            <FeatureGrid features={project.features} color={color} />
          </ModalSection>
        )}

        {/* Architecture */}
        {project.architecture?.length > 0 && (
          <ModalSection title="Architecture">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
              <div className="w-full md:max-w-xs">
                <ArchFlow nodes={project.architecture} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-body leading-relaxed"
                  style={{ color: 'var(--color-muted)' }}
                >
                  The architecture above shows the high-level data flow — from user interaction through
                  the frontend layer, into the backend logic, and out to storage or external services.
                  Each layer is independently scoped to keep concerns separated and the system easy to extend.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.architecture.map((node) => {
                    const s = ARCH_TYPE_STYLE[node.type] ?? ARCH_TYPE_STYLE.service
                    return (
                      <span
                        key={node.label}
                        className="text-xs font-mono px-2 py-0.5 rounded-lg"
                        style={{
                          color:      `rgb(${s.rgb})`,
                          background: `rgba(${s.rgb}, 0.1)`,
                          border:     `1px solid rgba(${s.rgb}, 0.2)`,
                        }}
                      >
                        {node.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </ModalSection>
        )}

        {/* Tech Stack grouped */}
        {project.techGroups && (
          <ModalSection title="Tech Stack">
            <TechGroupPanel techGroups={project.techGroups} accentColor={project.accentColor} />
          </ModalSection>
        )}

        {/* Screenshots */}
        <ModalSection title="Screenshots">
          <ScreenshotGallery
            gallery={project.gallery}
            title={project.title}
            accentColor={project.accentColor}
          />
        </ModalSection>

        {/* Lessons Learned */}
        {project.lessonsLearned && (
          <ModalSection title="Lessons Learned">
            <div
              className="p-4 rounded-2xl border-l-2 pl-5"
              style={{
                background:  'rgba(255,255,255,0.03)',
                borderColor: color.hex,
                border:      `1px solid rgba(255,255,255,0.06)`,
                borderLeft:  `3px solid ${color.hex}`,
              }}
            >
              <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {project.lessonsLearned}
              </p>
            </div>
          </ModalSection>
        )}

        {/* Future Improvements */}
        {project.futureImprovements && (
          <ModalSection title="Future Improvements">
            <ImprovementChips text={project.futureImprovements} color={color} />
          </ModalSection>
        )}

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <ModalSection title="Related Projects">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((rel) => (
                <RelatedCard
                  key={rel.id}
                  project={rel}
                  onNavigate={onNavigate}
                  reduced={reduced}
                />
              ))}
            </div>
          </ModalSection>
        )}
      </div>
    </motion.div>
  )
})

// ─── Root modal (portal) ──────────────────────────────────────────────────────

function ProjectModal({ project, allProjects, onClose, onNavigate }) {
  const reduced       = usePrefersReducedMotion()
  const panelRef      = useRef(null)
  const scrollBodyRef = useRef(null)
  const isOpen        = !!project

  // ── Scroll lock ──
  useEffect(() => {
    if (!isOpen) return
    const w = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow    = 'hidden'
    document.body.style.paddingRight = `${w}px`
    return () => {
      document.body.style.overflow    = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  // ── Return focus on close ──
  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement
    return () => {
      setTimeout(() => prev?.focus(), 50)
    }
  }, [isOpen])

  // ── Keyboard: Escape + arrow navigation ──
  useEffect(() => {
    if (!isOpen || !project) return

    const currentIndex = allProjects.findIndex((p) => p.id === project.id)
    const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null
    const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

    function onKeyDown(e) {
      if (e.key === 'Escape')      { e.preventDefault(); onClose() }
      else if (e.key === 'ArrowLeft'  && prev) { e.preventDefault(); onNavigate(prev) }
      else if (e.key === 'ArrowRight' && next) { e.preventDefault(); onNavigate(next) }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, project, allProjects, onClose, onNavigate])

  // ── Focus trap ──
  useEffect(() => {
    if (!isOpen || !panelRef.current) return

    const QUERY = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
    const timer = setTimeout(() => {
      panelRef.current?.querySelectorAll(QUERY)?.[0]?.focus()
    }, 150)

    function onKeyDown(e) {
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = [...panelRef.current.querySelectorAll(QUERY)]
      if (!focusable.length) return
      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    panelRef.current.addEventListener('keydown', onKeyDown)
    const ref = panelRef.current
    return () => {
      clearTimeout(timer)
      ref.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  // ── Scroll to top on project navigate ──
  const handleNavigate = useCallback(
    (nextProject) => {
      onNavigate(nextProject)
      requestAnimationFrame(() => {
        scrollBodyRef.current?.scrollTo({ top: 0, behavior: 'instant' })
      })
    },
    [onNavigate],
  )

  const panelVariants = {
    hidden:  { opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { duration: reduced ? 0.1 : 0.32, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.06 },
    },
    exit: {
      opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 20,
      transition: { duration: reduced ? 0.1 : 0.22, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const contentVariants = {
    hidden:  { opacity: 0, x: reduced ? 0 : 10 },
    visible: { opacity: 1, x: 0, transition: { duration: reduced ? 0.1 : 0.24, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:    { opacity: 0, x: reduced ? 0 : -10, transition: { duration: reduced ? 0.1 : 0.18 } },
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        /* Single root motion.div = backdrop + click-to-close + centering shell.
           Must be a direct AnimatePresence child (no fragment) so exit fires. */
        <motion.div
          key="pm-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: reduced ? 0.1 : 0.22 } }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0.1 : 0.2 } }}
          onClick={onClose}
          className="fixed inset-0 z-[499] flex items-end sm:items-center justify-center px-0 sm:px-6 md:px-8"
          style={{
            background:          'rgba(5,14,32,0.88)',
            backdropFilter:       'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* ── Modal panel ── */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl h-[96dvh] sm:h-[90dvh]"
            style={{
              background: '#081B3A',
              border:     '1px solid rgba(255,255,255,0.07)',
              boxShadow:  '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
              {/* Sticky bar — never scrolls */}
              <StickyBar
                project={project}
                allProjects={allProjects}
                onClose={onClose}
                onNavigate={handleNavigate}
                reduced={reduced}
              />

              {/* Scrollable body */}
              <div ref={scrollBodyRef} className="flex-1 overflow-y-auto min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.id}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ModalContent
                      project={project}
                      allProjects={allProjects}
                      onNavigate={handleNavigate}
                      reduced={reduced}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default ProjectModal
