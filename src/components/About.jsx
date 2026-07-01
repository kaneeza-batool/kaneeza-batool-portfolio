import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Target, Briefcase, Mail } from 'lucide-react'

const cards = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'BS Computer Science — IBA Sukkur (2024–2028)',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sukkur, Sindh, Pakistan',
  },
  {
    icon: Target,
    label: 'Focus',
    value: 'Frontend → Full Stack',
  },
  {
    icon: Briefcase,
    label: 'Looking For',
    value: 'Remote roles & real projects',
  },
  {
    icon: Mail,
    label: 'Email',
    value: (
      <a
        href="mailto:kaneezabatoolmemon@gmail.com"
        className="text-brand-violet-light hover:underline"
      >
        kaneezabatoolmemon@gmail.com
      </a>
    ),
  },
]

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-3">
          01 / About
        </p>

        <h2 className="font-display font-bold text-4xl lg:text-5xl mb-12">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Story */}
          <div className="lg:col-span-3">
            <p className="font-body text-slate-300 leading-relaxed text-base">
              I'm a Computer Science student at Sukkur IBA University and a frontend trainee at
              SMIT. I build interfaces — clean, functional, and thought through. Not just pages that
              look good, but things that work.
            </p>
            <p className="font-body text-slate-300 leading-relaxed text-base mt-4">
              I started with HTML. Then I did it again. And again. For a year. Not because I was
              stuck — because I kept finding something to fix. When Saylani opened a campus in
              Sukkur, I enrolled the same week. That's when things accelerated.
            </p>
            <p className="font-body text-slate-300 leading-relaxed text-base mt-4">
              Right now: React on the frontend, Node and MongoDB coming next. Long-term: full-stack,
              then AI/ML. I'm building in public, shipping real projects, and open to remote roles
              where I can contribute from day one.
            </p>
          </div>

          {/* Right — Info cards */}
          <motion.div
            className="lg:col-span-2"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cards.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                variants={cardVariants}
                className={`glass border-l-2 border-brand-violet p-4 hover:border-brand-violet-light hover:bg-brand-violet/5 hover:-translate-y-0.5 transition-all duration-200${i > 0 ? ' mt-3' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <Icon size={16} className="text-brand-violet mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs text-brand-violet uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-sm text-slate-200 mt-0.5">{value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
