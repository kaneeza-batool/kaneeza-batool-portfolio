import { motion } from 'framer-motion'
import { fadeUp, viewportConfig } from '@utils/motion'
import { usePrefersReducedMotion } from '@hooks'
import { GOAL_PRIORITY } from '@data/currentFocus'

function FocusGoalRow({ goal, index }) {
  const reduced = usePrefersReducedMotion()
  const priority = GOAL_PRIORITY[goal.priority] ?? GOAL_PRIORITY.medium
  const Icon = goal.icon

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.07 }}
      className="group flex flex-col gap-2.5 p-4 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 hover:bg-white/[0.05] transition-all duration-300"
    >
      {/* Icon + title + priority */}
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
          style={{
            background: `${priority.color}18`,
            border: `1px solid ${priority.color}40`,
          }}
          aria-hidden="true"
        >
          <Icon size={14} style={{ color: priority.color }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-small font-heading font-semibold text-white">
              {goal.title}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border leading-none ${priority.badgeClass}`}>
              {priority.label}
            </span>
          </div>
          <p className="text-xs text-muted mt-1 leading-relaxed">{goal.description}</p>
        </div>
      </div>

      {/* Progress + deadline */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: priority.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${goal.progress}%` }}
            viewport={{ once: true }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 1, ease: 'easeOut', delay: 0.15 + index * 0.07 }
            }
          />
        </div>
        <span className="text-xs font-mono text-muted shrink-0">{goal.progress}%</span>
        <span
          className="text-[10px] font-mono text-muted shrink-0 px-2 py-0.5 rounded-full bg-white/4 border border-white/8"
        >
          {goal.deadline}
        </span>
      </div>
    </motion.div>
  )
}

export default FocusGoalRow
