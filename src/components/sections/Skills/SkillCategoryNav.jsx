import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import { SKILL_CATEGORIES } from '@data/skills'

function SkillCategoryNav({ activeCategory, onCategoryChange }) {
  return (
    <div
      role="tablist"
      aria-label="Skill categories"
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
      style={{ scrollbarWidth: 'none' }}
    >
      {SKILL_CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id
        return (
          <motion.button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(cat.id)}
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
                layoutId="cat-active-pill"
                className={cn(
                  'absolute inset-0 rounded-pill',
                  'bg-gradient-to-r from-accent-blue/20 to-accent-purple/20',
                  'border border-accent-blue/35'
                )}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

export default SkillCategoryNav
