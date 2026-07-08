const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const hasCredentials = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

if (!hasCredentials) {
  console.warn(
    '[Contact] EmailJS is not configured. ' +
    'Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY ' +
    'to your .env file. See .env.example for reference. ' +
    'Form will simulate success in development.'
  )
}

let _emailjs = null

async function loadEmailJS() {
  if (!_emailjs) {
    _emailjs = await import('@emailjs/browser')
  }
  return _emailjs
}

export async function sendEmail({ name, email, subject, message }) {
  if (!hasCredentials) {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return { success: true, simulated: true }
  }

  const emailjs = await loadEmailJS()

  const response = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name:  name,
      from_email: email,
      subject,
      message,
      reply_to:   email,
    },
    { publicKey: PUBLIC_KEY }
  )

  return { success: true, response }
}
