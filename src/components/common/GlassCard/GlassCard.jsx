import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import { cardHover } from '@utils/motion'

function GlassCard({
  children,
  className,
  blur = 'md',
  glow = false,
  hover = true,
  padding = 'md',
  as: Tag = 'div',
  ...props
}) {
  const blurMap = {
    sm: 'glass-sm',
    md: 'glass',
    lg: 'glass-heavy',
  }

  const paddingMap = {
    none: '',
    sm: 'p-5',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const Component = hover ? motion[Tag] || motion.div : Tag

  const motionProps = hover
    ? {
        initial: 'rest',
        whileHover: 'hover',
        variants: cardHover,
      }
    : {}

  return (
    <Component
      className={cn(
        'rounded-2xl',
        blurMap[blur],
        paddingMap[padding],
        glow && 'glow-blue',
        hover && 'cursor-pointer',
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}

export default GlassCard
