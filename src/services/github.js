const CACHE_TTL = 15 * 60 * 1000

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME ?? 'kaneeza-batool'
const TOKEN    = import.meta.env.VITE_GITHUB_TOKEN
const BASE     = 'https://api.github.com'

function buildHeaders() {
  const h = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`
  return h
}

function cacheRead(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(key); return null }
    return data
  } catch {
    return null
  }
}

function cacheWrite(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data }))
  } catch {
    // storage quota exceeded — skip silently
  }
}

async function ghFetch(path) {
  const cacheKey = `gh:${path}`
  const cached = cacheRead(cacheKey)
  if (cached !== null) return cached

  const res = await fetch(`${BASE}${path}`, { headers: buildHeaders() })
  if (res.status === 403) {
    const remaining = res.headers.get('x-ratelimit-remaining')
    if (remaining === '0') {
      throw new Error('GitHub API rate limit reached. Set VITE_GITHUB_TOKEN in .env.local for higher limits.')
    }
  }
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`)

  const data = await res.json()
  cacheWrite(cacheKey, data)
  return data
}

export function getUsername() {
  return USERNAME
}

export async function fetchProfile() {
  return ghFetch(`/users/${USERNAME}`)
}

export async function fetchRepos() {
  const all = []
  let page = 1
  while (true) {
    const batch = await ghFetch(
      `/users/${USERNAME}/repos?type=owner&sort=updated&per_page=100&page=${page}`
    )
    all.push(...batch)
    if (batch.length < 100) break
    page++
    if (page > 5) break // safety cap
  }
  return all
}

export async function fetchActivity() {
  return ghFetch(`/users/${USERNAME}/events/public?per_page=15`)
}

// Architecture note: replace this with GitHub GraphQL when VITE_GITHUB_TOKEN is available.
// GraphQL query: { user(login: USERNAME) { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... } } } }
// POST https://api.github.com/graphql with Authorization: Bearer TOKEN
export function computeFeaturedRepos(repos) {
  return repos
    .filter(r => !r.fork && !r.archived)
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.updated_at) - new Date(a.updated_at)
    )
    .slice(0, 6)
}

export function computeLanguages(repos) {
  const counts = {}
  let total = 0
  for (const repo of repos) {
    if (repo.language && !repo.fork && !repo.archived) {
      counts[repo.language] = (counts[repo.language] || 0) + 1
      total++
    }
  }
  if (total === 0) return []
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count)
}

export function computeStats(profile, repos) {
  const active      = repos.filter(r => !r.fork && !r.archived)
  const totalStars  = active.reduce((s, r) => s + r.stargazers_count, 0)
  const totalForks  = active.reduce((s, r) => s + r.forks_count, 0)
  const created     = new Date(profile.created_at)
  const yearsOnGitHub = Math.max(new Date().getFullYear() - created.getFullYear(), 1)
  return {
    repos:        profile.public_repos,
    followers:    profile.followers,
    following:    profile.following,
    gists:        profile.public_gists,
    totalStars,
    totalForks,
    yearsOnGitHub,
  }
}

export function invalidateCache() {
  try {
    Object.keys(localStorage)
      .filter(k => k.startsWith('gh:'))
      .forEach(k => localStorage.removeItem(k))
  } catch {}
}

export const LANGUAGE_COLORS = {
  JavaScript:          '#F7DF1E',
  TypeScript:          '#3178C6',
  HTML:                '#E34C26',
  CSS:                 '#563D7C',
  SCSS:                '#C6538C',
  Sass:                '#A53B70',
  Python:              '#3572A5',
  Java:                '#B07219',
  'C++':               '#F34B7D',
  C:                   '#555555',
  'C#':                '#178600',
  Ruby:                '#701516',
  Go:                  '#00ADD8',
  Rust:                '#DEA584',
  PHP:                 '#4F5D95',
  Swift:               '#FA7343',
  Kotlin:              '#7F52FF',
  Dart:                '#00B4AB',
  Shell:               '#89E051',
  Vue:                 '#41B883',
  'Jupyter Notebook':  '#DA5B0B',
  R:                   '#198CE7',
  Lua:                 '#000080',
  Elixir:              '#6E4A7E',
  Haskell:             '#5E5086',
  Scala:               '#C22D40',
}
