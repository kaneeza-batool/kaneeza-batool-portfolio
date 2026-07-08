import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HiArrowUp, HiExternalLink } from 'react-icons/hi'
import { SocialIcon, GradientBlob, Container } from '@components/common'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { scrollTo } from '@utils/lenis'
import { cn } from '@utils/helpers'
import { fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import {
  FOOTER_NAVIGATION,
  FOOTER_QUICK_LINKS,
  FOOTER_SOCIALS,
  TECH_STACK,
  AVAILABILITY,
  COPYRIGHT,
  QUOTE,
} from '@data/footer'

// ─── Sub-components ──────────────────────────────────────────────────────────

const KBMonogram = memo(function KBMonogram() {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: 'linear-gradient(135deg, #2E6BFF 0%, #6A5CFF 100%)' }}
      aria-hidden="true"
    >
      <span className="font-heading font-black text-white text-lg tracking-tight select-none">
        KB
      </span>
    </div>
  )
})

const FooterBranding = memo(function FooterBranding() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="flex flex-col items-center text-center gap-6 mb-20"
    >
      <div className="flex items-center gap-3">
        <KBMonogram />
        <div className="text-left">
          <h2 className="font-heading font-bold text-white text-xl leading-tight">
            Kaneeza Batool
          </h2>
          <p className="text-xs text-text-secondary font-body mt-0.5">
            Frontend Developer • MERN Stack Learner • AI Enthusiast
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {FOOTER_SOCIALS.map((s) => (
          <SocialIcon
            key={s.label}
            href={s.href}
            icon={s.icon}
            label={s.label}
            size="md"
          />
        ))}
      </div>
    </motion.div>
  )
})

const NavLink = memo(function NavLink({ href, label }) {
  const handleClick = useCallback(
    (e) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        scrollTo(href, { offset: -72 })
      }
    },
    [href]
  )

  return (
    <motion.li variants={fadeUp}>
      <a
        href={href}
        onClick={handleClick}
        className={cn(
          'group relative inline-flex items-center gap-1.5',
          'text-sm text-text-secondary font-body',
          'hover:text-white transition-colors duration-200',
          'focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2',
          'py-0.5'
        )}
      >
        {label}
        <span
          aria-hidden="true"
          className={cn(
            'absolute -bottom-px left-0 h-px w-0',
            'bg-gradient-to-r from-accent-blue to-accent-purple',
            'group-hover:w-full transition-all duration-300 ease-out'
          )}
        />
      </a>
    </motion.li>
  )
})

