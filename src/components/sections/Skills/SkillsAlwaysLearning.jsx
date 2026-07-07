import { motion } from 'framer-motion'
import { TbSparkles } from 'react-icons/tb'
import { fadeUp, viewportConfig } from '@utils/motion'

const LEARNING_TAGS = [
  'Side Projects',
  'Hackathons',
  'Online Courses',
  'Open Source',
  'Certifications',
  'Documentation',
  'Experimentation',
]

function SkillsAlwaysLearning() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={[
        'relative rounded-2xl overflow-hidden',
        'glass px-8 py-10 md:px-12',
        'border border-white/[0.07]',
      ].join(' ')}
    >
      {/* Soft radial highlight */}
      <div
        className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 0% 0%, rgba(46,107,255,0.10) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 100% 100%, rgba(106,92,255,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8">
        {/* Left — text */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(46,107,255,0.12)' }}
              aria-hidden="true"
            >
              <TbSparkles size={20} style={{ color: 'var(--color-accent-blue)' }} />
            </div>
            <h3
              className="font-heading font-bold text-gradient"
              style={{ fontSize: 'clamp(1.15rem, 2vw, 1.5rem)' }}
            >
              Always Learning
            </h3>
          </div>

          <p
            className="leading-relaxed"
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.9375rem',
              lineHeight: 1.75,
            }}
          >
            My growth doesn&apos;t come from coursework alone. I continuously
            improve through hands-on projects, hackathons, certifications, and
            deliberate experimentation — treating every build as an opportunity
            to go deeper, break things intentionally, and emerge with genuine
            understanding.
          </p>
        </div>

        {/* Right — activity tags */}
        <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
          {LEARNING_TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{
                duration: 0.4,
                ease: [0.175, 0.885, 0.32, 1.275],
                delay: 0.05 * i,
              }}
              className={[
                'px-3 py-1.5 rounded-pill text-xs font-body font-medium',
                'border transition-colors duration-200',
              ].join(' ')}
              style={{
                background: 'rgba(46,107,255,0.06)',
                borderColor: 'rgba(46,107,255,0.20)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default SkillsAlwaysLearning
