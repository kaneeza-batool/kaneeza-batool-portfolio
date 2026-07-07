import { motion } from 'framer-motion'
import { FiUsers, FiUserCheck, FiBook, FiFileText, FiCalendar, FiGithub, FiExternalLink } from 'react-icons/fi'
import { fadeLeft, viewportConfig } from '@utils/motion'
import { formatDate } from '@utils/helpers'
import Button from '@components/common/Button'

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl bg-surface/60 border border-white/5 hover:border-accent-blue/20 transition-colors duration-300">
      <Icon className="w-4 h-4 text-accent-blue" aria-hidden="true" />
      <span className="font-heading font-bold text-white text-base leading-none">{value}</span>
      <span className="text-muted text-[11px] leading-none">{label}</span>
    </div>
  )
}

function GitHubProfileCard({ profile, stats }) {
  if (!profile) return null

  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="glass rounded-2xl p-6 flex flex-col gap-5 h-fit"
    >
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-20 h-20 rounded-full ring-2 ring-accent-blue/40 ring-offset-2 ring-offset-surface overflow-hidden">
            <img
              src={profile.avatar_url}
              alt={`${profile.name || profile.login}'s GitHub avatar`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <span
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-surface"
            aria-label="Active profile"
          />
        </div>
        <div className="text-center">
          <h3 className="font-heading font-semibold text-white text-lg leading-tight">
            {profile.name || profile.login}
          </h3>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue text-sm font-mono hover:text-accent-purple transition-colors duration-200"
            aria-label="Open GitHub profile"
          >
            @{profile.login}
          </a>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="text-text-secondary text-sm leading-relaxed text-center">
          {profile.bio}
        </p>
      )}

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatPill icon={FiUsers}    label="Followers" value={profile.followers} />
        <StatPill icon={FiUserCheck} label="Following" value={profile.following} />
        <StatPill icon={FiBook}     label="Repos"     value={profile.public_repos} />
        <StatPill icon={FiFileText} label="Gists"     value={profile.public_gists} />
      </div>

      {/* Member since */}
      <div className="flex items-center gap-2 text-muted text-xs justify-center">
        <FiCalendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Member since {formatDate(profile.created_at)}</span>
      </div>

      {/* CTA */}
      <Button
        as="a"
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        size="md"
        icon={<FiGithub className="w-4 h-4" />}
        className="w-full justify-center"
        aria-label="Open GitHub profile in new tab"
      >
        View Profile
        <FiExternalLink className="w-3.5 h-3.5 ml-1 opacity-60" aria-hidden="true" />
      </Button>
    </motion.div>
  )
}

export default GitHubProfileCard
