import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@utils/helpers'
import { scrollTo } from '@utils/lenis'
import { useScrollSpy } from '@hooks/useScrollSpy'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import { NAV_LINKS, SECTION_IDS } from '@constants'
import { Button } from '@components/common'

// Stable module-level references — prevents useScrollSpy from re-subscribing on every render
const SECTION_IDS_LIST = Object.values(SECTION_IDS)
const SPY_OPTIONS = {}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KBLogo({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center focus-visible:outline-2 focus-visible:outline-[#2E6BFF] focus-visible:outline-offset-4 rounded-sm shrink-0"
      aria-label="Kaneeza Batool — scroll to top"
    >
      <div className="relative">
        <div className="flex items-end gap-[2px]">
          <span
            className="leading-none text-white transition-opacity duration-200 group-hover:opacity-80"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.625rem' }}
          >
            K
          </span>
          <span
            className="leading-none"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: '1.625rem',
              background: 'linear-gradient(135deg, #2E6BFF 0%, #6A5CFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            B
          </span>
        </div>
        {/* Animated underline on hover */}
        <span
          className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          style={{ background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)' }}
          aria-hidden="true"
        />
      </div>
    </button>
  )
}

function HamburgerIcon({ isOpen }) {
  return (
    <div className="flex flex-col justify-center items-center w-6 h-5 gap-[5px]" aria-hidden="true">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="block w-6 h-[1.5px] bg-white rounded-full origin-center"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block w-4 h-[1.5px] bg-white rounded-full self-end"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="block w-6 h-[1.5px] bg-white rounded-full origin-center"
      />
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false)
  const [navVisible, setNavVisible]   = useState(true)
  const [isOpen, setIsOpen]           = useState(false)
  const prevScrollY                    = useRef(0)
  const reducedMotion                  = usePrefersReducedMotion()
  const activeId                       = useScrollSpy(SECTION_IDS_LIST, SPY_OPTIONS)

  // ── Scroll behaviour ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const y    = window.scrollY
      const prev = prevScrollY.current

      setIsScrolled(y > 60)

      if (y < 10) {
        setNavVisible(true)
      } else if (y > prev + 4) {
        // Scrolling down — hide
        setNavVisible(false)
        setIsOpen(false)
      } else if (prev > y + 4) {
        // Scrolling up — show
        setNavVisible(true)
      }

      prevScrollY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Escape closes mobile menu ────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // ── Body scroll lock ─────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleNavClick = useCallback((href) => {
    setIsOpen(false)
    scrollTo(href, { offset: -72, duration: 1.2 })
  }, [])

  const handleLogoClick = useCallback(() => {
    setIsOpen(false)
    scrollTo(0, { duration: 1.5 })
  }, [])

  // ── Stagger variants for mobile menu items ────────────────────────────────────
  const menuItemVariants = useMemo(() => ({
    hidden:  (i) => ({ opacity: 0, x: -20, transition: { delay: (NAV_LINKS.length - 1 - i) * 0.025 } }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.045, duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  }), [])

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Fixed Header ──────────────────────────────────────────────────── */}
      <motion.header
        animate={{ y: navVisible ? 0 : '-100%' }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[300] h-[72px]',
          'transition-[background,border-color,box-shadow] duration-300',
          isScrolled && !isOpen
            ? 'glass border-b border-white/[0.06] shadow-lg shadow-black/20'
            : 'bg-transparent border-b border-transparent',
        )}
        role="banner"
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* Logo */}
          <KBLogo onClick={handleLogoClick} />

          {/* ── Desktop Nav ──────────────────────────────────────────────── */}
          <nav
            className="hidden xl:flex items-center gap-0.5 flex-1 justify-center"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeId === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                  className={cn(
                    'relative px-2.5 py-2 text-[13px] font-body font-medium rounded-lg group whitespace-nowrap',
                    'transition-colors duration-200',
                    'focus-visible:outline-2 focus-visible:outline-[#2E6BFF] focus-visible:outline-offset-2',
                    isActive
                      ? 'text-white'
                      : 'text-[#A8B2D1] hover:text-white',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}

                  {/* Hover underline — non-active items only */}
                  {!isActive && (
                    <span
                      className="absolute bottom-0.5 left-2.5 right-2.5 h-[1.5px] rounded-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      aria-hidden="true"
                    />
                  )}

                  {/* Active indicator — animated via layoutId */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute bottom-0.5 left-2.5 right-2.5 h-[1.5px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)' }}
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* ── Right Side ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Resume CTA — desktop */}
            <div className="hidden xl:block">
              <Button
                variant="outline"
                size="sm"
                as="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View resume (opens in new tab)"
              >
                Resume
              </Button>
            </div>

            {/* Hamburger — mobile & tablet */}
            <button
              className={cn(
                'xl:hidden p-2 rounded-lg',
                'text-white transition-colors duration-200 hover:bg-white/[0.06]',
                'focus-visible:outline-2 focus-visible:outline-[#2E6BFF] focus-visible:outline-offset-2',
              )}
              onClick={() => setIsOpen((o) => !o)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile / Tablet Fullscreen Menu ──────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[299] xl:hidden glass-heavy flex flex-col"
          >
            {/* Inner content — padded, scrollable nav list */}
            <div className="flex flex-col h-full pt-[88px] pb-10 px-6 overflow-y-auto">

              {/* Nav links */}
              <nav
                role="navigation"
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 flex-1"
              >
                {NAV_LINKS.map((item, i) => {
                  const isActive = activeId === item.id
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                      className={cn(
                        'flex items-center justify-between px-4 py-3.5 rounded-xl',
                        'text-base font-body font-medium',
                        'transition-colors duration-200',
                        'focus-visible:outline-2 focus-visible:outline-[#2E6BFF] focus-visible:outline-offset-2',
                        isActive
                          ? 'text-white bg-white/[0.06] border border-white/[0.08]'
                          : 'text-[#A8B2D1] hover:text-white hover:bg-white/[0.04]',
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: 'linear-gradient(135deg, #2E6BFF, #6A5CFF)' }}
                          aria-hidden="true"
                        />
                      )}
                    </motion.a>
                  )
                })}
              </nav>

              {/* Resume CTA */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="mt-8 pt-6 border-t border-white/[0.06]"
              >
                <Button
                  variant="primary"
                  size="lg"
                  as="a"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full justify-center"
                  aria-label="View resume (opens in new tab)"
                >
                  View Resume
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
