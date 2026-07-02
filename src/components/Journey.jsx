import { motion } from 'framer-motion'
import { journey } from '../data/journey'

export default function Journey() {
  return (
    <section id="journey" className="py-32 relative overflow-hidden" style={{ background: '#0D0B1F' }}>
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
          <p className="font-mono tracking-[0.3em] uppercase text-sm text-brand-violet mb-3">
            <span className="inline-block w-6 h-px bg-brand-violet mr-3 align-middle" />
            06 / Journey
          </p>
          <h2 className="section-heading text-5xl lg:text-6xl">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto text-center mt-4 mb-16">
            How I got here, in order
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line on the left */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #7C3AED, rgba(124,58,237,0.1))',
              filter: 'drop-shadow(0 0 4px rgba(124,58,237,0.4))',
            }}
          />

          {journey.map((item, index) => (
            <div key={item.id} className="relative pl-16 mb-10">
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '24px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '9999px',
                  background: 'rgba(124,58,237,0.2)',
                  border: '2px solid #7C3AED',
                  boxShadow: '0 0 12px rgba(124,58,237,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED' }} />
              </div>

              {/* Content card */}
              <motion.div
                className="rounded-3xl p-7 border border-white/[0.08] transition-all duration-300 hover:border-brand-violet/30 hover:shadow-[0_8px_24px_rgba(124,58,237,0.1)] hover:-translate-y-2"
                style={{ background: 'rgba(255,255,255,0.03)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
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
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
