import { motion } from 'framer-motion'
import { journey } from '../data/journey'

export default function Journey() {
  return (
    <section id="journey" className="py-28 relative overflow-hidden" style={{ background: 'rgba(26,21,96,0.1)' }}>
      <div
        className="radial-glow"
        style={{ width: '400px', height: '400px', background: 'rgba(124,58,237,0.06)', top: '30%', left: '-8%' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">06 / Journey</span>
          <h2 className="section-heading mb-16">
            My <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line — desktop */}
          <div
            className="hidden md:block absolute top-0 w-px h-full"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, #7C3AED 0%, rgba(124,58,237,0.6) 60%, rgba(124,58,237,0.05) 100%)',
            }}
          />
          {/* Vertical line — mobile */}
          <div
            className="block md:hidden absolute top-0 w-px h-full"
            style={{
              left: '20px',
              background: 'linear-gradient(to bottom, #7C3AED 0%, rgba(124,58,237,0.4) 100%)',
            }}
          />

          {journey.map((item, index) => (
            <div key={item.id} className="relative mb-10">
              {/* Center dot — desktop */}
              <div
                className="hidden md:flex absolute z-10 items-center justify-center"
                style={{
                  left: '50%',
                  top: '28px',
                  transform: 'translate(-50%, 0)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#7C3AED',
                  boxShadow: '0 0 0 4px rgba(124,58,237,0.15), 0 0 20px rgba(124,58,237,0.6)',
                }}
              />
              {/* Mobile dot */}
              <div
                className="block md:hidden absolute z-10"
                style={{
                  left: '14px',
                  top: '28px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#7C3AED',
                  boxShadow: '0 0 0 3px rgba(124,58,237,0.2), 0 0 16px rgba(124,58,237,0.7)',
                }}
              />

              {/* Mobile content */}
              <motion.div
                className="block md:hidden pl-12"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(index * 0.06, 0.3) }}
                viewport={{ once: true }}
              >
                <JourneyCard item={item} />
              </motion.div>

              {/* Desktop alternating layout */}
              <div className="hidden md:grid grid-cols-2 gap-8">
                {item.side === 'left' ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(index * 0.06, 0.3) }}
                      viewport={{ once: true }}
                    >
                      <JourneyCard item={item} align="right" />
                    </motion.div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(index * 0.06, 0.3) }}
                      viewport={{ once: true }}
                    >
                      <JourneyCard item={item} />
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function JourneyCard({ item, align }) {
  return (
    <div
      className="glass p-5 hover:border-brand-violet/40 transition-all duration-300"
      style={{
        ...(align === 'right' ? { textAlign: 'right' } : {}),
      }}
    >
      <p
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: '#A78BFA',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '6px',
        }}
      >
        {item.year}
      </p>
      <p
        className="font-display font-semibold text-white mb-2"
        style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem' }}
      >
        {item.title}
      </p>
      <p className="font-body text-[rgba(249,250,251,0.6)] text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  )
}
