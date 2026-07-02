import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useCountUp } from '../hooks/useCountUp.jsx'
import avatarImg from '../assets/avatar.png'

const avatarSrc = avatarImg || 'https://avatars.githubusercontent.com/u/245690110?v=4'
const roles = ['Frontend Developer', 'MERN Stack Developer', 'React Developer', 'Open to Remote Work']

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const [displayText, setDisplayText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  const reposCount = useCountUp(36, 1800, started)
  const programsCount = useCountUp(6, 1800, started)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout
    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex(prev => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.slice(0, displayText.length - 1)
            : currentRole.slice(0, displayText.length + 1)
        )
      }, isDeleting ? 28 : 52)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  const statItems = [
    { value: `${reposCount}+`, sub: 'Repos' },
    { value: `${programsCount}+`, sub: 'Programs' },
    { value: 'Round 2', sub: 'USAII' },
    { value: '1.4k+', sub: 'Followers' },
  ]

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-brand-bg">
      {/* Background blobs */}
      <div
        className="radial-glow"
        style={{
          width: '600px', height: '600px',
          background: 'rgba(124,58,237,0.12)',
          top: '5%', left: '10%',
          animation: prefersReducedMotion ? 'none' : 'float1 10s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />
      <div
        className="radial-glow"
        style={{
          width: '450px', height: '450px',
          background: 'rgba(96,165,250,0.08)',
          bottom: '0', right: '10%',
          animation: prefersReducedMotion ? 'none' : 'float2 12s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />
      <div
        className="radial-glow"
        style={{
          width: '300px', height: '300px',
          background: 'rgba(167,139,250,0.08)',
          top: '60%', left: '55%',
          willChange: 'transform',
        }}
      />
      <div
        className="radial-glow"
        style={{
          width: '300px', height: '300px',
          background: 'rgba(96,165,250,0.08)',
          top: '0', right: '5%',
          animation: prefersReducedMotion ? 'none' : 'float3 14s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left column */}
        <motion.div
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Greeting with pulsing dot */}
          <motion.p
            variants={prefersReducedMotion ? {} : itemVariants}
            className="section-label mb-0"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '9999px',
                background: '#7C3AED',
                flexShrink: 0,
                animation: prefersReducedMotion ? 'none' : 'pulse-dot 1.5s ease-in-out infinite',
              }}
            />
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={prefersReducedMotion ? {} : itemVariants}
            className="font-display font-bold gradient-text leading-[1.05] text-6xl lg:text-8xl"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Kaneeza Batool
          </motion.h1>

          {/* Typewriter pill */}
          <motion.div variants={prefersReducedMotion ? {} : itemVariants}>
            <div
              className="inline-flex items-center gap-1 rounded-full px-4 py-2"
              style={{
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.2)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <span className="text-brand-violet-light text-base">{displayText}</span>
              <span className="text-brand-violet text-base" style={{ animation: 'blink 1s step-end infinite' }}>|</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={prefersReducedMotion ? {} : itemVariants}
            className="font-body text-[rgba(249,250,251,0.65)] leading-relaxed max-w-lg"
            style={{ fontSize: '1.0625rem' }}
          >
            CS student at Sukkur IBA building production-ready interfaces from e-commerce frontends to hackathon AI systems. Currently leveling up to full-stack MERN.
          </motion.p>

          {/* Stats - glass card wrapper */}
          <motion.div variants={prefersReducedMotion ? {} : itemVariants}>
            <div className="glass px-6 py-4 rounded-2xl">
              <div className="flex flex-wrap items-center gap-5">
                {statItems.map((stat, i) => (
                  <div key={stat.sub} className="flex items-center gap-5">
                    <div className="flex flex-col items-start">
                      <span className="font-display font-bold text-2xl gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                        {stat.value}
                      </span>
                      <span className="font-mono section-label" style={{ fontSize: '0.65rem', marginBottom: 0 }}>
                        {stat.sub}
                      </span>
                    </div>
                    {i < statItems.length - 1 && (
                      <div style={{ width: '1px', height: '38px', background: 'rgba(124,58,237,0.3)' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={prefersReducedMotion ? {} : itemVariants} className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary cursor-pointer"
            >
              View My Work
            </button>
            <a
              href="#contact"
              className="border border-brand-violet/40 text-brand-violet-light font-body font-medium px-7 py-3 rounded-full hover:bg-brand-violet/10 hover:border-brand-violet-light transition-all"
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Social links - glass pill */}
          <motion.div variants={prefersReducedMotion ? {} : itemVariants}>
            <div
              className="glass inline-flex items-center gap-4 px-4 py-2"
              style={{ borderRadius: '9999px' }}
            >
              {[
                { href: 'https://github.com/kaneeza-batool', icon: <FaGithub size={20} />, label: 'GitHub profile' },
                { href: 'https://linkedin.com/in/kaneeza-batool', icon: <FaLinkedin size={20} />, label: 'LinkedIn profile' },
                { href: 'mailto:kaneezabatoolmemon@gmail.com', icon: <FaEnvelope size={20} />, label: 'Send email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="text-[rgba(249,250,251,0.45)] hover:text-brand-violet-light hover:scale-110 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right column - avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Outermost dashed ring - slow counter-rotation 20s */}
            <div
              style={{
                position: 'absolute',
                inset: '-36px',
                borderRadius: '9999px',
                border: '1px dashed rgba(167,139,250,0.15)',
                animation: prefersReducedMotion ? 'none' : 'spin 20s linear infinite reverse',
              }}
            />
            {/* Outer glow ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-24px',
                borderRadius: '9999px',
                border: '1px solid rgba(167,139,250,0.2)',
                animation: prefersReducedMotion ? 'none' : 'spin 14s linear infinite reverse',
              }}
            />
            {/* Inner spinning ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '9999px',
                border: '2px solid rgba(124,58,237,0.55)',
                animation: prefersReducedMotion ? 'none' : 'spin 9s linear infinite',
              }}
            />
            {/* Glow behind avatar */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '9999px',
                background: 'rgba(124,58,237,0.2)',
                filter: 'blur(30px)',
                animation: prefersReducedMotion ? 'none' : 'pulse-glow 3s ease-in-out infinite',
              }}
            />
            {/* Avatar */}
            <img
              src={avatarSrc}
              alt="Kaneeza Batool"
              loading="lazy"
              decoding="async"
              className="w-60 h-60 lg:w-[300px] lg:h-[300px] object-cover relative z-10"
              style={{
                borderRadius: '9999px',
                boxShadow: '0 0 50px rgba(124,58,237,0.35)',
              }}
            />

            {/* Badge - Stanford */}
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '-52px',
                animation: prefersReducedMotion ? 'none' : 'bob 2.2s ease-in-out infinite alternate',
                zIndex: 20,
              }}
              className="glass px-3 py-2 rounded-xl whitespace-nowrap"
            >
              <span className="font-mono" style={{ fontSize: '0.7rem', color: '#60A5FA' }}>
                Stanford CIP '26
              </span>
            </div>

            {/* Badge - USAII */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-52px',
                animation: prefersReducedMotion ? 'none' : 'bob 2.8s ease-in-out infinite alternate-reverse',
                zIndex: 20,
              }}
              className="glass px-3 py-2 rounded-xl whitespace-nowrap"
            >
              <span className="font-mono" style={{ fontSize: '0.7rem', color: '#34D399' }}>
                USAII Round 2
              </span>
            </div>

            {/* Badge - HEC Top Performer */}
            <div
              style={{
                position: 'absolute',
                bottom: '20%',
                right: '-64px',
                animation: prefersReducedMotion ? 'none' : 'bob 3.2s ease-in-out infinite alternate',
                zIndex: 20,
              }}
              className="glass px-3 py-2 rounded-xl whitespace-nowrap"
            >
              <span className="font-mono" style={{ fontSize: '0.7rem', color: '#FBBF24' }}>
                HEC Top Performer
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
