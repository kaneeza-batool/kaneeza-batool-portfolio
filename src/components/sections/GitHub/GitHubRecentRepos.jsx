import { motion } from 'framer-motion'
import { FiStar, FiGitBranch, FiExternalLink } from 'react-icons/fi'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { LANGUAGE_COLORS } from '@services/github'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr)
  const days = Math.floor(diff / 86_400_000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}yr ago`
}

function RepoRow({ repo }) {
  const langColor = LANGUAGE_COLORS[repo.language] ?? '#6E7B9C'

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      className="flex items-center gap-4 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-2 px-2 rounded-xl transition-colors duration-200 group"
      aria-label={`Open ${repo.name} repository`}
    >
      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-body font-medium text-white text-sm group-hover:text-accent-blue transition-colors duration-200 truncate">
            {repo.name}
          </span>
          <FiExternalLink
            className="w-3 h-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0"
            aria-hidden="true"
          />
        </div>
        {repo.description && (
          <p className="text-muted text-xs leading-relaxed truncate mt-0.5">
            {repo.description}
          </p>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 shrink-0 text-muted text-xs">
        {repo.language && (
          <span className="items-center gap-1.5 hidden sm:flex">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: langColor }} aria-hidden="true" />
            <span className="hidden md:inline">{repo.language}</span>
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
        <span className="hidden lg:inline text-[11px]">{timeAgo(repo.updated_at)}</span>
      </div>
    </motion.a>
  )
}

function GitHubRecentRepos({ repos }) {
  if (!repos?.length) return null

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="glass rounded-2xl p-6 flex flex-col"
    >
      <motion.h3
        variants={fadeUp}
        className="font-heading font-semibold text-white text-base mb-1"
      >
        Recent Repositories
      </motion.h3>
      <motion.p variants={fadeUp} className="text-muted text-xs mb-4">
        Sorted by last updated
      </motion.p>

      <motion.div
        variants={staggerContainer(0.05)}
        className="flex flex-col"
      >
        {repos.map(repo => (
          <RepoRow key={repo.id} repo={repo} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default GitHubRecentRepos
