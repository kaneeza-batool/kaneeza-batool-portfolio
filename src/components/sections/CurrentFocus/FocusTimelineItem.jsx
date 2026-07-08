import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { fadeLeft, viewportConfig } from '@utils/motion'

function FocusTimelineItem({ item, index, isLast }) {
  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ delay: index * 0.1 }}
      className="relative flex gap-4"
    >
      {/* Connector line */}
      {!isLast && (
        <div
          className="absolute left-[15px] top-8 bottom-0 w-px bg-white/8"
          aria-hidden="true"
        />
      )}

      {/* Check dot */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 mt-0.5"
        style={{
          background: 'rgba(34,197,94,0.12)',
          border: '1px solid rgba(34,197,94,0.4)',
        }}
        aria-hidden="true"
      >
        <FiCheck size={13} color="#22C55E" />
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${!isLast ? 'pb-6' : 'pb-1'}`}>
        <span className="text-xs font-mono text-muted">{item.date}</span>
        <h4 className="text-small font-heading font-semibold text-white mt-0.5 mb-1">
          {item.title}
        </h4>
        <p className="text-xs text-muted leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  )
}

export default FocusTimelineItem
