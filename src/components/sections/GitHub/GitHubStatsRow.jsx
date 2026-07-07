import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { FiCode, FiUsers, FiUserPlus, FiAward } from 'react-icons/fi'
import { staggerContainer, fadeUp, viewportConfig } from '@utils/motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

const STAT_CARDS = [
  { key: 'repos',         label: 'Repositories',    icon: FiCode,      suffix: '+',  color: 'text-accent-blue',   bg: 'bg-accent-blue/10',   border: 'border-accent-blue/20' },
  { key: 'followers',     label: 'Followers',        icon: FiUsers,     suffix: '',   color: 'text-accent-purple', bg: 'bg-accent-purple/10', border: 'border-accent-purple/20' },
  { key: 'following',     label: 'Following',        icon: FiUserPlus,  suffix: '',   color: 'text-success',       bg: 'bg-success/10',       border: 'border-success/20' },
  { key: 'yearsOnGitHub', label: 'Years on GitHub',  icon: FiAward,     suffix: '+',  color: 'text-warning',       bg: 'bg-warning/10',       border: 'border-warning/20' },
]

function StatCard({ stat, value, reducedMotion }) {
  const Icon = stat.icon
  return (
    <motion.div
      variants={fadeUp}
      className={`glass rounded-2xl p-5 flex flex-col gap-3 border ${stat.border} hover:scale-[1.02] transition-transform duration-300`}
    >
      <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
      </div>

      <div>
        <div className={`font-heading font-bold text-3xl ${stat.color} leading-none`}>
          {reducedMotion ? (
            <span>{value}{stat.suffix}</span>
          ) : (
            <CountUp
              end={value}
              duration={2}
              suffix={stat.suffix}
              enableScrollSpy
              scrollSpyDelay={100}
              scrollSpyOnce
            />
          )}
        </div>
        <div className="text-text-secondary text-sm mt-1">{stat.label}</div>
      </div>
    </motion.div>
  )
}

function GitHubStatsRow({ stats }) {
  const reducedMotion = usePrefersReducedMotion()
  if (!stats) return null

  return (
    <motion.div
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="grid grid-cols-2 xl:grid-cols-4 gap-4 content-start"
    >
      {STAT_CARDS.map(stat => (
        <StatCard
          key={stat.key}
          stat={stat}
          value={stats[stat.key]}
          reducedMotion={reducedMotion}
        />
      ))}
    </motion.div>
  )
}

export default GitHubStatsRow
