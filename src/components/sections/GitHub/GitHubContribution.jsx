import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiZap, FiTrendingUp, FiActivity, FiRefreshCw } from 'react-icons/fi'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import { getUsername } from '@services/github'
import CountUp from 'react-countup'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

const CACHE_TTL  = 15 * 60 * 1000
const CACHE_KEY  = `ghc:contributions:${getUsername()}`

const LEVEL_COLORS = [
  'rgba(13, 31, 67, 0.8)',
  'rgba(46, 107, 255, 0.25)',
  'rgba(46, 107, 255, 0.50)',
  'rgba(46, 107, 255, 0.75)',
  'rgba(46, 107, 255, 1.00)',
]

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function cacheRead(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { ts, data } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(key); return null }
    return data
  } catch { return null }
}

function cacheWrite(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ ts: Date.now(), data })) } catch {}
}

function buildGrid(contributions) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - 364)
  start.setDate(start.getDate() - start.getDay()) // back to Sunday

  const map = {}
  for (const c of contributions) map[c.date] = c

  const weeks = []
  let week = []
  const cur  = new Date(start)

  while (cur <= today) {
    const dateStr = cur.toISOString().slice(0, 10)
    week.push(map[dateStr] ?? { date: dateStr, count: 0, level: 0 })

    if (cur.getDay() === 6) {
      weeks.push(week)
      week = []
    }
    cur.setDate(cur.getDate() + 1)
  }
  if (week.length) weeks.push(week)

  return weeks
}

function getMonthLabels(weeks) {
  const labels = []
  let lastMonth = -1
  weeks.forEach((week, wi) => {
    const firstDay = week[0]
    if (!firstDay) return
    const m = new Date(firstDay.date).getMonth()
    if (m !== lastMonth) {
      labels.push({ index: wi, label: MONTHS[m] })
      lastMonth = m
    }
  })
  return labels
}

function computeStats(contributions) {
  const today   = new Date().toISOString().slice(0, 10)
  const sorted  = [...contributions]
    .filter(c => c.date <= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const total  = sorted.reduce((s, c) => s + c.count, 0)

  let streak = 0
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) streak++
    else break
  }

  let longest = 0, cur = 0
  for (const c of sorted) {
    if (c.count > 0) { cur++; longest = Math.max(longest, cur) }
    else cur = 0
  }

  return { total, streak, longest }
}

function ContribGrid({ weeks }) {
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks])

  return (
    <div className="overflow-x-auto pb-1" tabIndex={0} aria-label="GitHub contribution graph">
      <div className="inline-block min-w-0">
        {/* Month labels */}
        <div className="flex mb-1" style={{ paddingLeft: '0px' }}>
          {weeks.map((_, wi) => {
            const label = monthLabels.find(l => l.index === wi)
            return (
              <div key={wi} className="w-[14px] mr-[3px] shrink-0">
                {label && (
                  <span className="text-[9px] text-muted select-none leading-none">
                    {label.label}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="w-3 h-3 rounded-[2px] transition-opacity duration-150 hover:opacity-75"
                  style={{ backgroundColor: LEVEL_COLORS[day.level ?? 0] }}
                  title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                  role="gridcell"
                  aria-label={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-2 justify-end">
          <span className="text-[10px] text-muted">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-[2px]"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          ))}
          <span className="text-[10px] text-muted">More</span>
        </div>
      </div>
    </div>
  )
}

function StatChip({ icon: Icon, label, value, reducedMotion }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl bg-surface/60 border border-white/5">
      <Icon className="w-4 h-4 text-accent-blue" aria-hidden="true" />
      <span className="font-heading font-bold text-xl text-white leading-none">
        {reducedMotion ? value : (
          <CountUp end={value} duration={1.8} enableScrollSpy scrollSpyOnce />
        )}
      </span>
      <span className="text-muted text-[11px] leading-none text-center">{label}</span>
    </div>
  )
}

function GitHubContribution() {
  const [contribs, setContribs] = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const cached = cacheRead(CACHE_KEY)
      if (cached) { setContribs(cached); setLoading(false); return }

      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${getUsername()}?y=last`
      )
      if (!res.ok) throw new Error('Contributions API unavailable')
      const json = await res.json()
      cacheWrite(CACHE_KEY, json.contributions)
      setContribs(json.contributions)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const weeks = useMemo(() => (contribs ? buildGrid(contribs) : []), [contribs])
  const stats = useMemo(() => (contribs ? computeStats(contribs) : null), [contribs])

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="glass rounded-2xl p-6 flex flex-col gap-5"
    >
      <h3 className="font-heading font-semibold text-white text-base">
        Contribution Activity
      </h3>

      {loading && (
        <div className="flex flex-col gap-3">
          <div className="h-[88px] rounded-xl bg-surface/60 animate-pulse" />
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-16 rounded-xl bg-surface/60 animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <p className="text-text-secondary text-sm">
            Contribution data temporarily unavailable.
            <br />
            Architecture is ready for GitHub GraphQL when a token is set.
          </p>
          <button
            onClick={load}
            className="flex items-center gap-2 text-accent-blue text-sm hover:text-accent-purple transition-colors duration-200 focus-visible:outline-accent-blue focus-visible:outline-2 rounded"
            aria-label="Retry loading contribution data"
          >
            <FiRefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      {!loading && !error && contribs && (
        <>
          <ContribGrid weeks={weeks} />

          {stats && (
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-3 gap-3"
            >
              <StatChip icon={FiActivity}   label="Total / Year"    value={stats.total}   reducedMotion={reducedMotion} />
              <StatChip icon={FiZap}        label="Current Streak"  value={stats.streak}  reducedMotion={reducedMotion} />
              <StatChip icon={FiTrendingUp} label="Longest Streak"  value={stats.longest} reducedMotion={reducedMotion} />
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}

export default GitHubContribution
