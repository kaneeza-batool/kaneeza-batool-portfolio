import { motion, AnimatePresence } from 'framer-motion'
import { FiTarget, FiBook, FiBox, FiTrendingUp } from 'react-icons/fi'
import { STATUS_CONFIG } from '@data/roadmap'
import RoadmapDependencyChain from './RoadmapDependencyChain'

function SectionLabel({ icon: Icon, label, color }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
      <span
        className="text-xs font-mono font-semibold tracking-wider uppercase"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  )
}

function RoadmapExpandedPanel({ item, isExpanded }) {
  const cfg = STATUS_CONFIG[item.status]
  const { goals, futureOutcomes } = item.expandedContent

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          key="expanded"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ overflow: 'hidden' }}
        >
          <div
            className="mt-5 pt-5 space-y-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Goals */}
            <div>
              <SectionLabel icon={FiTarget} label="Learning Goals" color={cfg.color} />
              <ul className="space-y-2">
                {goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span className="text-sm font-body leading-relaxed text-text-secondary">
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources + Projects side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Resources */}
              <div>
                <SectionLabel icon={FiBook} label="Key Resources" color={cfg.color} />
                <ul className="space-y-2">
                  {item.resources.map((res, i) => (
                    <li key={i} className="flex items-center justify-between gap-2">
                      <span className="text-xs font-body text-text-secondary truncate">
                        {res.title}
                      </span>
                      <span
                        className="text-2xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: `${cfg.color}12`,
                          color: cfg.color,
                          border: `1px solid ${cfg.color}25`,
                        }}
                      >
                        {res.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div>
                <SectionLabel icon={FiBox} label="Related Projects" color={cfg.color} />
                <ul className="space-y-2">
                  {item.projects.map((proj, i) => (
                    <li key={i} className="flex items-center justify-between gap-2">
                      <span className="text-xs font-body text-text-secondary truncate">
                        {proj.title}
                      </span>
                      <span
                        className="text-2xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: `${cfg.color}12`,
                          color: cfg.color,
                          border: `1px solid ${cfg.color}25`,
                        }}
                      >
                        {proj.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dependency chain + Future outcomes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <RoadmapDependencyChain currentStage={item.stage} />

              {/* Future outcomes */}
              <div>
                <SectionLabel icon={FiTrendingUp} label="Future Outcomes" color={cfg.color} />
                <ul className="space-y-2">
                  {futureOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cfg.color }}
                      />
                      <span className="text-xs font-body leading-relaxed text-text-secondary">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default RoadmapExpandedPanel
