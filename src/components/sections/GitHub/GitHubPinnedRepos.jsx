import { motion } from 'framer-motion'
import { FiStar, FiGitBranch, FiExternalLink, FiClock } from 'react-icons/fi'
import { staggerContainer, fadeUp, cardHover, viewportConfig } from '@utils/motion'
import { LANGUAGE_COLORS } from '@services/github'
import Badge from '@components/common/Badge'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function PinnedRepoCard({ repo }) {
  const langColor = LANGUAGE_COLORS[repo.language] ?? '#6E7B9C'

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      {...{ variants: { ...cardHover, hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } } }}
      className="glass rounded-2xl p-5 flex flex-col gap-3 border border-white/5 hover:border-accent-blue/25 transition-colors duration-300 group cursor-pointer"
      aria-label={`Open ${repo.name} on GitHub`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-heading font-semibold text-white text-sm group-hover:text-accent-blue transition-colors duration-200 leading-snug">
          {repo.name}
        </h4>
        <FiExternalLink
          className="w-3.5 h-3.5 text-muted group-hover:text-accent-blue transition-colors duration-200 shrink-0 mt-0.5"
          aria-hidden="true"
        />
      </div>

      {/* Description */}
      <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 flex-1">
        {repo.description || 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map(topic => (
            <Badge key={topic} variant="secondary" className="text-[10px] px-2 py-0.5">
              {topic}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <div className="flex items-center gap-3 text-muted text-xs">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: langColor }} aria-hidden="true" />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1" aria-label={`${repo.stargazers_count} stars`}>
            <FiStar className="w-3 h-3" aria-hidden="true" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1" aria-label={`${repo.forks_count} forks`}>
            <FiGitBranch className="w-3 h-3" aria-hidden="true" />
            {repo.forks_count}
          </span>
        </div>
        <span className="flex items-center gap-1 text-muted text-xs">
          <FiClock className="w-3 h-3" aria-hidden="true" />
          {timeAgo(repo.updated_at)}
        </span>
      </div>
    </motion.a>
  )
}

function GitHubPinnedRepos({ repos }) {
  if (!repos?.length) return null

  return (
    <section aria-label="Featured repositories" className="mb-6">
      <motion.h3
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="font-heading font-semibold text-white text-base mb-4"
      >
        Featured Repositories
      </motion.h3>

      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {repos.map(repo => (
          <PinnedRepoCard key={repo.id ?? repo.name} repo={repo} />
        ))}
      </motion.div>
    </section>
  )
}

export default GitHubPinnedRepos
