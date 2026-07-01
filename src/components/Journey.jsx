import { motion } from 'framer-motion'
import { journey } from '../data/journey'

export default function Journey() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-3">
          06 / Journey
        </p>
        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-16">
          My <span className="gradient-text">Journey</span>
        </h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Center vertical line — desktop */}
          <div
            className="hidden md:block absolute top-0 w-0.5 h-full"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, #7C3AED, rgba(124,58,237,0.1))',
            }}
          />

          {/* Mobile vertical line */}
          <div
            className="block md:hidden absolute top-0 w-0.5 h-full"
            style={{
              left: '16px',
              background: 'linear-gradient(to bottom, #7C3AED, rgba(124,58,237,0.1))',
            }}
          />

          {journey.map((item, index) => (
            <div key={item.id} className="relative mb-12">
              {/* Center dot — desktop */}
              <div
                className="hidden md:block absolute z-10"
                style={{
                  left: '50%',
                  top: '24px',
                  transform: 'translate(-50%, 0)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#7C3AED',
                  boxShadow: '0 0 16px rgba(124,58,237,0.7)',
                }}
              />

              {/* Mobile dot */}
              <div
                className="block md:hidden absolute z-10"
                style={{
                  left: '10px',
                  top: '24px',
                  transform: 'translateY(0)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#7C3AED',
                  boxShadow: '0 0 16px rgba(124,58,237,0.7)',
                }}
              />

              {/* Mobile content */}
              <motion.div
                className="block md:hidden pl-10"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="glass p-5">
                  <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-1">
                    {item.year}
                  </p>
                  <p className="font-display font-semibold text-base text-white mb-1">
                    {item.title}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>

              {/* Desktop grid layout */}
              <div className="hidden md:grid grid-cols-2 gap-8">
                {item.side === 'left' ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="glass p-5">
                        <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-1">
                          {item.year}
                        </p>
                        <p className="font-display font-semibold text-base text-white mb-1">
                          {item.title}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="glass p-5">
                        <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-1">
                          {item.year}
                        </p>
                        <p className="font-display font-semibold text-base text-white mb-1">
                          {item.title}
                        </p>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
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
