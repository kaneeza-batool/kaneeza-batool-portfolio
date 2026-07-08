import { SiGithub, SiLinkedin, SiLeetcode } from 'react-icons/si'
import { HiMail, HiDownload } from 'react-icons/hi'
import { SITE, SOCIAL, NAV_LINKS } from '@constants/index'

export const FOOTER_NAVIGATION = NAV_LINKS.map(({ label, href }) => ({ label, href }))

export const FOOTER_SOCIALS = [
  { label: 'GitHub',   href: SOCIAL.github,             icon: SiGithub   },
  { label: 'LinkedIn', href: SOCIAL.linkedin,           icon: SiLinkedin },
  { label: 'LeetCode', href: SOCIAL.leetcode,           icon: SiLeetcode },
  { label: 'Email',    href: `mailto:${SITE.email}`,   icon: HiMail     },
]

export const FOOTER_QUICK_LINKS = [
  { label: 'Download Resume', href: '/resume.pdf',      icon: HiDownload,  download: true, external: false },
  { label: 'GitHub',          href: SOCIAL.github,      icon: SiGithub,    download: false, external: true  },
  { label: 'LinkedIn',        href: SOCIAL.linkedin,    icon: SiLinkedin,  download: false, external: true  },
  { label: 'LeetCode',        href: SOCIAL.leetcode,    icon: SiLeetcode,  download: false, external: true  },
  { label: 'Email',           href: `mailto:${SITE.email}`, icon: HiMail, download: false, external: false },
]

export const TECH_STACK = [
  'React',
  'Vite',
  'Tailwind',
  'Framer Motion',
  'Node.js',
  'Express',
  'MongoDB',
  'Python',
  'Git',
  'GitHub',
]

export const AVAILABILITY = [
  'Remote Internship',
  'Frontend Projects',
  'Open Source',
  'Hackathons',
  'Collaborations',
]

export const COPYRIGHT = {
  year: 2026,
  name: 'Kaneeza Batool',
  built: 'Built with React + Tailwind CSS',
}

export const QUOTE = '"Learning by Building. Growing Every Day."'
