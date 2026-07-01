import { motion } from 'framer-motion'
import { programs } from '../data/programs.js'

const borderColor = {
  completed: 'border-l-green-500',
  active: 'border-l-brand-violet',
  qualified: 'border-l-amber-500',
}

const statusStyle = {
  completed: 'bg-green-900/40 text-green-400 border border-green-500/30',
  active: 'bg-brand-violet/20 text-brand-violet-light border border-brand-violet/30',
  qualified: 'bg-amber-900/40 text-amber-400 border border-amber-500/30',
}

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-brand-secondary/20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-3">
          04 / Programs
        </p>

        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-12">
          Programs &amp; <span className="gradient-text">Achievements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              className={`glass p-6 border-l-4 ${borderColor[program.status]} flex flex-col hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(124,58,237,0.15)] transition-all duration-200`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-semibold text-base text-white">
                    {program.title}
                  </h3>
                  <p className="font-mono text-xs text-brand-violet-light uppercase tracking-wide mt-1">
                    {program.org}
                  </p>
                  <p className="font-mono text-xs text-slate-500 mt-0.5">
                    {program.year}
                  </p>
                </div>

                <div className="flex flex-col items-end ml-3 shrink-0">
                  <span className={`font-mono text-xs rounded-full px-2 py-1 capitalize ${statusStyle[program.status]}`}>
                    {program.status}
                  </span>
                  {program.badge === 'top-performer' && (
                    <span className="text-yellow-400 font-mono text-xs mt-1">
                      ⭐ Top Performer
                    </span>
                  )}
                  {program.badge === 'gold' && (
                    <span className="text-yellow-300 font-mono text-xs mt-1">
                      🏅 75th / 424 Teams
                    </span>
                  )}
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mt-3 flex-1">
                {program.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
