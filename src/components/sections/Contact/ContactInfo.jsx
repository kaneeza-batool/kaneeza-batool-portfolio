import { motion } from 'framer-motion'
import { HiArrowNarrowRight, HiClock, HiDocumentText } from 'react-icons/hi'
import { cn } from '@utils/helpers'
import { fadeLeft, fadeUp, staggerContainer, viewportConfig } from '@utils/motion'
import GlassCard from '@components/common/GlassCard'
import Button from '@components/common/Button'
import { CONTACT_ITEMS, AVAILABILITY, QUICK_FACTS, SOCIAL_LINKS, RESUME_URL } from '@data/contact'

function ContactItem({ item }) {
  const Icon = item.icon

  const inner = (
    <div
      className={cn(
        'flex items-center gap-4 p-3.5 rounded-xl glass-sm',
        'border border-transparent hover:border-accent-blue/20',
        'hover:bg-surface/70 transition-all duration-200 group'
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
          'bg-accent-blue/10 border border-accent-blue/20',
          'group-hover:bg-accent-blue/20 transition-colors duration-200'
        )}
      >
        <Icon className="w-5 h-5 text-accent-blue" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-0.5">
          {item.label}
        </p>
        <p className="text-sm text-white truncate font-body">{item.value}</p>
      </div>

      {item.href && (
        <HiArrowNarrowRight
          className="w-4 h-4 text-muted group-hover:text-accent-blue group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
          aria-hidden="true"
        />
      )}
    </div>
  )

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith('mailto') ? '_self' : '_blank'}
        rel="noopener noreferrer"
        aria-label={`${item.label}: ${item.value}`}
        className="block"
      >
        {inner}
      </a>
    )
  }

  return inner
}

function AvailabilityCard() {
  return (
    <GlassCard
      hover={false}
      padding="md"
      className="border border-success/20 bg-success/5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex h-3 w-3 flex-shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
        </div>
        <span className="font-heading font-semibold text-white text-sm">
          {AVAILABILITY.statusLabel}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {AVAILABILITY.types.map((type) => (
          <span
            key={type}
            className="text-xs px-2.5 py-1 rounded-pill bg-success/10 border border-success/20 text-success font-body"
          >
            {type}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 pt-3 border-t border-white/8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-body">
          <HiClock className="w-3.5 h-3.5 text-muted flex-shrink-0" aria-hidden="true" />
          <span>{AVAILABILITY.responseTime}</span>
        </div>
        <p className="text-xs text-muted font-mono pl-5">
          Timezone: {AVAILABILITY.timezone}
        </p>
      </div>
    </GlassCard>
  )
}

function QuickFacts() {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_FACTS.map((fact) => (
        <div
          key={fact.label}
          className={cn(
            'flex items-center gap-2 px-3 py-2 glass-sm rounded-xl',
            'border border-white/8 hover:border-accent-blue/20',
            'transition-all duration-200 hover:scale-[1.03]'
          )}
        >
          <span className="text-base leading-none" aria-hidden="true">
            {fact.emoji}
          </span>
          <span className="text-xs text-text-secondary font-body">{fact.label}</span>
        </div>
      ))}
    </div>
  )
}

function SocialLinks() {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {SOCIAL_LINKS.map((link) => {
        const Icon = link.icon
        return (
          <div key={link.platform} className="relative group/social">
            <motion.a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.tooltip}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={cn(
                'w-11 h-11 rounded-xl glass flex items-center justify-center',
                'text-text-secondary hover:text-white',
                'border border-white/10 hover:border-white/25',
                'transition-colors duration-200',
                link.glowClass
              )}
            >
              <Icon size={20} aria-hidden="true" />
            </motion.a>

            <div
              role="tooltip"
              className={cn(
                'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
                'px-2.5 py-1.5 text-xs font-mono whitespace-nowrap',
                'glass-heavy rounded-lg border border-white/10',
                'opacity-0 pointer-events-none group-hover/social:opacity-100',
                'transition-opacity duration-200 z-tooltip'
              )}
            >
              {link.tooltip}
            </div>
          </div>
        )
      })}

      <a href={RESUME_URL} download aria-label="Download Resume">
        <Button
          variant="outline"
          size="sm"
          icon={<HiDocumentText size={16} aria-hidden="true" />}
        >
          Resume
        </Button>
      </a>
    </div>
  )
}

function ContactInfo() {
  return (
    <motion.div
      variants={staggerContainer(0.12, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="flex flex-col gap-6"
    >
      <motion.div variants={fadeLeft} className="flex flex-col gap-2">
        {CONTACT_ITEMS.map((item) => (
          <ContactItem key={item.key} item={item} />
        ))}
      </motion.div>

      <motion.div variants={fadeLeft}>
        <AvailabilityCard />
      </motion.div>

      <motion.div variants={fadeUp}>
        <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">
          Quick Facts
        </p>
        <QuickFacts />
      </motion.div>

      <motion.div variants={fadeUp}>
        <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3">
          Find me on
        </p>
        <SocialLinks />
      </motion.div>
    </motion.div>
  )
}

export default ContactInfo
