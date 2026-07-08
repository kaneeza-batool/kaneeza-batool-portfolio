import { HiMail, HiLocationMarker } from 'react-icons/hi'
import { SiGithub, SiLinkedin, SiLeetcode } from 'react-icons/si'

export const CONTACT_ITEMS = [
  {
    key: 'email',
    icon: HiMail,
    label: 'Email',
    value: 'kaneezabatoolmemon@gmail.com',
    href: 'mailto:kaneezabatoolmemon@gmail.com',
  },
  {
    key: 'github',
    icon: SiGithub,
    label: 'GitHub',
    value: 'kaneeza-batool',
    href: 'https://github.com/kaneeza-batool',
  },
  {
    key: 'linkedin',
    icon: SiLinkedin,
    label: 'LinkedIn',
    value: 'kaneeza-batool',
    href: 'https://linkedin.com/in/kaneeza-batool',
  },
  {
    key: 'leetcode',
    icon: SiLeetcode,
    label: 'LeetCode',
    value: 'kaneeza-batool',
    href: 'https://leetcode.com/u/kaneeza-batool',
  },
  {
    key: 'location',
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Pakistan',
    href: null,
  },
]

export const AVAILABILITY = {
  status: 'open',
  statusLabel: 'Open to Opportunities',
  types: ['Internships', 'Hackathons', 'Open Source', 'Collaborations', 'Freelance'],
  responseTime: 'Usually within 24–48 hours',
  timezone: 'PKT (UTC+5)',
}

export const QUICK_FACTS = [
  { label: 'Based in Pakistan',         emoji: '🇵🇰' },
  { label: 'Frontend Developer',         emoji: '⚡' },
  { label: 'MERN Stack Learner',         emoji: '🌱' },
  { label: 'AI Enthusiast',              emoji: '🤖' },
  { label: 'Actively Building Projects', emoji: '🏗️' },
]

export const SOCIAL_LINKS = [
  {
    platform: 'GitHub',
    icon: SiGithub,
    href: 'https://github.com/kaneeza-batool',
    tooltip: 'View my GitHub',
    glowClass: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]',
  },
  {
    platform: 'LinkedIn',
    icon: SiLinkedin,
    href: 'https://linkedin.com/in/kaneeza-batool',
    tooltip: 'Connect on LinkedIn',
    glowClass: 'hover:shadow-[0_0_20px_rgba(10,102,194,0.4)]',
  },
  {
    platform: 'LeetCode',
    icon: SiLeetcode,
    href: 'https://leetcode.com/u/kaneeza-batool',
    tooltip: 'See my LeetCode',
    glowClass: 'hover:shadow-[0_0_20px_rgba(255,161,22,0.35)]',
  },
  {
    platform: 'Email',
    icon: HiMail,
    href: 'mailto:kaneezabatoolmemon@gmail.com',
    tooltip: 'Send an email',
    glowClass: 'hover:shadow-glow-blue',
  },
]

export const RESUME_URL = '/resume.pdf'

export const FORM_SUBJECTS = [
  'Internship Opportunity',
  'Freelance Project',
  'Open Source Collaboration',
  'Hackathon Invitation',
  'General Networking',
  'Other',
]

export const ACCEPTING = [
  { label: 'Internship Opportunities',    color: '#2E6BFF' },
  { label: 'Hackathons',                  color: '#6A5CFF' },
  { label: 'Open Source Collaboration',   color: '#22C55E' },
  { label: 'AI Projects',                 color: '#F59E0B' },
]

