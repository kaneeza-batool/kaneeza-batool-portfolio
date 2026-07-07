import { memo } from 'react'
import { motion } from 'framer-motion'
import { Container, GradientBlob } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { scrollTo } from '@utils/lenis'
import { usePrefersReducedMotion } from '@hooks'
import HeroContent from './HeroContent'
import HeroAvatar from './HeroAvatar'

// Lightweight ambient particle — y-rise + fade, no GPU-heavy effects
const PARTICLES = [
  { style: { top: '22%', left: '8%' },   delay: 0,    duration: 5.2 },
  { style: { top: '58%', left: '4%' },   delay: 1.6,  duration: 4.6 },
  { style: { top: '35%', right: '7%' },  delay: 0.9,  duration: 5.8 },
  { style: { top: '72%', right: '11%' }, delay: 2.3,  duration: 5.4 },
  { style: { top: '14%', left: '44%' },  delay: 1.2,  duration: 4.9 },
]

function Particle({ style, delay, duration }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{ ...style, background: 'rgba(46,107,255,0.25)' }}
      animate={
        reduced
          ? {}
          : { y: [0, -28, 0], opacity: [0, 0.7, 0] }
      }
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  )
}

function ScrollIndicator() {
  const reduced = usePrefersReducedMotion()

  const handleClick = () => scrollTo('#about', { offset: -72 })
  const handleKey = (e) => e.key === 'Enter' && handleClick()

  return (
    // Static wrapper handles centering; motion.div inside handles y+opacity animation
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer group"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.9, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={handleClick}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-label="Scroll down to About section"
    >
      {/* Mouse outline */}
      <div
        className={[
          'w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2',
          'border-white/20 group-hover:border-accent-blue/50 transition-colors duration-300',
        ].join(' ')}
      >
        <motion.div
          className="w-1 h-2 rounded-full bg-accent-blue"
          animate={
            reduced
              ? {}
              : { y: [0, 9, 0], opacity: [1, 0.15, 1] }
          }
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      <motion.span
        className="text-small text-muted group-hover:text-accent-blue transition-colors duration-300 tracking-widest uppercase"
        animate={
          reduced
            ? {}
            : { opacity: [0.4, 0.9, 0.4] }
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        scroll
      </motion.span>
    </motion.div>
    </div>
  )
}

function Home() {
  return (
    <SectionWrapper
      id="home"
      noContainer
      className={[
        'relative min-h-screen flex flex-col justify-center',
        'pt-[72px] pb-28 overflow-hidden',
      ].join(' ')}
    >
      {/* ── Background depth layer ─────────────────────────────── */}

      {/* Gradient blobs for ambient color */}
      <GradientBlob
        color="blue"
        size="xl"
        className="-top-48 -left-48"
        opacity={0.09}
      />
      <GradientBlob
        color="purple"
        size="lg"
        className="top-[30%] -right-36"
        opacity={0.07}
      />
      <GradientBlob
        color="mixed"
        size="md"
        className="bottom-0 left-1/4"
        opacity={0.06}
      />

      {/* Very subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Floating ambient particles */}
      {PARTICLES.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* ── Main content ──────────────────────────────────────── */}
      <Container className="w-full flex-1 flex flex-col justify-center">
        {/*
          Two-column grid:
            Left  55% — HeroContent (text, CTAs, socials)
            Right 45% — HeroAvatar (card, tech icons, badges)
          Stacks to single column on mobile; avatar appears below content
        */}
        <div className="grid lg:grid-cols-[55fr_45fr] gap-16 xl:gap-20 items-center">
          {/* Left: textual content */}
          <HeroContent />

          {/* Right: visual card */}
          <div className="flex justify-center lg:justify-end">
            <HeroAvatar />
          </div>
        </div>
      </Container>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <ScrollIndicator />
    </SectionWrapper>
  )
}

export default memo(Home)
