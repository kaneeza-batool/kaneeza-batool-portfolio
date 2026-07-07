import { motion } from 'framer-motion'
import { fadeLeft, staggerContainer, viewportConfig } from '@utils/motion'
import { LANGUAGE_COLORS } from '@services/github'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

function LanguageBar({ lang, index, reducedMotion }) {
  const color = LANGUAGE_COLORS[lang.name] ?? '#6E7B9C'

  return (
    <motion.div variants={fadeLeft} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          <span className="text-text-secondary text-sm font-body">{lang.name}</span>
        </div>
        <span className="text-muted text-xs font-mono tabular-nums">{lang.pct}%</span>
      </div>

      <div
        className="w-full h-1.5 rounded-full bg-surface overflow-hidden"
        role="progressbar"
        aria-valuenow={lang.pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${lang.name}: ${lang.pct}%`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${lang.pct}%` }}
          viewport={viewportConfig}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.8, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }
          }
        />
      </div>
    </motion.div>
  )
}

function GitHubLanguages({ languages }) {
  const reducedMotion = usePrefersReducedMotion()

  if (!languages?.length) return null

  return (
    <motion.div
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="glass rounded-2xl p-6 flex flex-col gap-4 h-fit"
    >
      <motion.h3
        variants={fadeLeft}
        className="font-heading font-semibold text-white text-base"
      >
        Languages
      </motion.h3>

      <div className="flex flex-col gap-3.5">
        {languages.slice(0, 8).map((lang, i) => (
          <LanguageBar
            key={lang.name}
            lang={lang}
            index={i}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      <p className="text-muted text-xs leading-relaxed mt-1">
        Based on primary language of each repository
      </p>
    </motion.div>
  )
}

export default GitHubLanguages
