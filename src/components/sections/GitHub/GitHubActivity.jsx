import { motion } from 'framer-motion'
import {
  FiGitCommit, FiGitPullRequest, FiAlertCircle, FiStar,
  FiGitBranch, FiPlus, FiMessageSquare, FiCode,
} from 'react-icons/fi'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'

const EVENT_MAP = {
  PushEvent: {
    icon: FiGitCommit,
    color: 'text-accent-blue',
    bg: 'bg-accent-blue/10',
    label: (e) => {
      const count = e.payload?.commits?.length ?? 0
      const repo  = e.repo?.name ?? ''
      return `Pushed ${count} commit${count !== 1 ? 's' : ''} to ${repo.split('/')[1] ?? repo}`
    },
  },
  PullRequestEvent: {
    icon: FiGitPullRequest,
    color: 'text-success',
    bg: 'bg-success/10',
    label: (e) => {
      const action = e.payload?.action ?? ''
      const repo   = e.repo?.name?.split('/')[1] ?? ''
      return `${action.charAt(0).toUpperCase() + action.slice(1)} pull request in ${repo}`
    },
  },
  IssuesEvent: {
    icon: FiAlertCircle,
    color: 'text-warning',
    bg: 'bg-warning/10',
    label: (e) => {
      const action = e.payload?.action ?? ''
      const repo   = e.repo?.name?.split('/')[1] ?? ''
      return `${action.charAt(0).toUpperCase() + action.slice(1)} issue in ${repo}`
    },
  },
  WatchEvent: {
    icon: FiStar,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    label: (e) => `Starred ${e.repo?.name ?? ''}`,
  },
  ForkEvent: {
    icon: FiGitBranch,
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
    label: (e) => `Forked ${e.repo?.name?.split('/')[1] ?? ''}`,
  },
  CreateEvent: {
    icon: FiPlus,
    color: 'text-success',
    bg: 'bg-success/10',
    label: (e) => {
      const ref  = e.payload?.ref ?? ''
      const type = e.payload?.ref_type ?? 'repository'
      return `Created ${type}${ref ? ` ${ref}` : ''} in ${e.repo?.name?.split('/')[1] ?? ''}`
    },
  },
  IssueCommentEvent: {
    icon: FiMessageSquare,
    color: 'text-text-secondary',
    bg: 'bg-surface',
    label: (e) => `Commented on issue in ${e.repo?.name?.split('/')[1] ?? ''}`,
  },
  PullRequestReviewEvent: {
    icon: FiCode,
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
    label: (e) => `Reviewed PR in ${e.repo?.name?.split('/')[1] ?? ''}`,
  },
}

function timeAgo(dateStr) {
  const diff  = Date.now() - new Date(dateStr)
  const mins  = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days  = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

function ActivityItem({ event }) {
  const meta = EVENT_MAP[event.type]
  if (!meta) return null
  const Icon = meta.icon

  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0"
    >
      <div className={`w-8 h-8 rounded-lg ${meta.bg} border border-white/5 flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon className={`w-3.5 h-3.5 ${meta.color}`} aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-text-secondary text-xs leading-relaxed line-clamp-1">
          {meta.label(event)}
        </p>
        <span className="text-muted text-[11px]">{timeAgo(event.created_at)}</span>
      </div>
    </motion.div>
  )
}

function FallbackRow({ repo }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0"
    >
      <div className="w-8 h-8 rounded-lg bg-accent-blue/10 border border-white/5 flex items-center justify-center shrink-0">
        <FiCode className="w-3.5 h-3.5 text-accent-blue" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-text-secondary text-xs truncate">{repo.name}</p>
        <span className="text-muted text-[11px]">Recently updated</span>
      </div>
    </motion.div>
  )
}

function GitHubActivity({ events, repos }) {
  const validEvents = events?.filter(e => EVENT_MAP[e.type]) ?? []
  const showFallback = validEvents.length === 0

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="glass rounded-2xl p-6 flex flex-col h-fit"
    >
      <motion.h3 variants={fadeUp} className="font-heading font-semibold text-white text-base mb-1">
        Recent Activity
      </motion.h3>
      <motion.p variants={fadeUp} className="text-muted text-xs mb-4">
        {showFallback ? 'Latest updated repositories' : 'Latest public events'}
      </motion.p>

      <motion.div variants={staggerContainer(0.06)} className="flex flex-col">
        {showFallback
          ? repos.slice(0, 6).map(r => <FallbackRow key={r.id} repo={r} />)
          : validEvents.slice(0, 6).map((e, i) => <ActivityItem key={`${e.id}-${i}`} event={e} />)
        }
      </motion.div>
    </motion.div>
  )
}

export default GitHubActivity
