import { motion } from 'framer-motion'
import { SectionHeading } from '@components/common'
import SectionWrapper from '@components/layout/SectionWrapper'
import { useGithub } from '@hooks/useGithub'
import { staggerContainer, viewportConfig } from '@utils/motion'

import GitHubError from './GitHubError'
import GitHubProfileCard from './GitHubProfileCard'
import GitHubStatsRow from './GitHubStatsRow'
import GitHubPinnedRepos from './GitHubPinnedRepos'
import GitHubLanguages from './GitHubLanguages'
import GitHubRecentRepos from './GitHubRecentRepos'
import GitHubContribution from './GitHubContribution'
import GitHubActivity from './GitHubActivity'
import GitHubCTA from './GitHubCTA'
import {
  ProfileCardSkeleton,
  StatsRowSkeleton,
  PinnedReposSkeleton,
  LanguagesSkeleton,
  ReposSkeleton,
  ContribSkeleton,
  ActivitySkeleton,
} from './GitHubSkeletons'

function GitHubSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        <ProfileCardSkeleton />
        <StatsRowSkeleton />
      </div>
      <PinnedReposSkeleton />
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <LanguagesSkeleton />
        <ReposSkeleton />
      </div>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <ContribSkeleton />
        <ActivitySkeleton />
      </div>
    </div>
  )
}

function GitHub() {
  const {
    loading,
    error,
    profile,
    repositories,
    featuredRepositories,
    languages,
    stats,
    activity,
    refresh,
  } = useGithub()

  return (
    <SectionWrapper id="github">
      <SectionHeading
        subtitle="Building in Public"
        title="GitHub"
        description="My GitHub profile reflects continuous learning through projects, experimentation, and consistent contributions — every commit a step forward."
      />

      {loading && <GitHubSkeleton />}

      {error && !loading && (
        <GitHubError message={error} onRetry={refresh} />
      )}

      {!loading && !error && (
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col gap-6"
        >
          {/* Profile + Stats */}
          <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">
            <GitHubProfileCard profile={profile} stats={stats} />
            <GitHubStatsRow stats={stats} />
          </div>

          {/* Featured repos */}
          <GitHubPinnedRepos repos={featuredRepositories} />

          {/* Languages + Recent repos */}
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
            <GitHubLanguages languages={languages} />
            <GitHubRecentRepos repos={repositories} />
          </div>

          {/* Contribution graph + Activity */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
            <GitHubContribution />
            <GitHubActivity events={activity} repos={repositories} />
          </div>

          {/* CTA */}
          <GitHubCTA />
        </motion.div>
      )}
    </SectionWrapper>
  )
}

export default GitHub
