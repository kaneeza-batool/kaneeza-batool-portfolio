import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-transparent to-brand-secondary/30">
      <div className="h-px bg-gradient-to-r from-transparent via-brand-violet/40 to-transparent border-0 mb-16" />

      <div className="flex flex-col items-center gap-5 py-16">
        <p
          className="font-display font-bold text-2xl text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Kaneeza<span className="text-brand-violet">.</span>
        </p>
        <p className="text-slate-400 text-sm font-body mt-2 mb-6">
          Frontend Developer based in Sukkur, Pakistan. Open to remote work.
        </p>

        <div className="glass rounded-full px-6 py-3 inline-flex gap-6">
          {[
            { href: 'https://github.com/kaneeza-batool', icon: <FaGithub />, label: 'GitHub' },
            { href: 'https://linkedin.com/in/kaneeza-batool', icon: <FaLinkedin />, label: 'LinkedIn' },
            { href: 'mailto:kaneezabatoolmemon@gmail.com', icon: <FaEnvelope />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="text-xl text-[rgba(249,250,251,0.3)] hover:text-brand-violet-light hover:scale-110 transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-slate-400">
          Built from Sukkur, Pakistan · 2026
        </p>

        <p className="font-mono text-xs text-slate-600">
          © 2026 Kaneeza Batool
        </p>
      </div>
    </footer>
  )
}
