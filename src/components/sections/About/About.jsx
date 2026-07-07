import { motion } from 'framer-motion'
import { Container, GradientBlob, SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { viewportConfig } from '@utils/motion'
import AboutEditorial from './AboutEditorial'
import AboutTimeline from './AboutTimeline'
import AboutStats from './AboutStats'
import AboutHighlights from './AboutHighlights'
import AboutFocusPanel from './AboutFocusPanel'

function AboutQuote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center pt-10 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      aria-label="Personal quote"
    >
      <p
        className="font-heading font-medium italic tracking-wide"
        style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'var(--color-muted)' }}
      >
        "Learning by Building.{' '}
        <span className="text-gradient-reverse not-italic font-semibold">Growing Every Day.</span>"
      </p>
    </motion.div>
  )
}

function About() {
  return (
    <SectionWrapper
      id="about"
      noContainer
      className="relative overflow-hidden"
    >
      {/* ── Decorations ─────────────────────────────── */}
      <GradientBlob
        color="blue"
        size="lg"
        className="-top-32 -left-40"
        opacity={0.07}
      />
      <GradientBlob
        color="purple"
        size="md"
        className="top-[40%] -right-28"
        opacity={0.06}
      />
      <GradientBlob
        color="mixed"
        size="sm"
        className="bottom-10 left-[30%]"
        opacity={0.05}
      />

      {/* Soft dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <Container>
        {/* Section header */}
        <SectionHeading
          subtitle="My Journey"
          title="About Me"
          description="A CS undergraduate who builds things to learn, learns things to build — and is genuinely excited about what comes next."
          className="mb-16 lg:mb-20"
        />

        {/*
          Desktop: two-column grid
            Left  ~45% — editorial story + currently focused on
            Right ~55% — timeline + stats + highlight cards
          Mobile: single column, left content first
        */}
        <div className="grid lg:grid-cols-[45fr_55fr] gap-12 xl:gap-16 items-start">

          {/* ── Left column ────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <AboutEditorial />
            <AboutFocusPanel />
          </div>

          {/* ── Right column ───────────────────────────── */}
          <div className="flex flex-col gap-10">
            <AboutTimeline />
            <AboutStats />
            <AboutHighlights />
          </div>
        </div>

        {/* Quote — full width, below both columns */}
        <div className="mt-14">
          <AboutQuote />
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default About
