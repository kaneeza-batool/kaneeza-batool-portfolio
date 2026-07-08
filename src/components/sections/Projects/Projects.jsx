import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, GradientBlob, SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import { PROJECTS } from '@data/projects'
import ProjectFilterNav from './ProjectFilterNav'
import FeaturedProjectCard from './FeaturedProjectCard'
import ProjectsGrid from './ProjectsGrid'
import ProjectLearnings from './ProjectLearnings'
import ProjectModal from './ProjectModal'

function SectionDivider({ label, count }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="flex items-center gap-3 mb-6"
    >
      <span
        className="text-xs font-mono font-medium tracking-widest uppercase whitespace-nowrap"
        style={{ color: 'var(--color-accent-blue)' }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{ background: 'rgba(255,255,255,0.06)' }}
        aria-hidden="true"
      />
      <span
        className="text-xs font-mono whitespace-nowrap"
        style={{ color: 'var(--color-muted)' }}
      >
        {count} project{count !== 1 ? 's' : ''}
      </span>
    </motion.div>
  )
}

function Projects() {
  const [activeFilter,  setActiveFilter]  = useState('all')
  const [activeProject, setActiveProject] = useState(null)

  const handleFilterChange = useCallback((id) => setActiveFilter(id), [])
  const handleViewDetails  = useCallback((project) => setActiveProject(project), [])
  const handleModalClose   = useCallback(() => setActiveProject(null), [])
  const handleModalNavigate = useCallback((project) => setActiveProject(project), [])

  const featuredProjects = useMemo(() => {
    const featured = PROJECTS.filter((p) => p.featured)
    if (activeFilter === 'all') return featured
    return featured.filter((p) => p.category.includes(activeFilter))
  }, [activeFilter])

  const regularProjects = useMemo(() => {
    const regular = PROJECTS.filter((p) => !p.featured)
    if (activeFilter === 'all') return regular
    return regular.filter((p) => p.category.includes(activeFilter))
  }, [activeFilter])

  const hasFeatured = featuredProjects.length > 0
  const hasRegular  = regularProjects.length > 0
  const hasAny      = hasFeatured || hasRegular

  return (
    <SectionWrapper id="projects" noContainer className="relative overflow-hidden">
      {/* ── Decorations ───────────────────────────────── */}
      <GradientBlob color="blue"   size="lg" className="-top-40 -right-40"     opacity={0.07} />
      <GradientBlob color="purple" size="md" className="top-[40%] -left-32"    opacity={0.06} />
      <GradientBlob color="mixed"  size="sm" className="bottom-20 right-[20%]" opacity={0.04} />

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
          subtitle="Building Through Real Projects"
          title="Featured Projects"
          description="These projects represent my learning journey through practical problem solving, experimentation, and continuous improvement. Each one challenged me to think differently and build more thoughtfully."
          className="mb-16 lg:mb-20"
        />

        {/* ── Category filter nav ───────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex justify-center mb-16"
        >
          <ProjectFilterNav
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </motion.div>

        {/* ── Featured projects ─────────────────────────── */}
        <AnimatePresence mode="wait">
          {hasFeatured && (
            <motion.div
              key={`featured-${activeFilter}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <SectionDivider label="Featured" count={featuredProjects.length} />

              <motion.div
                variants={staggerContainer(0.1, 0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20"
              >
                {featuredProjects.map((project) => (
                  <motion.div key={project.id} variants={fadeUp}>
                    <FeaturedProjectCard
                      project={project}
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Regular projects grid ─────────────────────── */}
        <AnimatePresence mode="wait">
          {hasRegular && (
            <motion.div
              key={`regular-${activeFilter}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              <SectionDivider label="More Projects" count={regularProjects.length} />

              <ProjectsGrid
                key={`grid-${activeFilter}`}
                projects={regularProjects}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Empty state ───────────────────────────────── */}
        <AnimatePresence>
          {!hasAny && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-24"
            >
              <p
                className="text-base font-body"
                style={{ color: 'var(--color-muted)' }}
              >
                No projects in this category yet — check back soon.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Learnings panel ───────────────────────────── */}
        <div
          className="mt-24 pt-20"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <ProjectLearnings />
        </div>
      </Container>

      {/* ── Project details modal ─────────────────────── */}
      <ProjectModal
        project={activeProject}
        allProjects={PROJECTS}
        onClose={handleModalClose}
        onNavigate={handleModalNavigate}
      />
    </SectionWrapper>
  )
}

export default Projects
