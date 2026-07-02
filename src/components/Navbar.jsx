import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Programs', href: '#programs' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${
          isScrolled
            ? 'backdrop-blur-2xl bg-[#0D0B1F]/85 border-brand-violet/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent border-brand-violet/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-bold text-2xl text-white tracking-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Kaneeza
            <span
              className="text-brand-violet"
              style={{ textShadow: '0 0 12px rgba(124,58,237,0.9), 0 0 28px rgba(124,58,237,0.5)' }}
            >.</span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1)
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={`nav-link-hover relative px-3 py-2 text-sm font-body tracking-wide transition-colors rounded-lg ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-brand-violet"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href="mailto:kaneezabatoolmemon@gmail.com"
            className="hidden lg:inline-flex btn-primary text-sm"
          >
            Hire Me
          </a>

          <button
            className="lg:hidden text-white p-1"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-7"
          >
            <button
              className="absolute top-5 right-6 text-white"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={28} />
            </button>

            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={() => setIsMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="font-display font-bold text-2xl text-white hover:text-brand-violet-light transition-colors"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {label}
              </motion.a>
            ))}

            <a
              href="mailto:kaneezabatoolmemon@gmail.com"
              onClick={() => setIsMobileOpen(false)}
              className="mt-4 btn-primary"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
