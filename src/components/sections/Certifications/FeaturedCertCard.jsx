import { motion } from 'framer-motion'
import { FiExternalLink, FiCheckCircle, FiAward } from 'react-icons/fi'
import { usePrefersReducedMotion } from '@hooks'
import { CERT_COLORS, CATEGORY_LABEL } from '@data/certifications'

function FeaturedCertCard({ cert }) {
  const reduced = usePrefersReducedMotion()
  const colors = CERT_COLORS[cert.colorKey] ?? CERT_COLORS.purple
  const catLabel = CATEGORY_LABEL[cert.category] ?? cert.category

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-3xl overflow-hidden mb-12"
      style={{
        background: 'linear-gradient(135deg, #0D1F43 0%, #102A59 60%, #0D1F43 100%)',
        border: `1px solid rgba(${colors.rgb},0.25)`,
        boxShadow: '0 4px 60px rgba(0,0,0,0.4)',
      }}
      role="article"
      aria-label={`Featured certification: ${cert.title} — ${cert.issuer}`}
    >
      {/* Pulsing ambient glow */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: [
              `0 0 0px rgba(${colors.rgb},0)`,
              `0 0 70px rgba(${colors.rgb},0.14)`,
              `0 0 0px rgba(${colors.rgb},0)`,
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Corner ribbon */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute top-6 -right-9 w-40 py-1.5 text-center text-[0.6rem] font-mono font-bold tracking-widest uppercase rotate-45"
          style={{
            background: `linear-gradient(90deg, rgba(${colors.rgb},0.9), rgba(${colors.rgb},0.65))`,
            color: '#fff',
          }}
        >
          FEATURED
        </div>
      </div>

      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `radial-gradient(rgba(${colors.rgb},0.06) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Left radial accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 60% at 5% 50%, rgba(${colors.rgb},0.07) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
        {/* Issuer icon block */}
        <div
          className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, rgba(${colors.rgb},0.2), rgba(${colors.rgb},0.06))`,
            border: `1px solid rgba(${colors.rgb},0.35)`,
            boxShadow: `0 0 32px rgba(${colors.rgb},0.15)`,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontSize: '1.75rem',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              color: colors.hex,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            {cert.issuerShort}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badges row */}
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
              style={{
                background: `rgba(${colors.rgb},0.15)`,
                border: `1px solid rgba(${colors.rgb},0.35)`,
                color: colors.hex,
              }}
            >
              <FiAward className="w-3 h-3" aria-hidden="true" />
              Top Performer
            </span>

            {cert.verified && (
              <span
                className="inline-flex items-center gap-1 text-xs font-body font-medium"
                style={{ color: '#22C55E' }}
              >
                <FiCheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                Verified
              </span>
            )}

            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-body font-medium"
              style={{
                background: `rgba(${colors.rgb},0.1)`,
                border: `1px solid rgba(${colors.rgb},0.25)`,
                color: colors.hex,
              }}
            >
              {catLabel}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-heading font-bold text-white mb-1 leading-tight"
            style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)' }}
          >
            {cert.title}
          </h3>

          {/* Issuer + date */}
          <p
            className="text-base font-body font-medium mb-1"
            style={{ color: colors.hex, opacity: 0.82 }}
          >
            {cert.issuer}
          </p>
          <p
            className="text-xs font-mono mb-4"
            style={{ color: 'var(--color-muted)' }}
          >
            {cert.issueDate}
          </p>

          {/* Description */}
          <p
            className="text-sm font-body leading-relaxed max-w-2xl mb-5"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {cert.description}
          </p>

          {/* Skills gained */}
          <div className="flex flex-wrap gap-2">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-lg text-xs font-body font-medium"
                style={{
                  background: `rgba(${colors.rgb},0.1)`,
                  border: `1px solid rgba(${colors.rgb},0.2)`,
                  color: colors.hex,
                  opacity: 0.9,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Credential link */}
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View credential for ${cert.title}`}
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200"
              style={{
                background: `rgba(${colors.rgb},0.1)`,
                border: `1px solid rgba(${colors.rgb},0.28)`,
                color: colors.hex,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(${colors.rgb},0.18)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `rgba(${colors.rgb},0.1)`
              }}
            >
              <FiExternalLink className="w-4 h-4" aria-hidden="true" />
              View Credential
            </a>
          )}
        </div>

        {/* Year badge — desktop only */}
        <div className="hidden md:flex flex-shrink-0 flex-col items-center gap-2">
          <span
            className="px-5 py-2.5 rounded-xl font-mono font-bold text-xl"
            style={{
              color: colors.hex,
              background: `rgba(${colors.rgb},0.1)`,
              border: `1px solid rgba(${colors.rgb},0.22)`,
            }}
          >
            {cert.issueDate}
          </span>
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: 'var(--color-muted)' }}
          >
            Year
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export default FeaturedCertCard
