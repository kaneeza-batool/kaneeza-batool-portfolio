import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading, GlassCard, GradientBlob } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { staggerContainer, viewportConfig } from '@utils/motion'

import {
  CURRENT_PROJECTS,
  CURRENT_LEARNING,
  CURRENT_GOALS,
  RECENT_COMPLETIONS,
  READING_NOW,
} from '@data/currentFocus'

import FocusProjectCard from './FocusProjectCard'
import FocusLearningCard from './FocusLearningCard'
import FocusGoalRow from './FocusGoalRow'
import FocusTimelineItem from './FocusTimelineItem'
import FocusReadingCard from './FocusReadingCard'
import FocusWeeklyProgress from './FocusWeeklyProgress'

function PanelLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-1 h-4 rounded-full bg-accent-blue inline-block" aria-hidden="true" />
      <h3 className="text-caption font-heading font-semibold text-white tracking-wide">
        {children}
      </h3>
    </div>
  )
}

function CurrentFocus() {
  const sortedGoals = useMemo(
    () => [...CURRENT_GOALS].sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 }
      return order[a.priority] - order[b.priority]
    }),
    []
  )

  return (
    <SectionWrapper id="current-focus" className="overflow-hidden">
      {/* Background ambience */}
      <GradientBlob color="blue"   size="lg" className="-top-32 -left-48 opacity-60" />
      <GradientBlob color="purple" size="md" className="-bottom-16 right-0 opacity-50" />

      {/* Section header */}
      <SectionHeading
        subtitle="Right Now"
        title="Current Focus"
        description="Software engineering is a continuous journey. This dashboard reflects exactly where I am right now — what I'm building, learning, reading, and working toward."
      />

      {/* Dashboard grid */}
      <div className="mt-12 grid lg:grid-cols-[1fr_380px] gap-6 items-start">

        {/* ── LEFT COLUMN ─────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col gap-8"
        >
          {/* Current Projects */}
          <section aria-label="Current projects">
            <PanelLabel>Current Projects</PanelLabel>
            <div className="grid sm:grid-cols-2 gap-4">
              {CURRENT_PROJECTS.map((project, i) => (
                <FocusProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </section>

          {/* Current Learning */}
          <section aria-label="Current learning">
            <PanelLabel>Currently Learning</PanelLabel>
            <div className="grid sm:grid-cols-2 gap-4">
              {CURRENT_LEARNING.map((item, i) => (
                <FocusLearningCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </section>
        </motion.div>

        {/* ── RIGHT COLUMN ────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col gap-6"
        >
          {/* Goals */}
          <section aria-label="Current goals">
            <GlassCard hover={false} padding="md">
              <PanelLabel>Goals</PanelLabel>
              <div className="flex flex-col gap-3">
                {sortedGoals.map((goal, i) => (
                  <FocusGoalRow key={goal.id} goal={goal} index={i} />
                ))}
              </div>
            </GlassCard>
          </section>

          {/* Recent Completions */}
          <section aria-label="Recent completions">
            <GlassCard hover={false} padding="md">
              <PanelLabel>Recently Completed</PanelLabel>
              <div role="list">
                {RECENT_COMPLETIONS.map((item, i) => (
                  <FocusTimelineItem
                    key={item.id}
                    item={item}
                    index={i}
                    isLast={i === RECENT_COMPLETIONS.length - 1}
                  />
                ))}
              </div>
            </GlassCard>
          </section>

          {/* Reading Now */}
          <section aria-label="Currently reading">
            <GlassCard hover={false} padding="md">
              <PanelLabel>Reading Now</PanelLabel>
              <div className="grid grid-cols-2 gap-3">
                {READING_NOW.map((item, i) => (
                  <FocusReadingCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </GlassCard>
          </section>
        </motion.div>
      </div>

      {/* ── BOTTOM: Weekly Progress ──────────────────────── */}
      <div className="mt-6">
        <FocusWeeklyProgress />
      </div>
    </SectionWrapper>
  )
}

export default CurrentFocus
