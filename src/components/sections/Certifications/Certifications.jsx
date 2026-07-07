import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, GradientBlob, SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import { CERTIFICATIONS } from '@data/certifications'
import CertFilterNav from './CertFilterNav'
import CertSearchInput from './CertSearchInput'
import FeaturedCertCard from './FeaturedCertCard'
import CertCard from './CertCard'
import CertSkillsSummary from './CertSkillsSummary'
import CertLearningJourney from './CertLearningJourney'

function matchesCertSearch(cert, query) {
  const q = query.toLowerCase()
  return (
    cert.title.toLowerCase().includes(q) ||
    cert.issuer.toLowerCase().includes(q) ||
    cert.skills.some((s) => s.toLowerCase().includes(q))
  )
}

function Certifications() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleFilterChange = useCallback((id) => setActiveFilter(id), [])
  const handleSearchChange = useCallback((val) => setSearchQuery(val), [])

  const featuredCert = useMemo(() => CERTIFICATIONS.find((c) => c.featured), [])

  const showFeatured = useMemo(() => {
    if (!featuredCert) return false
    if (searchQuery) return matchesCertSearch(featuredCert, searchQuery)
    return activeFilter === 'all' || activeFilter === featuredCert.category
  }, [activeFilter, searchQuery, featuredCert])

  const filteredGrid = useMemo(() => {
    let result = CERTIFICATIONS.filter((c) => !c.featured)
    if (activeFilter !== 'all') {
      result = result.filter((c) => c.category === activeFilter)
    }
    if (searchQuery) {
      result = result.filter((c) => matchesCertSearch(c, searchQuery))
    }
    return result
  }, [activeFilter, searchQuery])

  const hasResults = showFeatured || filteredGrid.length > 0

  return (
    <SectionWrapper id="certifications" noContainer className="relative overflow-hidden">
      {/* ── Ambient blobs ─────────────────────────────── */}
      <GradientBlob color="purple" size="lg" className="-top-40 -right-32"    opacity={0.06} />
      <GradientBlob color="blue"   size="md" className="top-[45%] -left-32"   opacity={0.05} />
      <GradientBlob color="mixed"  size="sm" className="bottom-20 right-[20%]" opacity={0.04} />

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
        {/* ── Section heading ───────────────────────────── */}
        <div className="mb-12 lg:mb-14">
          <SectionHeading
            subtitle="Verified Learning & Professional Development"
            title="Certifications"
            description="These certifications represent structured learning combined with practical implementation through projects and real-world experimentation — a deliberate path from theory to application."
          />
        </div>

        {/* ── Search + Filters ──────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-center gap-5 mb-12"
        >
          {/* Search bar */}
          <CertSearchInput value={searchQuery} onChange={handleSearchChange} />

          {/* Filter chips */}
          <motion.div variants={fadeUp}>
            <CertFilterNav activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </motion.div>
        </motion.div>

        {/* ── Results area ──────────────────────────────── */}
        <AnimatePresence mode="wait">
          {hasResults ? (
            <motion.div
              key={`results-${activeFilter}-${searchQuery}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Featured certification */}
              {showFeatured && featuredCert && (
                <FeaturedCertCard cert={featuredCert} />
              )}

              {/* Grid */}
              {filteredGrid.length > 0 && (
                <motion.div
                  variants={staggerContainer(0.07, 0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredGrid.map((cert) => (
                    <motion.div key={cert.id} variants={fadeUp} className="h-full">
                      <CertCard cert={cert} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="py-20 text-center"
            >
              <p
                className="text-sm font-body mb-2"
                style={{ color: 'var(--color-muted)' }}
              >
                No certifications found for &ldquo;{searchQuery || activeFilter}&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveFilter('all')
                }}
                className="text-xs font-body underline underline-offset-2 transition-colors"
                style={{ color: 'var(--color-accent-blue)' }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Skills summary ────────────────────────────── */}
        <CertSkillsSummary />

        {/* ── Learning journey ──────────────────────────── */}
        <CertLearningJourney />
      </Container>
    </SectionWrapper>
  )
}

export default Certifications
