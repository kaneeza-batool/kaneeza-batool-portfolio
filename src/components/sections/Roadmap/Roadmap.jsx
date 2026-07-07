import { useState, useCallback, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container, GradientBlob, SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { ROADMAP, STATUS_CONFIG } from '@data/roadmap'
import RoadmapCard from './RoadmapCard'
import RoadmapNode from './RoadmapNode'
import RoadmapDestination from './RoadmapDestination'
import RoadmapPhilosophy from './RoadmapPhilosophy'

/* ── Animated vertical connector line ─────────────────────── */
function ConnectorLine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = usePrefersReducedMotion()

  return (
    <div
      ref={ref}
      className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="w-full h-full"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.4) 18%, rgba(46,107,255,0.55) 35%, rgba(106,92,255,0.45) 55%, rgba(245,158,11,0.35) 75%, rgba(110,123,156,0.2) 100%)',
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }
        }
      />
    </div>
  )
}

/* ── Mobile connector line (left-aligned) ──────────────────── */
function MobileConnectorLine() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = usePrefersReducedMotion()

  return (
    <div
      ref={ref}
      className="absolute top-0 bottom-0 left-[18px] w-px overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="w-full h-full"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,197,94,0.4) 0%, rgba(46,107,255,0.4) 35%, rgba(106,92,255,0.35) 55%, rgba(245,158,11,0.25) 75%, rgba(110,123,156,0.15) 100%)',
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }
        }
      />
    </div>
  )
}

/* ── Status legend ─────────────────────────────────────────── */
function StatusLegend() {
  const statuses = ['completed', 'current', 'next', 'planned', 'future']
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-8 mb-2">
      {statuses.map((s) => {
        const cfg = STATUS_CONFIG[s]
        return (
          <div key={s} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: cfg.color }}
            />
            <span className="text-xs font-mono text-muted">{cfg.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ── Main section ──────────────────────────────────────────── */
function Roadmap() {
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <SectionWrapper id="roadmap" noContainer className="relative overflow-hidden">
      {/* Ambient blobs */}
      <GradientBlob color="blue"   size="lg" className="-top-32 -left-40"     opacity={0.06} />
      <GradientBlob color="purple" size="md" className="top-[40%] -right-32"  opacity={0.05} />
      <GradientBlob color="mixed"  size="sm" className="bottom-24 left-[25%]" opacity={0.04} />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <Container>
        {/* Section heading */}
        <div className="mb-4">
          <SectionHeading
            subtitle="Continuous Growth"
            title="Learning Roadmap"
            description="I believe structured, intentional learning — paired with building real things — is the fastest path to engineering impact. Every stage below represents real skills built through real projects, not just tutorials watched."
          />
        </div>

        {/* Sub-title + legend */}
        <div className="text-center mb-16">
          <p
            className="text-sm font-heading font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Growing One Step at a Time
          </p>
          <StatusLegend />
        </div>

        {/* ── Desktop roadmap (alternating) ─────────────────── */}
        <div className="hidden md:block relative" role="list" aria-label="Learning roadmap stages">
          <ConnectorLine />

          {ROADMAP.map((item, index) => {
            const isLeft = index % 2 === 0

            return (
              <div
                key={item.id}
                role="listitem"
                className="grid items-start mb-16 last:mb-0"
                style={{ gridTemplateColumns: '1fr 80px 1fr' }}
              >
                {/* Left slot */}
                <div className="pr-8">
                  {isLeft && (
                    <RoadmapCard
                      item={item}
                      expanded={expandedId === item.id}
                      onToggle={() => toggleExpand(item.id)}
                      side="left"
                    />
                  )}
                </div>

                {/* Center node */}
                <div className="flex justify-center items-start pt-7 relative z-10">
                  <RoadmapNode item={item} />
                </div>

                {/* Right slot */}
                <div className="pl-8">
                  {!isLeft && (
                    <RoadmapCard
                      item={item}
                      expanded={expandedId === item.id}
                      onToggle={() => toggleExpand(item.id)}
                      side="right"
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Mobile roadmap (single column) ────────────────── */}
        <div
          className="md:hidden relative"
          role="list"
          aria-label="Learning roadmap stages"
        >
          <MobileConnectorLine />

          {ROADMAP.map((item) => (
            <div
              key={item.id}
              role="listitem"
              className="flex items-start gap-4 mb-8 last:mb-0"
            >
              {/* Node (left side, sits on the connector line) */}
              <div className="relative z-10 flex-shrink-0 mt-6">
                <RoadmapNode item={item} small />
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0">
                <RoadmapCard
                  item={item}
                  expanded={expandedId === item.id}
                  onToggle={() => toggleExpand(item.id)}
                  side="right"
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Career destination ─────────────────────────────── */}
        <RoadmapDestination />

        {/* ── Learning philosophy ────────────────────────────── */}
        <RoadmapPhilosophy />
      </Container>
    </SectionWrapper>
  )
}

export default Roadmap
