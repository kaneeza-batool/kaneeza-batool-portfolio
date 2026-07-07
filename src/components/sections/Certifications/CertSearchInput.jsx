import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiX } from 'react-icons/fi'
import { fadeUp } from '@utils/motion'

function CertSearchInput({ value, onChange }) {
  const inputRef = useRef(null)

  return (
    <motion.div variants={fadeUp} className="relative w-full max-w-md">
      <div
        className="relative flex items-center rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: 'rgba(13, 31, 67, 0.75)',
          border: '1px solid rgba(255,255,255,0.10)',
          backdropFilter: 'blur(12px)',
          boxShadow: value
            ? '0 0 0 1px rgba(46,107,255,0.35), 0 4px 24px rgba(0,0,0,0.25)'
            : '0 2px 12px rgba(0,0,0,0.2)',
        }}
      >
        <FiSearch
          className="absolute left-4 w-4 h-4 pointer-events-none flex-shrink-0"
          style={{ color: value ? 'var(--color-accent-blue)' : 'var(--color-muted)' }}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title, issuer, or skill…"
          className="w-full bg-transparent py-3 pl-11 pr-10 text-sm font-body text-white outline-none"
          style={{ caretColor: 'var(--color-accent-blue)' }}
          aria-label="Search certifications by title, issuer, or skill"
        />
        {value && (
          <button
            onClick={() => {
              onChange('')
              inputRef.current?.focus()
            }}
            className="absolute right-3 p-1 rounded-lg transition-colors hover:bg-white/10"
            aria-label="Clear search"
          >
            <FiX
              className="w-3.5 h-3.5"
              style={{ color: 'var(--color-muted)' }}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default CertSearchInput
