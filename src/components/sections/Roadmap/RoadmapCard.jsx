import { memo } from 'react'
import { motion } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { fadeLeft, fadeRight, viewportConfig } from '@utils/motion'
import { STATUS_CONFIG } from '@data/roadmap'
import RoadmapProgressBar from './RoadmapProgressBar'
import RoadmapExpandedPanel from './RoadmapExpandedPanel'

function RoadmapCard({ item, expanded, onToggle, side = 'left' }) {
  const cfg = STATUS_CONFIG[item.status]
  const Icon = item.icon
  const fadeVariant = side === 'right' ? fadeRight : fadeLeft

  return (
    <motion.div
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, rgba(13,31,67,0.7) 0%, rgba(8,27,58,0.8) 100%)`,
          border: `1px solid ${expanded ? cfg.borderColor : 'rgba(255,255,255,0.07)'}`,
          boxShadow: expanded
            ? `0 0 32px ${cfg.glowColor}, 0 8px 32px rgba(0,0,0,0.4)`
            : '0 4px 24px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Status accent bar on top */}
        <div
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${cfg.color}, transparent)`,
          }}
        />

        <div className="p-5 sm:p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              {/* Stage icon */}
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
                style={{
                  backgroundColor: cfg.bgColor,
                  border: `1px solid ${cfg.borderColor}`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: cfg.color }} />
              </div>

              <div className="min-w-0">
                <span
                  className="text-2xs font-mono font-medium tracking-widest uppercase block"
                  style={{ color: cfg.color, opacity: 0.75 }}
                >
                  Stage {item.stage}
                </span>
                <h3 className="text-base sm:text-lg font-heading font-bold text-white leading-snug mt-0.5">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Status badge */}
            <span
              className={`text-2xs font-mono font-medium px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap ${cfg.badgeClass}`}
            >
              {cfg.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm font-body text-text-secondary leading-relaxed mb-5">
            {item.description}
          </p>

          {/* Progress bar */}
          <div className="mb-4">
            <RoadmapProgressBar status={item.status} />
          </div>

          {/* Estimated completion */}
          <p
            className="text-xs font-mono mb-5"
            style={{ color: 'rgba(168,178,209,0.6)' }}
          >
            {item.estimatedCompletion}
          </p>

          {/* Skills chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="text-2xs font-mono px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: '#A8B2D1',
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Expand toggle */}
          <button
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={`roadmap-details-${item.id}`}
            className="flex items-center gap-2 text-xs font-mono font-medium transition-all duration-200 rounded-lg px-3 py-2 -ml-3 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              color: cfg.color,
              backgroundColor: expanded ? cfg.bgColor : 'transparent',
              border: `1px solid ${expanded ? cfg.borderColor : 'transparent'}`,
            }}
          >
            {expanded ? (
              <>
                <FiChevronUp className="w-3.5 h-3.5" />
                Hide Details
              </>
            ) : (
              <>
                <FiChevronDown className="w-3.5 h-3.5" />
                View Details
              </>
            )}
          </button>

          {/* Expanded panel */}
          <div id={`roadmap-details-${item.id}`}>
            <RoadmapExpandedPanel item={item} isExpanded={expanded} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(RoadmapCard)
