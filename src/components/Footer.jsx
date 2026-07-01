import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      <div className="bg-gradient-to-r from-transparent via-brand-violet/40 to-transparent h-px border-0 mb-12" />

      <div className="flex flex-col items-center gap-4 py-12">
        <p className="font-display font-bold text-xl text-white">
          Kaneeza<span className="text-brand-violet">.</span>
        </p>

        <p className="font-mono text-xs text-slate-500">
          Built from Sukkur, Pakistan · 2026
        </p>

        <div className="flex gap-5">
          <a
            href="https://github.com/kaneeza-batool"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-lg text-slate-500 hover:text-brand-violet-light hover:scale-110 transition-all"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/kaneeza-batool"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-lg text-slate-500 hover:text-brand-violet-light hover:scale-110 transition-all"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:kaneezabatoolmemon@gmail.com"
            aria-label="Email"
            className="text-lg text-slate-500 hover:text-brand-violet-light hover:scale-110 transition-all"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="font-mono text-xs text-slate-600">
          © 2026 Kaneeza Batool · All rights reserved
        </p>
      </div>
    </footer>
  )
}
