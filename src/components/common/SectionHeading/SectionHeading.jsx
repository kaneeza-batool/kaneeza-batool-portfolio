import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'

function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  className,
}) {
  const alignMap = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  }

  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={cn('flex flex-col gap-3', alignMap[align], className)}
    >
      {subtitle && (
        <motion.span
          variants={fadeUp}
          className={cn(
            'text-xs font-mono font-medium tracking-widest uppercase',
            'text-accent-blue px-3 py-1 rounded-pill',
            'bg-accent-blue/10 border border-accent-blue/20',
            'inline-flex items-center gap-2',
            align === 'center' && 'self-center'
          )}
        >
          <span className="w-1 h-1 rounded-full bg-accent-blue inline-block" aria-hidden="true" />
          {subtitle}
        </motion.span>
      )}

      {title && (
        <motion.h2
          variants={fadeUp}
          className="text-section font-heading font-bold text-white"
        >
          {title}
        </motion.h2>
      )}

      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            'text-body text-text-secondary max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading
