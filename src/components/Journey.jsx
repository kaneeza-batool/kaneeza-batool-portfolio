import { motion } from 'framer-motion'
import { journey } from '../data/journey'

export default function Journey() {
  return (
    <section id="journey" className="py-28 relative overflow-hidden" style={{ background: 'rgba(26,21,96,0.1)' }}>
      <div
        className="radial-glow"
        style={{
          width: '500px',
          height: '500px',
          background: 'rgba(124,58,237,0.05)',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-mono tracking-[0.2em] uppercase text-xs text-brand-violet mb-3">
            <span className="inline-block w-6 h-px bg-brand-violet mr-3 align-middle" />
            06 / Journey
          </p>
          <h2 className="section-heading text-4xl lg:text-5xl mb-16">
            My <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line desktop */}
          <div
            className="hidden md:block absolute top-0 h-full"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              background: 'linear-gradient(to bottom, #7C3AED 0%, rgba(124,58,237,0.6) 60%, rgba(124,58,237,0.05) 100%)',
              filter: 'drop-shadow(0 0 4px rgba(124,58,237,0.4))',
            }}
          />
          {/* Vertical line mobile */}
          <div
            className="block md:hidden absolute top-0 h-full"
            style={{
              left: '20px',
              width: '2px',
              background: 'linear-gradient(to bottom, #7C3AED 0%, rgba(124,58,237,0.4) 100%)',
              filter: 'drop-shadow(0 0 4px rgba(124,58,237,0.4))',
            }}
          />

          {journey.map((item, index) => (
            <div key={item.id} className="relative mb-8 md:mb-10">
              {/* Center dot desktop */}
              <div
                className="hidden md:flex absolute z-10 items-center justify-center rounded-full"
                style={{
                  left: '50%',
                  top: '28px',
                  transform: 'translate(-50%, 0)',
                  width: '16px',
                  height: '16px',
                  background: 'rgba(124,58,237,0.2)',
                  border: '2px solid #7C3AED',
                  boxShadow: '0 0 12px rgba(124,58,237,0.6)',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED' }} />
              </div>
              {/* Mobile dot */}
              <div
                className="flex md:hidden absolute z-10 items-center justify-center rounded-full"
                style={{
                  left: '13px',
                  top: '28px',
                  width: '14px',
                  height: '14px',
                  background: 'rgba(124,58,237,0.2)',
                  border: '2px solid #7C3AED',
                  boxShadow: '0 0 12px rgba(124,58,237,0.6)',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7C3AED' }} />
              </div>

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
      className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-violet/30 hover:shadow-[0_8px_24px_rgba(124,58,237,0.1)] border border-white/[0.08]"
      style={{
        background: 'rgba(255,255,255,0.03)',
        ...(align === 'right' ? { textAlign: 'right' } : {}),
      }}
    >
      <span
        className="inline-block mb-3 px-3 py-1 rounded-full text-brand-violet-light text-xs bg-brand-violet/15 border border-brand-violet/25"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        {item.year}
      </span>
      <p
        className="font-display font-semibold text-base text-white mb-2"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
      >
        {item.title}
      </p>
      <p className="text-slate-400 text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  )
}
