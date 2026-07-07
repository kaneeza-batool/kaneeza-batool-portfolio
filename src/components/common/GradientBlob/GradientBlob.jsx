import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

function GradientBlob({
  color = 'blue',
  size = 'md',
  className,
  animate = true,
  opacity = 0.15,
}) {
  const colors = {
    blue:   'rgba(46, 107, 255,',
    purple: 'rgba(106, 92, 255,',
    mixed:  null,
  }

  const sizes = {
    sm:  'w-64 h-64',
    md:  'w-96 h-96',
    lg:  'w-[600px] h-[600px]',
    xl:  'w-[800px] h-[800px]',
  }

  const bgStyle =
    color === 'mixed'
      ? {
          background: `radial-gradient(circle, rgba(46,107,255,${opacity}) 0%, rgba(106,92,255,${opacity * 0.5}) 50%, transparent 70%)`,
        }
      : {
          background: `radial-gradient(circle, ${colors[color]}${opacity}) 0%, transparent 70%)`,
        }

  return (
    <motion.div
      className={cn(
        'absolute rounded-full pointer-events-none blur-3xl',
        sizes[size],
        className
      )}
      style={bgStyle}
      animate={
        animate
          ? {
              scale: [1, 1.1, 1],
              opacity: [opacity, opacity * 0.7, opacity],
            }
          : undefined
      }
      transition={
        animate
          ? { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
      aria-hidden="true"
    />
  )
}

export default GradientBlob
