import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, GradientBlob, SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import { ACHIEVEMENTS } from '@data/achievements'
import AchievementFilterNav from './AchievementFilterNav'
import FeaturedAchievementCard from './FeaturedAchievementCard'
import AchievementCard from './AchievementCard'
import AchievementCounters from './AchievementCounters'
import AchievementTimeline from './AchievementTimeline'
import AchievementMeaning from './AchievementMeaning'

function Achievements() {
  const [activeFilter, setActiveFilter] = useState('all')
  const handleFilterChange = useCallback((id) => setActiveFilter(id), [])

  const featuredAchievement = useMemo(
    () => ACHIEVEMENTS.find((a) => a.featured),
    []
  )

  const showFeatured = useMemo(
    () => activeFilter === 'all' || activeFilter === featuredAchievement?.category,
    [activeFilter, featuredAchievement]
  )

  const filteredGrid = useMemo(() => {
    const nonFeatured = ACHIEVEMENTS.filter((a) => !a.featured)
    if (activeFilter === 'all') return nonFeatured
    return nonFeatured.filter((a) => a.category === activeFilter)
  }, [activeFilter])

  return (
    <SectionWrapper id="achievements" noContainer className="relative overflow-hidden">
      {/* ── Ambient blobs ─────────────────────────────── */}
      <GradientBlob color="blue"   size="lg" className="-top-40 -left-32"      opacity={0.06} />
      <GradientBlob color="purple" size="md" className="top-[45%] -right-32"   opacity={0.05} />
      <GradientBlob color="mixed"  size="sm" className="bottom-20 left-[20%]"  opacity={0.04} />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <Container>
        {/* ── Header row + counters ─────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Section heading — left aligned on desktop */}
          <div className="flex-1">
            <SectionHeading
              subtitle="Milestones Along My Journey"
              title="Achievements"
              description="These achievements represent continuous learning, participation, and recognition through technical programs, hackathons, and communities. Each milestone reflects not just what I accomplished, but how I've grown along the way."
              align="left"
              className="mb-0"
            />
          </div>

          {/* Animated counters — right on desktop, below heading on mobile */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex-shrink-0 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(13,31,67,0.55)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <AchievementCounters />
          </motion.div>
        </div>

        {/* ── Filter chips ──────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex justify-center mb-12"
        >
          <AchievementFilterNav
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </motion.div>

        {/* ── Featured achievement ──────────────────────── */}
        <AnimatePresence mode="wait">
          {showFeatured && featuredAchievement && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <FeaturedAchievementCard achievement={featuredAchievement} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Achievement grid ──────────────────────────── */}
        <AnimatePresence mode="wait">
          {filteredGrid.length > 0 ? (
            <motion.div
              key={`grid-${activeFilter}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                variants={staggerContainer(0.07, 0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredGrid.map((achievement) => (
                  <motion.div key={achievement.id} variants={fadeUp}>
                    <AchievementCard achievement={achievement} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-16 text-center"
            >
              <p
                className="text-sm font-body"
                style={{ color: 'var(--color-muted)' }}
              >
                No achievements in this category yet — check back soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Journey timeline strip ────────────────────── */}
        <AchievementTimeline />

        {/* ── What these milestones mean ────────────────── */}
        <AchievementMeaning />
      </Container>
    </SectionWrapper>
  )
}

export default Achievements
