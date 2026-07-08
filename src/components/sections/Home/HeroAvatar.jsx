import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { SiReact, SiJavascript, SiNodedotjs, SiMongodb, SiPython, SiGit } from 'react-icons/si'
import { Badge } from '@components/common'
import { zoomIn, staggerContainer } from '@utils/motion'
import { cn } from '@utils/helpers'
import { usePrefersReducedMotion } from '@hooks'
// Replace this import with your profile photo when ready
import profileImg from '@assets/hero.png'

// Six icons evenly distributed around the avatar card
const TECH_ICONS = [
  {
    Icon: SiReact,
    label: 'React',
    color: '#61DAFB',
    positionClass: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
    delay: 0,
    duration: 3.5,
    floatY: -8,
  },
  {
    Icon: SiJavascript,
    label: 'JavaScript',
    color: '#F7DF1E',
    positionClass: 'top-1/4 -right-6 -translate-y-1/2',
    delay: 0.4,
    duration: 4,
    floatY: -10,
  },
  {
    Icon: SiNodedotjs,
    label: 'Node.js',
    color: '#339933',
    positionClass: 'bottom-1/4 -right-6 translate-y-1/2',
    delay: 0.8,
    duration: 3.8,
    floatY: -7,
  },
  {
    Icon: SiMongodb,
    label: 'MongoDB',
    color: '#47A248',
    positionClass: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
    delay: 1.2,
    duration: 4.2,
    floatY: -9,
  },
  {
    Icon: SiPython,
    label: 'Python',
    color: '#3776AB',
    positionClass: 'bottom-1/4 -left-6 translate-y-1/2',
    delay: 0.6,
    duration: 3.6,
    floatY: -8,
  },
  {
    Icon: SiGit,
    label: 'Git',
    color: '#F05032',
    positionClass: 'top-1/4 -left-6 -translate-y-1/2',
    delay: 0.2,
    duration: 4.5,
    floatY: -11,
  },
]

const STATUS_BADGES = [
  { label: 'BSCS Student', variant: 'primary' },
  { label: 'Frontend Developer', variant: 'secondary' },
  { label: 'AI Learner', variant: 'outline' },
  { label: 'Internship Ready', variant: 'success' },
]

const badgeContainer = staggerContainer(0.08, 0.9)

// Separate positioning div (CSS) from animation div (Framer Motion)
// to avoid transform conflicts between Tailwind translate classes and FM
function TechIconOrb({ Icon, label, color, positionClass, delay, duration, floatY }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className={cn('absolute z-10', positionClass)} aria-hidden="true">
      {/* Scale-in entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 + delay, duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        {/* Independent float animation */}
        <motion.div
          className="w-12 h-12 rounded-2xl glass flex items-center justify-center shadow-md"
          animate={reduced ? {} : { y: [0, floatY, 0] }}
          transition={{
            duration,
            delay: delay * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          title={label}
        >
          <Icon style={{ color, fontSize: 22 }} />
        </motion.div>
      </motion.div>
    </div>
  )
}

function HeroAvatar() {
  const [imgError, setImgError] = useState(false)
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className="relative flex flex-col items-center gap-12"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Ambient glow behind card */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(46,107,255,0.18) 0%, rgba(106,92,255,0.08) 50%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        aria-hidden="true"
      />

      {/* Orbit anchor — same dimensions as the card so percentage positions hit card edges */}
      <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] mx-auto">

        {/* Tech icon orbit */}
        {TECH_ICONS.map((icon) => (
          <TechIconOrb key={icon.label} {...icon} />
        ))}

        {/* Gradient border wrapper — inset-0 fills the anchor */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            padding: '2px',
            background:
              'linear-gradient(135deg, rgba(46,107,255,0.75) 0%, rgba(106,92,255,0.55) 50%, rgba(46,107,255,0.35) 100%)',
            boxShadow:
              '0 0 60px rgba(46,107,255,0.2), 0 0 120px rgba(106,92,255,0.08)',
          }}
        >
          <div className="w-full h-full rounded-3xl glass-heavy overflow-hidden relative">
            {/* Profile photo */}
            {!imgError && (
              <img
                src={profileImg}
                alt="Kaneeza Batool"
                className="w-full h-full object-cover object-top"
                onError={() => setImgError(true)}
              />
            )}

            {/* Fallback monogram when image fails */}
            {imgError && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, #081B3A 0%, #0F2854 60%, #102A59 100%)',
                }}
                aria-label="KB monogram"
              >
                <span className="text-display text-gradient font-heading font-extrabold">
                  KB
                </span>
              </div>
            )}

            {/* Bottom gradient vignette */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(5,14,32,0.5) 0%, transparent 100%)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* "Open to Opportunities" floating badge */}
        <motion.div
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
          initial={{ opacity: 0, y: 12, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.15, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
        >
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full shadow-md border border-white/10">
            <motion.span
              className="w-2 h-2 rounded-full bg-success shrink-0"
              animate={reduced ? {} : { opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <span className="text-xs font-body font-medium text-text-secondary">
              Open to Opportunities
            </span>
          </div>
        </motion.div>
      </div>

      {/* Status badges */}
      <motion.div
        className="flex flex-wrap gap-2.5 justify-center max-w-sm"
        variants={badgeContainer}
        initial="hidden"
        animate="visible"
      >
        {STATUS_BADGES.map((badge) => (
          <motion.div key={badge.label} variants={zoomIn}>
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default memo(HeroAvatar)
