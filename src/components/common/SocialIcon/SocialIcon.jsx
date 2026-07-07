import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

function SocialIcon({
  href,
  icon: Icon,
  label,
  size = 'md',
  className,
}) {
  const sizes = {
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
      className={cn(
        'inline-flex items-center justify-center rounded-xl',
        'glass text-text-secondary',
        'hover:text-accent-blue hover:border-accent-blue/30',
        'transition-colors duration-300',
        'focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2',
        sizes[size],
        className
      )}
    >
      <Icon aria-hidden="true" />
    </motion.a>
  )
}

export default SocialIcon
