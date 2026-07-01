import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Programs', href: '#programs' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl bg-[#0D0B2A]/80 border-b border-[#7C3AED]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display font-bold text-xl text-white">
            Kaneeza<span className="text-brand-violet">.</span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-slate-400 text-sm font-body tracking-wide hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hire Me button */}
          <a
            href="mailto:kaneezabatoolmemon@gmail.com"
            className="hidden md:inline-flex items-center bg-brand-violet text-white font-bold text-sm px-5 py-2 rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] hover:scale-[1.02]"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] bg-brand-bg flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-5 right-6 text-white"
            onClick={closeMobile}
            aria-label="Close navigation menu"
          >
            <X size={28} />
          </button>

          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMobile}
              className="text-white font-display font-bold text-2xl hover:text-brand-violet transition-colors"
            >
              {label}
            </a>
          ))}

          <a
            href="mailto:kaneezabatoolmemon@gmail.com"
            onClick={closeMobile}
            className="mt-4 bg-brand-violet text-white font-bold text-sm px-6 py-3 rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all duration-200"
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  );
}
