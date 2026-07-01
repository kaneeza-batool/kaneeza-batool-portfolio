import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader2 } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import emailjs from 'emailjs-com'

// SETUP: Replace these with your EmailJS credentials from emailjs.com
const EMAILJS_SERVICE_ID = ''
const EMAILJS_TEMPLATE_ID = ''
const EMAILJS_PUBLIC_KEY = ''

const CONTACT_ITEMS = [
  {
    icon: <Mail size={20} className="text-brand-violet" />,
    label: 'Email',
    display: 'kaneezabatoolmemon@gmail.com',
    href: 'mailto:kaneezabatoolmemon@gmail.com',
  },
  {
    icon: <FaLinkedin size={20} className="text-brand-violet" />,
    label: 'LinkedIn',
    display: 'linkedin.com/in/kaneeza-batool',
    href: 'https://linkedin.com/in/kaneeza-batool',
  },
  {
    icon: <FaGithub size={20} className="text-brand-violet" />,
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
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setFormState('loading')
    try {
      const hasCredentials =
        EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
      if (hasCredentials) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          EMAILJS_PUBLIC_KEY
        )
      } else {
        await new Promise(res => setTimeout(res, 1500))
      }
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  const inputClass =
    'bg-brand-secondary/50 border border-brand-violet/20 text-white placeholder:text-slate-500 ' +
    'focus:border-brand-violet focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] focus:outline-none ' +
    'rounded-xl px-4 py-3 font-body text-sm w-full transition-all'

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-brand-violet uppercase tracking-widest mb-3">
            07 / Contact
          </p>
          <h2 className="font-display font-bold text-4xl lg:text-5xl mb-4">
            Get <span className="gradient-text">In Touch</span>
          </h2>
          <p className="text-slate-400 font-body mb-12">
            Have a project in mind or just want to connect? My inbox is open.
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* LEFT — contact info */}
            <div>
              <span className="bg-green-900/30 border border-green-500/20 text-green-400 font-mono text-xs px-3 py-2 rounded-full inline-flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Remote Roles
              </span>

              <div>
                {CONTACT_ITEMS.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 mb-5 hover:-translate-y-0.5 transition-all group"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="font-mono text-xs text-brand-violet uppercase">{item.label}</p>
                      <p className="text-slate-300 group-hover:text-brand-violet-light text-sm transition-colors">
                        {item.display}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — contact form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4">
                {/* Name + Email row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      className={inputClass}
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={formState === 'loading' || formState === 'success'}
                    />
                    {errors.name && (
                      <p className="font-mono text-xs text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      className={inputClass}
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={formState === 'loading' || formState === 'success'}
                    />
                    {errors.email && (
                      <p className="font-mono text-xs text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <input
                    className={inputClass}
                    type="text"
                    name="subject"
                    placeholder="Subject (optional)"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={formState === 'loading' || formState === 'success'}
                  />
                  {errors.subject && (
                    <p className="font-mono text-xs text-red-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    className={inputClass}
                    name="message"
                    placeholder="Tell me about your project or just say hi..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={formState === 'loading' || formState === 'success'}
                  />
                  {errors.message && (
                    <p className="font-mono text-xs text-red-400 mt-1">{errors.message}</p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="mt-4">
                {formState === 'success' ? (
                  <button
                    type="button"
                    disabled
                    className="w-full bg-green-600 text-white font-bold px-6 py-3 rounded-full opacity-100 cursor-default"
                  >
                    Message Sent ✓
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full bg-brand-violet text-white font-bold px-6 py-3 rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none inline-flex items-center justify-center gap-2"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message →'
                    )}
                  </button>
                )}

                {formState === 'error' && (
                  <p className="font-mono text-xs text-red-400 mt-3 text-center">
                    Something went wrong — email me directly at{' '}
                    <a
                      href="mailto:kaneezabatoolmemon@gmail.com"
                      className="underline hover:text-red-300"
                    >
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
