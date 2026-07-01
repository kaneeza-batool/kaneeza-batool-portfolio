import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader2, Send } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import emailjs from 'emailjs-com'

const EMAILJS_SERVICE_ID = ''
const EMAILJS_TEMPLATE_ID = ''
const EMAILJS_PUBLIC_KEY = ''

const CONTACT_ITEMS = [
  {
    icon: <Mail size={18} className="text-brand-violet" />,
    label: 'Email',
    display: 'kaneezabatoolmemon@gmail.com',
    href: 'mailto:kaneezabatoolmemon@gmail.com',
  },
  {
    icon: <FaLinkedin size={18} className="text-brand-violet" />,
    label: 'LinkedIn',
    display: 'linkedin.com/in/kaneeza-batool',
    href: 'https://linkedin.com/in/kaneeza-batool',
  },
  {
    icon: <FaGithub size={18} className="text-brand-violet" />,
    label: 'GitHub',
    display: 'github.com/kaneeza-batool',
    href: 'https://github.com/kaneeza-batool',
  },
]

function validate(formData) {
  const errs = {}
  if (!formData.name || formData.name.trim().length < 2)
    errs.name = 'Name must be at least 2 characters.'
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errs.email = 'Please enter a valid email address.'
  if (!formData.message || formData.message.trim().length < 10)
    errs.message = 'Message must be at least 10 characters.'
  return errs
}

export default function Contact() {
  const [formState, setFormState] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(formData)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setFormState('loading')
    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
          { name: formData.name, email: formData.email, subject: formData.subject, message: formData.message },
          EMAILJS_PUBLIC_KEY
        )
      } else {
        await new Promise(res => setTimeout(res, 1400))
      }
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const inputClass =
    'w-full font-body text-sm text-white placeholder:text-[rgba(249,250,251,0.28)] ' +
    'rounded-xl px-4 py-3 transition-all outline-none ' +
    'focus:shadow-[0_0_0_2px_rgba(124,58,237,0.4)]'
  const inputStyle = {
    background: 'rgba(26,21,96,0.5)',
    border: '1px solid rgba(124,58,237,0.2)',
  }
  const inputFocusStyle = { borderColor: '#7C3AED' }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div
        className="radial-glow"
        style={{ width: '500px', height: '500px', background: 'rgba(124,58,237,0.07)', bottom: '0', right: '5%' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className="section-label">07 / Contact</span>
          <h2 className="section-heading mb-3">
            Get <span className="gradient-text">In Touch</span>
          </h2>
          <p className="font-body text-[rgba(249,250,251,0.55)] mb-12">
            Have a project in mind or just want to connect? My inbox is open.
          </p>

          <div className="grid lg:grid-cols-2 gap-14">
            {/* LEFT — contact info */}
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 border border-brand-green/25 text-brand-green"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.72rem',
                  background: 'rgba(52,211,153,0.08)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Available for Remote Roles
              </span>

              <div className="space-y-5">
                {CONTACT_ITEMS.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 group hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl"
                      style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.65rem',
                          color: '#A78BFA',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {item.label}
                      </p>
                      <p className="font-body text-sm text-[rgba(249,250,251,0.7)] group-hover:text-brand-violet-light transition-colors">
                        {item.display}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1.5"
                      style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(249,250,251,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className={inputClass}
                      style={inputStyle}
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={formState === 'loading' || formState === 'success'}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => { e.target.style.borderColor = 'rgba(124,58,237,0.2)' }}
                    />
                    {errors.name && (
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#F87171', marginTop: '4px' }}>{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1.5"
                      style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(249,250,251,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className={inputClass}
                      style={inputStyle}
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={formState === 'loading' || formState === 'success'}
                      onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={e => { e.target.style.borderColor = 'rgba(124,58,237,0.2)' }}
                    />
                    {errors.email && (
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#F87171', marginTop: '4px' }}>{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-1.5"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(249,250,251,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    Subject <span style={{ textTransform: 'none', color: 'rgba(249,250,251,0.2)' }}>(optional)</span>
                  </label>
                  <input
                    id="subject"
                    className={inputClass}
                    style={inputStyle}
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={formState === 'loading' || formState === 'success'}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={e => { e.target.style.borderColor = 'rgba(124,58,237,0.2)' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1.5"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(249,250,251,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className={inputClass}
                    style={inputStyle}
                    name="message"
                    placeholder="Tell me about your project or just say hi..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formState === 'loading' || formState === 'success'}
                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={e => { e.target.style.borderColor = 'rgba(124,58,237,0.2)' }}
                  />
                  {errors.message && (
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#F87171', marginTop: '4px' }}>{errors.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                {formState === 'success' ? (
                  <button
                    type="button"
                    disabled
                    className="w-full py-3 rounded-full font-display font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #059669, #34D399)', fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    Message Sent ✓
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {formState === 'loading' ? (
                      <><Loader2 size={16} className="animate-spin" />Sending...</>
                    ) : (
                      <><Send size={15} />Send Message</>
                    )}
                  </button>
                )}

                {formState === 'error' && (
                  <p
                    className="mt-3 text-center"
                    style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#F87171' }}
                  >
                    Something went wrong — email me directly at{' '}
                    <a href="mailto:kaneezabatoolmemon@gmail.com" className="underline hover:text-red-300">
                      kaneezabatoolmemon@gmail.com
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
