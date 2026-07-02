import { motion } from 'framer-motion'
import { certifications } from '../data/certifications.js'

const issuerColors = {
  google: '#60A5FA',
  stanford: '#34D399',
  hec: '#A78BFA',
  usaii: '#FBBF24',
  icodeguru: '#34D399',
}

const issuerIcons = {
  google: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#60A5FA"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34D399"/>
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.61z" fill="#FBBF24"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#F87171"/>
    </svg>
  ),
  stanford: (
    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.7rem', color: '#34D399', letterSpacing: '0.05em' }}>
      STANFORD
    </div>
  ),
  hec: (
    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.7rem', color: '#A78BFA', letterSpacing: '0.05em' }}>
      HEC PK
    </div>
  ),
  usaii: (
    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.65rem', color: '#FBBF24', letterSpacing: '0.05em' }}>
      USAII
    </div>
  ),
  icodeguru: (
    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.65rem', color: '#34D399', letterSpacing: '0.05em' }}>
      iCodeGuru
    </div>
  ),
}

function getIssuerIcon(issuer) {
  if (issuer.includes('Google')) return 'google'
  if (issuer.includes('Stanford')) return 'stanford'
  if (issuer.includes('HEC')) return 'hec'
  if (issuer.includes('United States AI')) return 'usaii'
  if (issuer.includes('iCodeGuru')) return 'icodeguru'
  return null
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 relative overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: '500px', height: '500px', background: 'rgba(96,165,250,0.05)', top: '10%', right: '-5%' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-mono tracking-[0.2em] uppercase text-xs text-brand-violet mb-3">
            <span className="inline-block w-6 h-px bg-brand-violet mr-3 align-middle" />
            05 / Certifications
          </p>
          <h2 className="section-heading text-4xl lg:text-5xl mb-12">
            Licenses &amp; <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-start">
          {certifications.map((cert, index) => {
            const iconKey = getIssuerIcon(cert.issuer)
            const accentColor = issuerColors[iconKey] || '#A78BFA'

            return (
              <motion.div
                key={cert.id}
                className="glass-hover p-6 flex flex-col w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.07 }}
              >
                {/* Issuer row */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex items-center justify-center h-10 w-10 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {issuerIcons[iconKey]}
                  </div>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.62rem',
                      color: 'rgba(249,250,251,0.35)',
                    }}
                  >
                    {cert.date}
                  </span>
                </div>

                {/* Cert name and issuer */}
                <div className="mb-3">
                  <h3
                    className="font-semibold text-[0.95rem] text-white leading-snug mb-1"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {cert.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem',
                      color: accentColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                    }}
                  >
                    {cert.issuer}
                  </p>
                </div>

                {/* Credential ID */}
                {cert.credentialId && (
                  <p
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6rem',
                      color: 'rgba(249,250,251,0.3)',
                    }}
                  >
                    ID: {cert.credentialId}
                  </p>
                )}

                {/* Button and accent line - pushed to bottom */}
                <div className="mt-auto pt-4 flex flex-col gap-3">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-75"
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        border: `1px solid ${accentColor}50`,
                        color: accentColor,
                        backgroundColor: `${accentColor}12`,
                        width: 'fit-content',
                      }}
                    >
                      Show Credential
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : null}
                  <div
                    className="h-0.5 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accentColor}40, transparent)` }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
