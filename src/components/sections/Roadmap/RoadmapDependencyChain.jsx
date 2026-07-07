import { FiArrowDown } from 'react-icons/fi'
import { SKILL_DEPENDENCY_CHAIN, STATUS_CONFIG } from '@data/roadmap'

function RoadmapDependencyChain({ currentStage }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-mono font-medium tracking-wider uppercase text-muted mb-3">
        Skill Path
      </p>
      <div className="flex flex-col items-start gap-0">
        {SKILL_DEPENDENCY_CHAIN.map((node, idx) => {
          const cfg = STATUS_CONFIG[node.status]
          const isThis = node.stage === currentStage
          const isPast = node.stage < currentStage
          const isLast = idx === SKILL_DEPENDENCY_CHAIN.length - 1

          return (
            <div key={node.stage} className="flex flex-col items-start">
              {/* Chip */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all duration-200"
                style={{
                  backgroundColor: isThis
                    ? cfg.bgColor
                    : isPast
                    ? 'rgba(34,197,94,0.06)'
                    : 'rgba(255,255,255,0.03)',
                  borderColor: isThis
                    ? cfg.borderColor
                    : isPast
                    ? 'rgba(34,197,94,0.25)'
                    : 'rgba(255,255,255,0.08)',
                  color: isThis ? cfg.color : isPast ? '#22C55E' : '#6E7B9C',
                  boxShadow: isThis ? `0 0 12px ${cfg.glowColor}` : 'none',
                  fontWeight: isThis ? 600 : 400,
                }}
              >
                {/* Stage dot */}
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: isThis
                      ? cfg.color
                      : isPast
                      ? '#22C55E'
                      : 'rgba(255,255,255,0.2)',
                  }}
                />
                {node.label}
                {isThis && (
                  <span
                    className="text-2xs font-body tracking-wide"
                    style={{ color: cfg.color, opacity: 0.8 }}
                  >
                    ← you are here
                  </span>
                )}
              </div>

              {/* Connector arrow */}
              {!isLast && (
                <div className="flex items-center justify-start pl-3 py-0.5">
                  <FiArrowDown
                    className="w-3 h-3"
                    style={{
                      color:
                        isPast && SKILL_DEPENDENCY_CHAIN[idx + 1]?.stage <= currentStage
                          ? '#22C55E'
                          : 'rgba(255,255,255,0.15)',
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RoadmapDependencyChain
