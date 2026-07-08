import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { fadeUp, viewportConfig } from '@utils/motion'
import { ACCEPTING } from '@data/contact'

function ContactAccepting() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="mt-20 pt-10 border-t border-white/8"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <span className="text-[10px] font-mono text-muted uppercase tracking-[0.18em] whitespace-nowrap">
          Currently accepting
        </span>

        <div className="flex flex-wrap gap-2 justify-center">
          {ACCEPTING.map((item, i) => (
            <motion.div
              key={item.label}
              initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              className="flex items-center gap-2 px-3 py-1.5 glass-sm rounded-pill border border-white/8 hover:border-white/15 transition-all duration-300"
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: item.color,
                  animation: reducedMotion ? 'none' : 'pulse-slow 2.5s ease-in-out infinite',
                  animationDelay: `${i * 0.4}s`,
                }}
                aria-hidden="true"
              />
              <span className="text-xs text-text-secondary font-body whitespace-nowrap">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ContactAccepting
