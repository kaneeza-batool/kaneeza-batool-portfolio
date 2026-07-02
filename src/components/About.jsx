import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Target, Briefcase, Mail, Calendar } from 'lucide-react'

const cards = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'BS Computer Science - Sukkur IBA University (2024-2028)',
  },
  {
    icon: Calendar,
    label: 'Currently',
    value: '4th Semester · Building toward Full Stack',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sukkur, Sindh, Pakistan',
  },
  {
    icon: Target,
    label: 'Focus',
    value: 'Frontend - Full Stack MERN',
  },
  {
    icon: Briefcase,
    label: 'Looking For',
    value: 'Remote roles & real-world projects',
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

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: '500px', height: '500px', background: 'rgba(124,58,237,0.06)', top: '20%', right: '-10%' }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 400px 400px at 80% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="max-w-6xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <p className="font-mono tracking-[0.2em] uppercase text-xs text-brand-violet mb-3">
          <span className="inline-block w-6 h-px bg-brand-violet mr-3 align-middle" />
          01 / About
        </p>
        <h2 className="section-heading text-4xl lg:text-5xl mb-14">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Story */}
          <div className="lg:col-span-3 space-y-5">
            <p className="font-body text-[rgba(249,250,251,0.75)] leading-8 text-[1.0625rem] border-l-2 border-brand-violet/40 pl-4">
              Computer Science student at Sukkur IBA University and frontend trainee at SMIT. I build interfaces that are clean, functional, and thought through. Not just pages that look good - things that actually work.
            </p>
            <p className="font-body text-[rgba(249,250,251,0.75)] leading-8 text-[1.0625rem]">
              Started with HTML. Rebuilt the same layouts over and over until they clicked. When Saylani opened a campus in Sukkur, I enrolled the same week. That decision accelerated everything.
            </p>
            <p className="font-body text-[rgba(249,250,251,0.75)] leading-8 text-[1.0625rem]">
              Currently: React on the frontend, Node and MongoDB coming next. I have shipped real projects, earned recognition in competitive programs, and I am actively looking for remote roles where I can contribute from day one.
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-3 pt-2">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-brand-green/30 bg-brand-green/10 text-brand-green"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
              >
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Available for Remote Roles
              </span>
            </div>
          </div>

          {/* Right - Info cards */}
          <motion.div
            className="lg:col-span-2 space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {cards.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                className="backdrop-blur-xl rounded-2xl p-5 border border-brand-violet/25 transition-all duration-300 hover:border-brand-violet/50 hover:shadow-[0_8px_32px_rgba(124,58,237,0.15)]"
                style={{ background: 'rgba(124,58,237,0.06)' }}
                whileHover={{ background: 'rgba(124,58,237,0.1)' }}
              >
                <div className="flex items-start gap-3">
                  <span className="bg-brand-violet/15 rounded-lg p-2 flex-shrink-0">
                    <Icon size={16} className="text-brand-violet" />
                  </span>
                  <div>
                    <p
                      className="font-mono tracking-[0.15em] uppercase text-xs text-brand-violet mb-0.5"
                    >
                      {label}
                    </p>
                    <p className="font-body text-sm text-[rgba(249,250,251,0.85)]">{value}</p>
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
