import { useState, useEffect, useCallback } from 'react'
import {
  fetchProfile,
  fetchRepos,
  fetchActivity,
  computeFeaturedRepos,
  computeLanguages,
  computeStats,
  invalidateCache,
} from '@services/github'

export function useGithub() {
  const [loading,              setLoading]              = useState(true)
  const [error,                setError]                = useState(null)
  const [profile,              setProfile]              = useState(null)
  const [repositories,         setRepositories]         = useState([])
  const [featuredRepositories, setFeaturedRepositories] = useState([])
  const [languages,            setLanguages]            = useState([])
  const [stats,                setStats]                = useState(null)
  const [activity,             setActivity]             = useState([])

  const load = useCallback(async (force = false) => {
    if (force) invalidateCache()
    setLoading(true)
    setError(null)
    try {
      const [profileData, reposData, activityData] = await Promise.all([
        fetchProfile(),
        fetchRepos(),
        fetchActivity(),
      ])

      setProfile(profileData)
      setRepositories(
        reposData
          .filter(r => !r.fork && !r.archived)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 10)
      )
      setFeaturedRepositories(computeFeaturedRepos(reposData))
      setLanguages(computeLanguages(reposData))
      setStats(computeStats(profileData, reposData))
      setActivity(activityData.slice(0, 6))
    } catch (err) {
      setError(err.message || 'Failed to load GitHub data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const refresh = useCallback(() => load(true), [load])

  return {
    loading,
    error,
    profile,
    repositories,
    featuredRepositories,
    languages,
    stats,
    activity,
    refresh,
  }
}
