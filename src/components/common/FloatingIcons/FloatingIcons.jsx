import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

function FloatingIcons({ items = [], className }) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}
      aria-hidden="true"
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          className={cn(
            'absolute flex items-center justify-center',
            'rounded-2xl glass text-xl',
            item.className
          )}
          style={item.style}
          animate={{
            y: [0, item.floatY ?? -16, 0],
            rotate: [0, item.rotate ?? 5, 0],
          }}
          transition={{
            duration: item.duration ?? 4,
            delay: item.delay ?? i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingIcons
