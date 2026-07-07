import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { Button, SocialIcon, AnimatedText } from '@components/common'
import { staggerContainer, fadeUp } from '@utils/motion'
import { scrollTo } from '@utils/lenis'
import { SITE } from '@constants'
import { cn } from '@utils/helpers'

const ROLES = [
  'Frontend Developer',
  'MERN Stack Learner',
  'AI Enthusiast',
  'Problem Solver',
]

const HERO_SOCIALS = [
  {
    href: 'https://github.com/kaneeza-batool',
    icon: FaGithub,
    label: 'GitHub profile',
  },
  {
    href: 'https://linkedin.com/in/kaneeza-batool',
    icon: FaLinkedinIn,
    label: 'LinkedIn profile',
  },
  {
    href: 'https://leetcode.com/kaneeza-batool',
    icon: SiLeetcode,
    label: 'LeetCode profile',
  },
  {
    href: `mailto:${SITE.email}`,
    icon: FaEnvelope,
    label: 'Send email',
  },
]

// y-only slide — no opacity — so AnimatedText controls its own opacity
const nameReveal = {
  hidden: { y: 40 },
  visible: {
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Module-level so Framer Motion keeps stable references across renders
const contentContainer = staggerContainer(0.12, 0.22)

function RoleText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="flex items-center gap-3"
      style={{ height: '2.4rem' }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Terminal-style prefix */}
      <span
        className="font-mono text-xs text-muted tracking-widest select-none shrink-0"
        aria-hidden="true"
      >
        ~/
      </span>

      {/* Fixed-height cycling container */}
      <div className="relative flex-1 overflow-hidden" style={{ height: '2.4rem' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
            transition={{ duration: 0.36, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              'absolute inset-0 flex items-center',
              'text-subheading font-heading font-semibold text-gradient whitespace-nowrap'
            )}
          >
            {ROLES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

function HeroContent() {
  return (
    <motion.div
      className="flex flex-col gap-5 lg:gap-6"
      variants={contentContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Greeting line */}
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span
          className="h-px w-8 shrink-0"
          style={{
            background:
              'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)',
          }}
          aria-hidden="true"
        />
        <p className="font-mono text-sm text-accent-blue tracking-widest uppercase font-medium">
          Hi, I'm
        </p>
      </motion.div>

      {/* Name — h1 slides up; AnimatedText reveals words word-by-word */}
      <motion.h1 variants={nameReveal}>
        <AnimatedText
          text="Kaneeza Batool"
          delay={0.38}
          className="text-display font-heading font-extrabold text-white leading-none tracking-tight"
        />
      </motion.h1>

      {/* Animated role */}
      <motion.div variants={fadeUp}>
        <RoleText />
      </motion.div>

      {/* Description */}
      <motion.p
        variants={fadeUp}
        className="text-body text-text-secondary max-w-[520px] leading-relaxed"
      >
        CS undergraduate building real web applications from scratch —
        navigating the MERN stack and staying genuinely curious about
        where AI fits into modern software. Every project is a deliberate
        step toward becoming a developer worth hiring. Open to internships,
        collaborations, and the right opportunities.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
        <Button
          variant="primary"
          size="lg"
          onClick={() => scrollTo('#projects', { offset: -72 })}
          aria-label="View my projects"
        >
          View Projects
        </Button>
        <Button
          variant="secondary"
          size="lg"
          as="a"
          href="/resume.pdf"
          download="Kaneeza_Batool_Resume.pdf"
          aria-label="Download resume"
        >
          Download Resume
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => scrollTo('#contact', { offset: -72 })}
          aria-label="Contact me"
        >
          Contact Me
        </Button>
      </motion.div>

      {/* Social icons */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-2 pt-1"
        aria-label="Social links"
      >
        {HERO_SOCIALS.map((social) => (
          <SocialIcon
            key={social.label}
            href={social.href}
            icon={social.icon}
            label={social.label}
            size="md"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default HeroContent
