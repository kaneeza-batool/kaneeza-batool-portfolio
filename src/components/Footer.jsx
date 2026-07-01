import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(167,139,250,0.3), rgba(124,58,237,0.5), transparent)' }}
      />

      <div className="flex flex-col items-center gap-5 py-12">
        <p
          className="font-display font-bold text-xl text-white"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Kaneeza<span className="text-brand-violet">.</span>
        </p>

        <div className="flex gap-5">
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
              className="text-lg text-[rgba(249,250,251,0.3)] hover:text-brand-violet-light hover:scale-110 transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </div>

        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.68rem',
            color: 'rgba(249,250,251,0.25)',
            letterSpacing: '0.05em',
          }}
        >
          © 2026 Kaneeza Batool · Built from Sukkur, Pakistan
        </p>
      </div>
    </footer>
  )
}
