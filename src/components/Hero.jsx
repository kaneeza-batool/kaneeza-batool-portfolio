import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useCountUp } from '../hooks/useCountUp.jsx'

const avatarSrc = 'https://avatars.githubusercontent.com/u/245690110?v=4'
const roles = ['Frontend Developer', 'MERN Stack Developer', 'Open to Remote Work']

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: { opacity: 1, transition: prefersReducedMotion ? {} : { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' } },
  }
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  const reposCount = useCountUp(24, 1500, started)
  const programsCount = useCountUp(5, 1500, started)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.slice(0, displayText.length - 1)
            : currentRole.slice(0, displayText.length + 1)
        )
      }, isDeleting ? 30 : 50)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const statItems = [
    { value: `${reposCount}+`, sub: 'Repos' },
    { value: `${programsCount}`, sub: 'Programs' },
    { value: '75th/424', sub: 'Hackathon' },
    { value: '1.4k+', sub: 'Followers' },
  ]

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-brand-bg">
      {/* Blob 1 */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'rgba(124,58,237,0.15)',
          borderRadius: '9999px',
          filter: 'blur(80px)',
          top: '10%',
          left: '15%',
          animation: prefersReducedMotion ? 'none' : 'float1 8s ease-in-out infinite alternate',
          willChange: 'transform',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Blob 2 */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'rgba(79,70,229,0.2)',
          borderRadius: '9999px',
          filter: 'blur(80px)',
          bottom: '0',
          right: '15%',
          animation: prefersReducedMotion ? 'none' : 'float2 10s ease-in-out infinite alternate',
          willChange: 'transform',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col gap-6"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-brand-violet-light text-sm uppercase tracking-widest"
          >
            Hi, I'm
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display font-bold text-5xl lg:text-7xl gradient-text leading-tight"
          >
            Kaneeza Batool
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="font-mono text-brand-violet text-lg h-8 flex items-center"
          >
            <span>{displayText}</span>
            <span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            {statItems.map((stat, i) => (
              <div key={stat.sub} className="flex items-center gap-4">
                <div className="flex flex-col items-start">
                  <span className="font-display font-bold text-2xl gradient-text">{stat.value}</span>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">{stat.sub}</span>
                </div>
                {i < statItems.length - 1 && (
                  <div style={{ width: '1px', height: '40px', background: 'rgba(124,58,237,0.3)' }} />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button
              onClick={scrollToProjects}
              className="bg-brand-violet text-white font-bold px-6 py-3 rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              View My Work
            </button>
            <a
              href="#"
              className="border border-brand-violet text-brand-violet-light px-6 py-3 rounded-full hover:bg-brand-violet/10 hover:border-brand-violet-light transition-all"
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <a
              href="https://github.com/kaneeza-batool"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-slate-400 hover:text-brand-violet-light hover:scale-110 transition-all"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/kaneeza-batool"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-slate-400 hover:text-brand-violet-light hover:scale-110 transition-all"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:kaneezabatoolmemon@gmail.com"
              aria-label="Send email"
              className="text-slate-400 hover:text-brand-violet-light hover:scale-110 transition-all"
            >
              <FaEnvelope size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right column */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Outer ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '9999px',
                border: '1px solid rgba(167,139,250,0.25)',
                animation: prefersReducedMotion ? 'none' : 'spin 12s linear infinite reverse',
                willChange: 'transform',
              }}
            />
            {/* Inner ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '9999px',
                border: '2px solid rgba(124,58,237,0.6)',
                animation: prefersReducedMotion ? 'none' : 'spin 8s linear infinite',
                willChange: 'transform',
              }}
            />
            {/* Avatar */}
            <img
              src={avatarSrc}
              alt="Kaneeza Batool"
              loading="lazy"
              decoding="async"
              className="w-[220px] h-[220px] lg:w-[280px] lg:h-[280px] object-cover"
              style={{
                borderRadius: '9999px',
                boxShadow: '0 0 60px rgba(124,58,237,0.3)',
              }}
            />
            {/* Badge 1 — Stanford */}
            <div
              style={{
                position: 'absolute',
                bottom: '-12px',
                left: '-44px',
                animation: 'bob 2s ease-in-out infinite alternate',
              }}
              className="bg-blue-900/80 border border-blue-400/30 text-blue-300 font-mono text-xs px-3 py-2 rounded-xl backdrop-blur whitespace-nowrap"
            >
              Stanford CIP '26
            </div>
            {/* Badge 2 — USAII */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-44px',
                animation: 'bob 2.5s ease-in-out infinite alternate-reverse',
              }}
              className="bg-green-900/80 border border-green-400/30 text-green-300 font-mono text-xs px-3 py-2 rounded-xl backdrop-blur whitespace-nowrap"
            >
              USAII 75th/424
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
