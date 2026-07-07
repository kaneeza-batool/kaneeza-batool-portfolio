import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { CERTIFICATIONS, CERT_COLORS } from '@data/certifications'

const SKILL_COLORS = [
  CERT_COLORS.purple,
  CERT_COLORS.blue,
  CERT_COLORS.cyan,
  CERT_COLORS.teal,
  CERT_COLORS.green,
  CERT_COLORS.amber,
]

function CertSkillsSummary() {
  const skillCounts = useMemo(() => {
    const counts = {}
    CERTIFICATIONS.forEach((cert) => {
      cert.skills.forEach((skill) => {
        counts[skill] = (counts[skill] || 0) + 1
      })
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([skill, count]) => ({ skill, count }))
  }, [])

  return (
    <section
      aria-label="Skills represented across certifications"
      className="mt-20 pt-16"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="text-center mb-10"
      >
        <span
          className="text-xs font-mono font-medium tracking-widest uppercase mb-3 block"
          style={{ color: 'var(--color-accent-blue)' }}
        >
          Across All Certifications
        </span>
        <h3
          className="font-heading font-bold text-white mb-3"
          style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)' }}
        >
          Skills Represented
        </h3>
        <p
          className="text-sm font-body max-w-lg mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          A snapshot of the skills and concepts covered across all credentials — frequency reflects
          how often each skill appears.
        </p>
      </motion.div>

      {/* Glass panel */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="rounded-2xl p-7 md:p-9"
        style={{
          background: 'rgba(13,31,67,0.6)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <motion.div
          variants={staggerContainer(0.04, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-wrap gap-3 justify-center"
        >
          {skillCounts.map(({ skill, count }, i) => {
            const color = SKILL_COLORS[i % SKILL_COLORS.length]
            const isFrequent = count >= 2
            return (
              <motion.div
                key={skill}
                variants={fadeUp}
                whileHover={{ y: -3, scale: 1.04 }}
                transition={{ duration: 0.22 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl cursor-default"
                style={{
                  background: isFrequent
                    ? `rgba(${color.rgb},0.13)`
                    : 'rgba(255,255,255,0.04)',
                  border: isFrequent
                    ? `1px solid rgba(${color.rgb},0.28)`
                    : '1px solid rgba(255,255,255,0.08)',
                  color: isFrequent ? color.hex : 'var(--color-text-secondary)',
                }}
              >
                <span className={`text-sm font-body ${isFrequent ? 'font-semibold' : 'font-normal'}`}>
                  {skill}
                </span>
                {count >= 2 && (
                  <span
                    className="text-xs font-mono px-1.5 py-0.5 rounded-full"
                    style={{
                      background: `rgba(${color.rgb},0.18)`,
                      color: color.hex,
                      fontSize: '0.6rem',
                    }}
                  >
                    ×{count}
                  </span>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CertSkillsSummary
