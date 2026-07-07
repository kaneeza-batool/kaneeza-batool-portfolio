import { cn } from '@utils/helpers'

function Bone({ className }) {
  return (
    <div
      className={cn(
        'rounded-xl bg-surface/60 relative overflow-hidden',
        'before:absolute before:inset-0',
        'before:bg-gradient-to-r before:from-transparent before:via-white/[0.04] before:to-transparent',
        'before:translate-x-[-100%] before:animate-[shimmer_1.6s_infinite]',
        className
      )}
    />
  )
}

export function ProfileCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4">
      <Bone className="w-20 h-20 rounded-full mx-auto" />
      <Bone className="h-5 w-40 mx-auto" />
      <Bone className="h-3.5 w-28 mx-auto" />
      <Bone className="h-12 w-full" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Bone key={i} className="h-14 rounded-xl" />
        ))}
      </div>
      <Bone className="h-10 rounded-xl" />
    </div>
  )
}

export function StatsRowSkeleton() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 flex flex-col gap-3">
          <Bone className="w-9 h-9 rounded-xl" />
          <Bone className="h-8 w-16" />
          <Bone className="h-3.5 w-20" />
        </div>
      ))}
    </div>
  )
}

export function PinnedReposSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 flex flex-col gap-3">
          <Bone className="h-4 w-32" />
          <Bone className="h-10 w-full" />
          <div className="flex gap-3">
            <Bone className="h-3.5 w-16" />
            <Bone className="h-3.5 w-12" />
            <Bone className="h-3.5 w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function LanguagesSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4">
      <Bone className="h-5 w-28" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <Bone className="h-3.5 w-20" />
            <Bone className="h-3.5 w-8" />
          </div>
          <Bone className="h-2 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function ReposSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-3">
      <Bone className="h-5 w-32 mb-1" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
          <div className="flex flex-col gap-1.5">
            <Bone className="h-4 w-36" />
            <Bone className="h-3 w-52" />
          </div>
          <div className="flex gap-3">
            <Bone className="h-3 w-10" />
            <Bone className="h-3 w-10" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ContribSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-4">
      <Bone className="h-5 w-40" />
      <div className="flex gap-1 overflow-hidden">
        {Array.from({ length: 52 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, di) => (
              <Bone key={di} className="w-3 h-3 rounded-[2px]" />
            ))}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bone key={i} className="h-14 flex-1 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

export function ActivitySkeleton() {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col gap-3">
      <Bone className="h-5 w-32 mb-1" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 py-2.5">
          <Bone className="w-8 h-8 rounded-lg shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Bone className="h-3.5 w-full" />
            <Bone className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}
