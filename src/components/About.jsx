import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Target, Briefcase, Mail, Calendar } from 'lucide-react'

const cards = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'BS Computer Science — Sukkur IBA University (2024–2028)',
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
    value: 'Frontend → Full Stack MERN',
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
      {/* Background glow */}
      <div
        className="radial-glow"
        style={{ width: '500px', height: '500px', background: 'rgba(124,58,237,0.06)', top: '20%', right: '-10%' }}
      />

      <motion.div
        className="max-w-6xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <span className="section-label">01 / About</span>
        <h2 className="section-heading mb-14">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Story */}
          <div className="lg:col-span-3 space-y-5">
            <p className="font-body text-[rgba(249,250,251,0.75)] leading-relaxed text-[1.0625rem]">
              I'm a Computer Science student at Sukkur IBA University, currently in my 4th semester,
              and a frontend developer building production-ready interfaces from one of Pakistan's smaller cities.
            </p>
            <p className="font-body text-[rgba(249,250,251,0.75)] leading-relaxed text-[1.0625rem]">
              I started with HTML and CSS in late 2024, enrolled in Saylani Mass IT Training when they opened
              in Sukkur, and accelerated fast — shipping a live e-commerce frontend, a currency converter with
              API integration, and multiple React applications within my first year of serious development.
            </p>
            <p className="font-body text-[rgba(249,250,251,0.75)] leading-relaxed text-[1.0625rem]">
              In 2026, I was selected for Stanford's Code in Place program, recognized as a Top Performer in HEC
              Pakistan's GenAI cohort, accepted into the Dev Weekends Fellowship AI Track, and advanced to Round 2
              of the USAII Global AI Hackathon out of 324 teams.
            </p>
            <p className="font-body text-[rgba(249,250,251,0.75)] leading-relaxed text-[1.0625rem]">
              Right now: React on the frontend, Node.js and MongoDB coming through the Dev Weekends Fellowship.
              Open to remote roles where I can contribute and grow from day one.
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

          {/* Right — Info cards */}
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
                className="glass-hover border-l-2 border-brand-violet p-4"
                style={{ borderRadius: '12px' }}
              >
                <div className="flex items-start gap-3">
                  <Icon size={15} className="text-brand-violet mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="section-label" style={{ marginBottom: '2px', fontSize: '0.65rem' }}>
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
