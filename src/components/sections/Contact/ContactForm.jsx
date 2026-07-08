import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiRefresh,
} from 'react-icons/hi'
import { TbSend } from 'react-icons/tb'
import { cn } from '@utils/helpers'
import { fadeRight, fadeUp, staggerContainer, zoomIn, viewportConfig } from '@utils/motion'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'
import GlassCard from '@components/common/GlassCard'
import Button from '@components/common/Button'
import { sendEmail } from '@services/emailjs'
import { FORM_SUBJECTS } from '@data/contact'

/* ─── Floating Input ─── */
function FloatingInput({ id, label, type = 'text', name, value, onChange, onBlur, onFocus, error, required, maxLength }) {
  const [focused, setFocused] = useState(false)
  const isFloated = focused || value.length > 0

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => { setFocused(true); onFocus?.() }}
        onBlur={(e) => { setFocused(false); onBlur?.(e) }}
        required={required}
        maxLength={maxLength}
        autoComplete={type === 'email' ? 'email' : name === 'name' ? 'name' : 'off'}
        aria-required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
        placeholder=""
        className={cn(
          'w-full rounded-xl px-4 pt-6 pb-2.5 text-sm font-body text-white',
          'bg-surface/40 border transition-all duration-200 outline-none',
          'placeholder:text-transparent',
          focused
            ? 'border-accent-blue/60 bg-surface/70 shadow-[0_0_0_3px_rgba(46,107,255,0.12)]'
            : error
            ? 'border-error/50 hover:border-error/70'
            : 'border-white/10 hover:border-white/20'
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute left-4 pointer-events-none font-body transition-all duration-200 select-none',
          isFloated
            ? 'top-2 text-[10px] font-medium tracking-wide text-accent-blue'
            : 'top-1/2 -translate-y-1/2 text-sm text-muted'
        )}
      >
        {label}
        {required && <span className="text-accent-blue ml-0.5" aria-hidden="true">*</span>}
      </label>

      {maxLength && value.length > 0 && (
        <span className="absolute right-4 bottom-2.5 text-[10px] text-muted font-mono pointer-events-none">
          {value.length}/{maxLength}
        </span>
      )}

      <FieldError id={id} error={error} />
    </div>
  )
}

/* ─── Floating Select ─── */
function FloatingSelect({ id, label, name, value, onChange, onBlur, onFocus, error, required }) {
  const [focused, setFocused] = useState(false)
  const isFloated = focused || value !== ''

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => { setFocused(true); onFocus?.() }}
        onBlur={(e) => { setFocused(false); onBlur?.(e) }}
        required={required}
        aria-required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(
          'w-full rounded-xl px-4 pt-6 pb-2.5 pr-10 text-sm font-body',
          'bg-surface/40 border transition-all duration-200 outline-none appearance-none cursor-pointer',
          value ? 'text-white' : 'text-transparent',
          focused
            ? 'border-accent-blue/60 bg-surface/70 shadow-[0_0_0_3px_rgba(46,107,255,0.12)]'
            : error
            ? 'border-error/50 hover:border-error/70'
            : 'border-white/10 hover:border-white/20'
        )}
      >
        <option value="" aria-hidden="true" />
        {FORM_SUBJECTS.map((s) => (
          <option key={s} value={s} className="bg-card text-white">
            {s}
          </option>
        ))}
      </select>

      <label
        htmlFor={id}
        className={cn(
          'absolute left-4 pointer-events-none font-body transition-all duration-200 select-none',
          isFloated
            ? 'top-2 text-[10px] font-medium tracking-wide text-accent-blue'
            : 'top-1/2 -translate-y-1/2 text-sm text-muted'
        )}
      >
        {label}
        {required && <span className="text-accent-blue ml-0.5" aria-hidden="true">*</span>}
      </label>

      <svg
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>

      <FieldError id={id} error={error} />
    </div>
  )
}

/* ─── Floating Textarea ─── */
function FloatingTextarea({ id, label, name, value, onChange, onBlur, onFocus, error, required, maxLength, rows = 5 }) {
  const [focused, setFocused] = useState(false)
  const isFloated = focused || value.length > 0
  const nearLimit = maxLength && value.length > maxLength * 0.85

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => { setFocused(true); onFocus?.() }}
        onBlur={(e) => { setFocused(false); onBlur?.(e) }}
        rows={rows}
        required={required}
        maxLength={maxLength}
        aria-required={required}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? 'true' : 'false'}
        placeholder=""
        className={cn(
          'w-full rounded-xl px-4 pt-7 pb-3 text-sm font-body text-white resize-none',
          'bg-surface/40 border transition-all duration-200 outline-none',
          'placeholder:text-transparent',
          focused
            ? 'border-accent-blue/60 bg-surface/70 shadow-[0_0_0_3px_rgba(46,107,255,0.12)]'
            : error
            ? 'border-error/50 hover:border-error/70'
            : 'border-white/10 hover:border-white/20'
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute left-4 pointer-events-none font-body transition-all duration-200 select-none',
          isFloated
            ? 'top-2 text-[10px] font-medium tracking-wide text-accent-blue'
            : 'top-4 text-sm text-muted'
        )}
      >
        {label}
        {required && <span className="text-accent-blue ml-0.5" aria-hidden="true">*</span>}
      </label>

      {maxLength && (
        <span
          className={cn(
            'absolute right-4 bottom-3 text-[10px] font-mono pointer-events-none transition-colors duration-200',
            nearLimit ? 'text-warning' : 'text-muted'
          )}
        >
          {value.length}/{maxLength}
        </span>
      )}

      <FieldError id={id} error={error} />
    </div>
  )
}