const FooterNav = memo(function FooterNav() {
  return (
    <motion.div
      variants={staggerContainer(0.05, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-5">
        Navigation
      </h3>
      <ul className="flex flex-col gap-2">
        {FOOTER_NAVIGATION.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
      </ul>
    </motion.div>
  )
})

const QuickLink = memo(function QuickLink({ href, label, icon: Icon, download, external }) {
  return (
    <motion.li variants={fadeUp}>
      <a
        href={href}
        download={download || undefined}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(
          'group inline-flex items-center gap-2',
          'text-sm text-text-secondary font-body',
          'hover:text-accent-blue transition-colors duration-200',
          'focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2',
          'py-0.5'
        )}
      >
        <Icon aria-hidden="true" className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
        <span className="relative">
          {label}
          <span
            aria-hidden="true"
            className={cn(
              'absolute -bottom-px left-0 h-px w-0',
              'bg-accent-blue',
              'group-hover:w-full transition-all duration-300 ease-out'
            )}
          />
        </span>
        {external && (
          <HiExternalLink aria-hidden="true" className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200 shrink-0" />
        )}
      </a>
    </motion.li>
  )
})

const FooterQuickLinks = memo(function FooterQuickLinks() {
  return (
    <motion.div
      variants={staggerContainer(0.05, 0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-5">
        Quick Links
      </h3>
      <ul className="flex flex-col gap-2">
        {FOOTER_QUICK_LINKS.map((link) => (
          <QuickLink key={link.label} {...link} />
        ))}
      </ul>
    </motion.div>
  )
})

const TechPill = memo(function TechPill({ label }) {
  return (
    <motion.span
      variants={fadeUp}
      whileHover={{ scale: 1.05, y: -1 }}
      transition={{ duration: 0.15, ease: [0.175, 0.885, 0.32, 1.275] }}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-medium',
        'glass-sm text-text-secondary',
        'hover:text-accent-blue hover:border-accent-blue/30 transition-colors duration-200',
        'cursor-default select-none'
      )}
    >
      {label}
    </motion.span>
  )
})

const FooterTechStack = memo(function FooterTechStack() {
  return (
    <motion.div
      variants={staggerContainer(0.04, 0.2)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-5">
        Tech Stack
      </h3>
      <div className="flex flex-wrap gap-2">
        {TECH_STACK.map((tech) => (
          <TechPill key={tech} label={tech} />
        ))}
      </div>
    </motion.div>
  )
})

const AvailabilityItem = memo(function AvailabilityItem({ label }) {
  return (
    <motion.li
      variants={fadeUp}
      className="flex items-center gap-2 text-sm text-text-secondary font-body"
    >
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0"
      />
      {label}
    </motion.li>
  )
})

const FooterAvailability = memo(function FooterAvailability({ reducedMotion }) {
  return (
    <motion.div
      variants={staggerContainer(0.05, 0.25)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-5">
        Availability
      </h3>

      {/* Status badge */}
      <motion.div
        variants={fadeUp}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-sm mb-5"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span
            className={cn(
              'absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75',
              !reducedMotion && 'animate-ping'
            )}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="text-xs font-body font-medium text-green-400">
          Open to Work
        </span>
      </motion.div>

      <ul className="flex flex-col gap-2.5">
        {AVAILABILITY.map((item) => (
          <AvailabilityItem key={item} label={item} />
        ))}
      </ul>
    </motion.div>
  )
})

const FooterColumns = memo(function FooterColumns({ reducedMotion }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-20">
      <FooterNav />
      <FooterQuickLinks />
      <FooterTechStack />
      <FooterAvailability reducedMotion={reducedMotion} />
    </div>
  )
})

const FooterBottomBar = memo(function FooterBottomBar({ reducedMotion, onScrollTop }) {
  return (
    <div>
      {/* Divider */}
      <div
        className="h-px mb-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(46,107,255,0.25), rgba(106,92,255,0.2), transparent)' }}
        aria-hidden="true"
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left: copyright */}
        <div className="order-3 md:order-1">
          <p className="text-xs text-muted font-body">
            © {COPYRIGHT.year} {COPYRIGHT.name}
          </p>
          <p className="text-xs text-muted/60 font-body mt-0.5">
            {COPYRIGHT.built}
          </p>
        </div>

        {/* Center: quote */}
        <p
          className={cn(
            'order-2 text-sm font-body italic',
            'bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue',
            'bg-clip-text text-transparent',
            'max-w-sm text-center tracking-wide'
          )}
        >
          {QUOTE}
        </p>

        {/* Right: back to top */}
        <div className="order-1 md:order-3">
          <motion.button
            onClick={onScrollTop}
            whileHover={reducedMotion ? {} : { y: -3 }}
            whileTap={reducedMotion ? {} : { scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
            className={cn(
              'group inline-flex items-center gap-2',
              'text-xs text-text-secondary font-body',
              'hover:text-white transition-colors duration-200',
              'focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2',
              'cursor-pointer'
            )}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <span
              aria-hidden="true"
              className={cn(
                'w-7 h-7 rounded-full glass flex items-center justify-center',
                'group-hover:border-accent-blue/30 transition-colors duration-200'
              )}
            >
              <HiArrowUp className="w-3.5 h-3.5 group-hover:text-accent-blue transition-colors duration-200" />
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  )
})

// ─── Main Footer ─────────────────────────────────────────────────────────────

function Footer() {
  const reducedMotion = usePrefersReducedMotion()

  const handleScrollTop = useCallback(() => {
    scrollTo(0, { duration: 1.8 })
  }, [])

  return (
    <footer
      className="relative overflow-hidden pt-28 pb-12"
      aria-label="Site footer"
      role="contentinfo"
    >
      {/* Background: dark gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #050E20 0%, #081B3A 50%, #050E20 100%)',
        }}
      />

      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow blobs */}
      <GradientBlob
        color="blue"
        size="lg"
        opacity={0.08}
        className="top-0 left-1/4 -translate-x-1/2"
        aria-hidden="true"
      />
      <GradientBlob
        color="purple"
        size="md"
        opacity={0.07}
        className="bottom-0 right-1/4"
        aria-hidden="true"
      />

      {/* Glass divider at top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(46,107,255,0.3), rgba(106,92,255,0.3), transparent)' }}
      />

      <Container size="lg">
        <FooterBranding />
        <FooterColumns reducedMotion={reducedMotion} />
        <FooterBottomBar reducedMotion={reducedMotion} onScrollTop={handleScrollTop} />
      </Container>
    </footer>
  )
}

export default Footer
