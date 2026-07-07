import { motion } from 'framer-motion'
import { FaCircleCheck } from 'react-icons/fa6'
import { GlassCard } from '@components/common'
import { staggerContainer, fadeUp, fadeLeft, viewportConfig } from '@utils/motion'
import { FOCUS_ITEMS } from '@data/about'

function AboutFocusPanel() {
  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <motion.div variants={fadeUp}>
        <GlassCard hover={false} padding="lg" className="relative overflow-hidden">
          {/* Accent left border */}
          <div
            className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full"
            style={{ background: 'linear-gradient(180deg, #2E6BFF 0%, #6A5CFF 100%)' }}
            aria-hidden="true"
          />

          {/* Header */}
          <motion.div variants={fadeLeft} className="flex items-center gap-3 mb-5 pl-2">
            <span
              className="h-px w-6 shrink-0"
              style={{ background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)' }}
              aria-hidden="true"
            />
            <h3 className="text-xs font-mono font-medium text-accent-blue tracking-widest uppercase">
              Currently Focused On
            </h3>
          </motion.div>

          {/* Checklist */}
          <ul className="flex flex-col gap-3 pl-2" aria-label="Current focus areas">
            {FOCUS_ITEMS.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3"
              >
                <FaCircleCheck
                  size={14}
                  className="text-accent-blue shrink-0"
                  aria-hidden="true"
                />
                <span className="text-text-secondary" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

export default AboutFocusPanel
