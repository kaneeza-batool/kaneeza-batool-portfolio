import { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Container, GradientBlob, SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { fadeUp, viewportConfig } from '@utils/motion'
import { EXPERIENCES } from '@data/experience'
import ExperienceFilterNav from './ExperienceFilterNav'
import ExperienceTimeline from './ExperienceTimeline'
import ExperienceLearnings from './ExperienceLearnings'

function Experience() {
  const [activeFilter, setActiveFilter] = useState('all')

  const handleFilterChange = useCallback((id) => {
    setActiveFilter(id)
  }, [])

  const filteredExperiences = useMemo(() => {
    if (activeFilter === 'all') return EXPERIENCES
    return EXPERIENCES.filter((exp) => exp.type === activeFilter)
  }, [activeFilter])

  return (
    <SectionWrapper id="experience" noContainer className="relative overflow-hidden">
      {/* ── Decorations ───────────────────────────────── */}
      <GradientBlob color="blue"   size="lg" className="-top-40 -left-40"      opacity={0.06} />
      <GradientBlob color="purple" size="md" className="top-[45%] -right-32"   opacity={0.06} />
      <GradientBlob color="mixed"  size="sm" className="bottom-20 left-[25%]"  opacity={0.04} />

      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Container>
        {/* ── Section heading ───────────────────────────── */}
        <SectionHeading
          subtitle="Learning Through Real Opportunities"
          title="Experience"
          description="My experience comes from hands-on programs, communities, real projects, and a commitment to continuous learning. Every opportunity shaped how I think, build, and collaborate."
          className="mb-12 lg:mb-16"
        />

        {/* ── Filter chips ──────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex justify-center mb-12"
        >
          <ExperienceFilterNav
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </motion.div>

        {/* ── Timeline ──────────────────────────────────── */}
        <div className="min-h-[400px]">
          <ExperienceTimeline
            key={activeFilter}
            experiences={filteredExperiences}
          />
        </div>

        {/* ── Learnings panel ───────────────────────────── */}
        <div
          className="mt-20 pt-16"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <ExperienceLearnings />
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default Experience
