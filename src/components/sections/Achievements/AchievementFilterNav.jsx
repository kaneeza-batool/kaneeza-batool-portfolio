import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import { ACHIEVEMENT_FILTERS } from '@data/achievements'

function AchievementFilterNav({ activeFilter, onFilterChange }) {
  return (
    <div
      role="tablist"
      aria-label="Filter achievements by category"
      className="flex gap-2 flex-wrap justify-center"
    >
      {ACHIEVEMENT_FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id
        return (
          <motion.button
            key={filter.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(filter.id)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative px-5 py-2 rounded-pill text-sm font-body font-medium',
              'whitespace-nowrap transition-colors duration-200 outline-none',
              'focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
              isActive ? 'text-white' : 'text-text-secondary hover:text-white'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="ach-filter-pill"
                className="absolute inset-0 rounded-pill bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 border border-accent-blue/35"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{filter.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

export default AchievementFilterNav
