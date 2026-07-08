import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, GradientBlob, SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import { SKILLS } from '@data/skills'
import SkillCategoryNav from './SkillCategoryNav'
import SkillCard from './SkillCard'
import SkillsAlwaysLearning from './SkillsAlwaysLearning'

function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  const handleCategoryChange = useCallback((id) => {
    setActiveCategory(id)
  }, [])

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') {
      // Deduplicate by name so JavaScript doesn't appear twice in the All view
      const seen = new Set()
      return SKILLS.filter((s) => {
        if (seen.has(s.name)) return false
        seen.add(s.name)
        return true
      })
    }
    return SKILLS.filter((s) => s.category === activeCategory)
  }, [activeCategory])

  return (
    <SectionWrapper
      id="skills"
      noContainer
      className="relative overflow-hidden"
    >
      {/* ── Decorations ─────────────────────────────── */}
      <GradientBlob
        color="blue"
        size="lg"
        className="-top-40 -right-40"
        opacity={0.07}
      />
      <GradientBlob
        color="purple"
        size="md"
        className="top-[50%] -left-32"
        opacity={0.06}
      />
      <GradientBlob
        color="mixed"
        size="sm"
        className="bottom-16 right-[20%]"
        opacity={0.05}
      />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <Container>
        {/* ── Section Header ──────────────────────────── */}
        <SectionHeading
          subtitle="Technologies I Work With"
          title="Skills"
          description="These technologies represent my current toolkit — a living, growing stack shaped through real projects, curiosity, and a genuine love for building."
          className="mb-16 lg:mb-20"
        />

        {/* ── Category Nav ────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex justify-center mb-12"
        >
          <SkillCategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

        {/* ── Card Grid with AnimatePresence ──────────── */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainer(0.05, 0.05)}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                transition: { duration: 0.18, ease: 'easeIn' },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
            >
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  variants={fadeUp}
                  className="h-full"
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Skill count indicator ───────────────────── */}
        <motion.p
          key={`count-${activeCategory}`}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center mt-6 text-xs font-mono"
          style={{ color: 'var(--color-muted)' }}
        >
          Showing{' '}
          <span style={{ color: 'var(--color-accent-blue)' }}>
            {filteredSkills.length}
          </span>{' '}
          {filteredSkills.length === 1 ? 'skill' : 'skills'}
        </motion.p>

        {/* ── Always Learning Panel ───────────────────── */}
        <div className="mt-20">
          <SkillsAlwaysLearning />
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default Skills