/* ─── Field Error ─── */
function FieldError({ id, error }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          id={`${id}-error`}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-1.5 mt-1.5 text-xs text-error font-body"
        >
          <HiExclamationCircle size={13} aria-hidden="true" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

/* ─── Success Card ─── */
function SuccessState({ onReset, reducedMotion }) {
  return (
    <motion.div
      key="success"
      initial={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center py-14 gap-6"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-success/10 border border-success/25 flex items-center justify-center"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              stroke="#22C55E"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            />
            <motion.path
              d="M11.5 20 L17.5 26 L28.5 14"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.55 }}
            />
          </svg>
        </motion.div>

        {!reducedMotion && (
          <span
            className="absolute inset-0 rounded-full bg-success/10 animate-ping"
            aria-hidden="true"
          />
        )}
      </div>

      <motion.div
        initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-heading font-bold text-xl text-white mb-2">
          Message Sent!
        </h3>
        <p className="text-text-secondary text-sm max-w-xs font-body leading-relaxed">
          Thank you for reaching out. I'll get back to you within{' '}
          <span className="text-white">24–48 hours</span>.
        </p>
      </motion.div>

      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
      >
        <button
          onClick={onReset}
          className="text-sm text-muted hover:text-accent-blue transition-colors duration-200 font-body underline underline-offset-4"
        >
          Send another message
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ─── Validation ─── */
function validateField(name, value) {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required'
      if (value.trim().length < 2) return 'Must be at least 2 characters'
      return null
    case 'email':
      if (!value.trim()) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
      return null
    case 'subject':
      if (!value) return 'Please select a subject'
      return null
    case 'message':
      if (!value.trim()) return 'Message is required'
      if (value.trim().length < 10) return 'Must be at least 10 characters'
      return null
    default:
      return null
  }
}

/* ─── ContactForm ─── */
function ContactForm() {
  const reducedMotion = usePrefersReducedMotion()
  const formRef = useRef(null)

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors]     = useState({})
  const [touched, setTouched]   = useState({})
  const [status, setStatus]     = useState('idle')
  const [errMsg, setErrMsg]     = useState('')

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }, [touched])

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const allTouched = { name: true, email: true, subject: true, message: true }
    setTouched(allTouched)

    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key])
      if (err) newErrors[key] = err
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      const firstKey = Object.keys(newErrors)[0]
      formRef.current?.querySelector(`#${firstKey}`)?.focus()
      return
    }

    setStatus('submitting')
    setErrMsg('')

    try {
      await sendEmail(formData)
      setStatus('success')
    } catch (err) {
      console.error('[Contact] Email failed:', err)
      setStatus('error')
      setErrMsg('Something went wrong. Please try again or email me directly.')
    }
  }, [formData])

  const handleReset = useCallback(() => {
    setFormData({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setTouched({})
    setStatus('idle')
    setErrMsg('')
  }, [])

  const isSubmitting = status === 'submitting'

  return (
    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <GlassCard hover={false} padding="lg" className="border border-white/8">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <SuccessState
              key="success"
              onReset={handleReset}
              reducedMotion={reducedMotion}
            />
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              initial={reducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <FloatingInput
                  id="name"
                  name="name"
                  label="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  required
                  maxLength={60}
                />
                <FloatingInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  required
                />
              </div>

              <FloatingSelect
                id="subject"
                name="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.subject}
                required
              />

              <FloatingTextarea
                id="message"
                name="message"
                label="Your Message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.message}
                required
                rows={5}
                maxLength={1000}
              />

              {/* Error banner */}
              <AnimatePresence>
                {status === 'error' && errMsg && (
                  <motion.div
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-error/8 border border-error/25"
                  >
                    <HiExclamationCircle
                      className="w-5 h-5 text-error flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-error font-body">{errMsg}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors duration-200 font-body flex-shrink-0"
                    >
                      <HiRefresh size={14} aria-hidden="true" />
                      Retry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between gap-4 pt-1">
                <p className="text-xs text-muted font-body">
                  <span className="text-accent-blue">*</span> Required fields
                </p>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  icon={<TbSend size={16} aria-hidden="true" />}
                  iconPosition="right"
                >
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  )
}

export default ContactForm
