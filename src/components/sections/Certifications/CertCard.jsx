import { motion } from 'framer-motion'
import { FiExternalLink, FiCheckCircle } from 'react-icons/fi'
import { cn } from '@utils/helpers'
import { usePrefersReducedMotion } from '@hooks'
import { CERT_COLORS, CATEGORY_LABEL } from '@data/certifications'

function IssuerPlaceholder({ issuer, issuerShort, colors }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(${colors.rgb},0.14) 0%, rgba(${colors.rgb},0.04) 100%)`,
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(${colors.rgb},0.12) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      {/* Diagonal stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(${colors.rgb},0.04) 0px,
            rgba(${colors.rgb},0.04) 1px,
            transparent 1px,
            transparent 18px
          )`,
        }}
      />
      {/* Initials */}
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <span
          style={{
            fontSize: '2.75rem',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            color: `rgba(${colors.rgb},0.45)`,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
          aria-hidden="true"
        >
          {issuerShort}
        </span>
        <span
          style={{
            fontSize: '0.58rem',
            color: `rgba(${colors.rgb},0.3)`,
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
          aria-hidden="true"
        >
          {issuer.split(' ').slice(0, 2).join(' ')}
        </span>
      </div>
    </div>
  )
}

function CertCard({ cert }) {
  const reduced = usePrefersReducedMotion()
  const colors = CERT_COLORS[cert.colorKey] ?? CERT_COLORS.blue
  const catLabel = CATEGORY_LABEL[cert.category] ?? cert.category

  const cardVariants = {
    rest: {
      y: 0,
      boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      borderColor: 'rgba(255,255,255,0.08)',
    },
    hover: {
      y: reduced ? 0 : -7,
      boxShadow: reduced
        ? '0 2px 20px rgba(0,0,0,0.3)'
        : `0 18px 52px rgba(0,0,0,0.5), 0 0 32px rgba(${colors.rgb},0.12)`,
      borderColor: `rgba(${colors.rgb},0.3)`,
    },
  }

  const imageVariants = {
    rest:  { scale: 1 },
    hover: { scale: reduced ? 1 : 1.07 },
  }

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardVariants}
      transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col h-full rounded-2xl border overflow-hidden card-highlight"
      style={{
        background: 'rgba(13,31,67,0.82)',
        backdropFilter: 'blur(14px)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
      role="article"
      aria-label={`${cert.title} — ${cert.issuer}`}
    >
      {/* Verified ribbon */}
      {cert.verified && (
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 z-20 w-20 h-20 overflow-hidden pointer-events-none"
        >
          <div
            className="absolute -top-1 -right-5 w-28 py-1 text-center text-[0.55rem] font-mono font-bold tracking-widest uppercase rotate-45"
            style={{
              background: `linear-gradient(90deg, rgba(${colors.rgb},0.8), rgba(${colors.rgb},0.55))`,
              color: '#050E20',
            }}
          >
            VERIFIED
          </div>
        </div>
      )}

      {/* Thumbnail */}
      <div className="h-40 flex-shrink-0 overflow-hidden relative">
        {cert.certificateImage ? (
          <motion.div variants={imageVariants} transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }} className="w-full h-full">
            <img
              src={cert.certificateImage}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            variants={imageVariants}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full"
          >
            <IssuerPlaceholder issuer={cert.issuer} issuerShort={cert.issuerShort} colors={colors} />
          </motion.div>
        )}
        {/* Bottom fade overlay */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-8 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(13,31,67,0.78))',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category chip */}
        <span
          className="inline-flex self-start items-center px-2.5 py-1 rounded-pill text-xs font-body font-medium mb-3.5"
          style={{
            background: `rgba(${colors.rgb},0.1)`,
            border: `1px solid rgba(${colors.rgb},0.22)`,
            color: colors.hex,
          }}
        >
          {catLabel}
        </span>

        {/* Title */}
        <h3 className="text-sm font-heading font-bold text-white leading-snug mb-1">
          {cert.title}
        </h3>

        {/* Issuer + date */}
        <p
          className="text-xs font-body font-medium mb-1"
          style={{ color: colors.hex, opacity: 0.82 }}
        >
          {cert.issuer}
        </p>
        <p
          className="text-xs font-mono mb-3"
          style={{ color: 'var(--color-muted)' }}
        >
          {cert.issueDate}
        </p>

        {/* Description */}
        <p
          className="text-xs font-body leading-relaxed flex-1 mb-4"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {cert.description}
        </p>

        {/* Skills chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {cert.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded text-xs font-body"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {skill}
            </span>
          ))}
          {cert.skills.length > 4 && (
            <span
              className="px-2 py-0.5 rounded text-xs font-body"
              style={{ color: 'var(--color-muted)' }}
            >
              +{cert.skills.length - 4}
            </span>
          )}
        </div>

        {/* Footer: verified badge + credential link */}
        <div className="flex items-center gap-2 mt-auto">
          {cert.verified && (
            <span
              className="inline-flex items-center gap-1 text-xs font-body font-medium"
              style={{ color: '#22C55E' }}
            >
              <FiCheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Verified
            </span>
          )}

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View credential for ${cert.title}`}
              className={cn(
                'ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-body',
                'transition-colors duration-200 border',
                'text-text-secondary border-[rgba(255,255,255,0.1)] hover:text-white hover:border-white/20 hover:bg-white/5'
              )}
            >
              <FiExternalLink className="w-3 h-3" aria-hidden="true" />
              Credential
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default CertCard
