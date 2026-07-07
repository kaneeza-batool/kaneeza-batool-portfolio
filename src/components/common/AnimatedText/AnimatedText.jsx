import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function AnimatedText({
  text,
  as: Tag = 'p',
  className,
  splitBy = 'word',
  delay = 0,
  once = true,
}) {
  const items =
    splitBy === 'word'
      ? text.split(' ')
      : text.split('')

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: splitBy === 'word' ? 0.06 : 0.03,
            delayChildren: delay,
          },
        },
      }}
      aria-label={text}
      className={cn('inline-flex flex-wrap gap-x-[0.25em]', className)}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          aria-hidden="true"
          className="inline-block"
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default AnimatedText
