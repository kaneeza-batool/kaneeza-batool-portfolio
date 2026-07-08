import {
  FiBriefcase,
  FiGithub,
  FiCode,
  FiCloud,
  FiCpu,
  FiZap,
  FiBookOpen,
  FiFileText,
  FiMonitor,
} from 'react-icons/fi'

export const COLOR_KEYS = {
  blue:   {
    bg:     'rgba(46,107,255,0.07)',
    border: 'rgba(46,107,255,0.28)',
    accent: '#2E6BFF',
    bar:    'linear-gradient(90deg, #2E6BFF 0%, #6A5CFF 100%)',
  },
  purple: {
    bg:     'rgba(106,92,255,0.07)',
    border: 'rgba(106,92,255,0.28)',
    accent: '#6A5CFF',
    bar:    'linear-gradient(90deg, #6A5CFF 0%, #2E6BFF 100%)',
  },
  green:  {
    bg:     'rgba(34,197,94,0.07)',
    border: 'rgba(34,197,94,0.28)',
    accent: '#22C55E',
    bar:    'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)',
  },
  amber:  {
    bg:     'rgba(245,158,11,0.07)',
    border: 'rgba(245,158,11,0.28)',
    accent: '#F59E0B',
    bar:    'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
  },
  pink:   {
    bg:     'rgba(236,72,153,0.07)',
    border: 'rgba(236,72,153,0.28)',
    accent: '#EC4899',
    bar:    'linear-gradient(90deg, #EC4899 0%, #A855F7 100%)',
  },
}

export const PROJECT_STATUS = {
  active:   { label: 'Active',    badgeClass: 'bg-[rgba(46,107,255,0.12)] text-[#2E6BFF] border border-[rgba(46,107,255,0.3)]' },
  building: { label: 'Building',  badgeClass: 'bg-[rgba(106,92,255,0.12)] text-[#6A5CFF] border border-[rgba(106,92,255,0.3)]' },
  paused:   { label: 'Paused',    badgeClass: 'bg-[rgba(245,158,11,0.12)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]' },
  done:     { label: 'Done',      badgeClass: 'bg-[rgba(34,197,94,0.12)] text-[#22C55E] border border-[rgba(34,197,94,0.3)]' },
}

export const GOAL_PRIORITY = {
  high:   { label: 'High',   color: '#EF4444', badgeClass: 'bg-[rgba(239,68,68,0.12)] text-[#EF4444] border border-[rgba(239,68,68,0.3)]' },
  medium: { label: 'Medium', color: '#F59E0B', badgeClass: 'bg-[rgba(245,158,11,0.12)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]' },
  low:    { label: 'Low',    color: '#22C55E', badgeClass: 'bg-[rgba(34,197,94,0.12)] text-[#22C55E] border border-[rgba(34,197,94,0.3)]' },
}

export const READING_TYPE_CONFIG = {
  Book:          { color: '#2E6BFF', badgeClass: 'bg-[rgba(46,107,255,0.12)] text-[#2E6BFF] border border-[rgba(46,107,255,0.3)]' },
  Documentation: { color: '#22C55E', badgeClass: 'bg-[rgba(34,197,94,0.12)] text-[#22C55E] border border-[rgba(34,197,94,0.3)]' },
  Course:        { color: '#6A5CFF', badgeClass: 'bg-[rgba(106,92,255,0.12)] text-[#6A5CFF] border border-[rgba(106,92,255,0.3)]' },
  Article:       { color: '#F59E0B', badgeClass: 'bg-[rgba(245,158,11,0.12)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]' },
}

export const LEARNING_CATEGORY_CONFIG = {
  Backend:    { color: '#2E6BFF', badgeClass: 'bg-[rgba(46,107,255,0.12)] text-[#2E6BFF] border border-[rgba(46,107,255,0.3)]' },
  Database:   { color: '#6A5CFF', badgeClass: 'bg-[rgba(106,92,255,0.12)] text-[#6A5CFF] border border-[rgba(106,92,255,0.3)]' },
  DSA:        { color: '#22C55E', badgeClass: 'bg-[rgba(34,197,94,0.12)] text-[#22C55E] border border-[rgba(34,197,94,0.3)]' },
  Frontend:   { color: '#F59E0B', badgeClass: 'bg-[rgba(245,158,11,0.12)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]' },
  JavaScript: { color: '#EAB308', badgeClass: 'bg-[rgba(234,179,8,0.12)] text-[#EAB308] border border-[rgba(234,179,8,0.3)]' },
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const CURRENT_PROJECTS = [
  {
    id: 'portfolio-v2',
    title: 'Portfolio V2',
    description:
      'Building a premium developer portfolio with 12+ animated sections, a live GitHub dashboard, an EmailJS contact system, and a comprehensive design system — entirely in React, Tailwind CSS v4, and Framer Motion.',
    status: 'active',
    progress: 90,
    tech: ['React', 'Vite', 'Tailwind CSS v4', 'Framer Motion', 'EmailJS'],
    link: 'https://github.com/kaneeza-batool',
    colorKey: 'blue',
  },
  {
    id: 'fullstack-notes',
    title: 'Full Stack Notes App',
    description:
      'A MERN stack application with JWT authentication, a markdown editor, tag-based organization, and real-time updates — my first fully independent full-stack project end-to-end.',
    status: 'building',
    progress: 35,
    tech: ['Node.js', 'Express', 'MongoDB', 'React', 'JWT'],
    link: null,
    colorKey: 'purple',
  },
]

export const CURRENT_LEARNING = [
  {
    id: 'nodejs',
    title: 'Node.js & Express.js',
    progress: 65,
    category: 'Backend',
    estimatedCompletion: 'Aug 2026',
    resources: ['The Odin Project', 'Node.js Docs', 'Traversy Media'],
  },
  {
    id: 'mongodb',
    title: 'MongoDB & Mongoose',
    progress: 45,
    category: 'Database',
    estimatedCompletion: 'Sep 2026',
    resources: ['MongoDB University', 'Mongoose Docs'],
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    progress: 25,
    category: 'DSA',
    estimatedCompletion: 'Ongoing',
    resources: ['LeetCode', 'NeetCode.io', 'Striver Sheet'],
  },
  {
    id: 'rest-api',
    title: 'REST API Design',
    progress: 55,
    category: 'Backend',
    estimatedCompletion: 'Jul 2026',
    resources: ['RESTful API Guide', 'Postman Docs'],
  },
]

export const CURRENT_GOALS = [
  {
    id: 'remote-internship',
    title: 'Remote Internship',
    description: 'Land a remote software engineering internship for real-world experience and mentorship.',
    priority: 'high',
    progress: 40,
    deadline: 'Q4 2026',
    icon: FiBriefcase,
  },
  {
    id: 'open-source',
    title: 'Open Source Contributions',
    description: 'Make meaningful contributions to open-source projects and build a public track record.',
    priority: 'medium',
    progress: 10,
    deadline: 'Ongoing',
    icon: FiGithub,
  },
  {
    id: 'leetcode',
    title: 'LeetCode Consistency',
    description: 'Solve 150+ problems with daily practice to sharpen algorithmic thinking.',
    priority: 'high',
    progress: 22,
    deadline: 'Dec 2026',
    icon: FiCode,
  },
  {
    id: 'google-arcade',
    title: 'Google Arcade',
    description: 'Complete the Google Cloud Arcade program and earn cloud badges and certifications.',
    priority: 'medium',
    progress: 60,
    deadline: 'Aug 2026',
    icon: FiCloud,
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineering',
    description: 'Learn the fundamentals of building AI-powered applications and integrating LLM APIs.',
    priority: 'medium',
    progress: 15,
    deadline: '2027',
    icon: FiCpu,
  },
  {
    id: 'hackathons',
    title: 'Hackathons',
    description: 'Participate in at least 3 hackathons to build fast under real constraints.',
    priority: 'low',
    progress: 33,
    deadline: 'Ongoing',
    icon: FiZap,
  },
]

export const RECENT_COMPLETIONS = [
  {
    id: 'github-dashboard',
    date: 'Dec 2025',
    title: 'GitHub Dashboard',
    description:
      'Built a live GitHub dashboard with API integration, in-memory caching, language analytics, and developer activity tracking.',
  },
  {
    id: 'learning-roadmap',
    date: 'Dec 2025',
    title: 'Interactive Learning Roadmap',
    description:
      'Designed an expandable career roadmap with skill dependency chains, stage progression, and animated reveals.',
  },
  {
    id: 'project-modal',
    date: 'Nov 2025',
    title: 'Interactive Project Modal',
    description:
      'Shipped a full-screen animated project showcase modal with tech chips, live links, and scroll-driven reveal animations.',
  },
  {
    id: 'hec-genai',
    date: 'Oct 2025',
    title: 'HEC GenAI Certification',
    description:
      'Completed the Higher Education Commission GenerativeAI program and earned a certification in applied AI concepts.',
  },
  {
    id: 'emailjs-contact',
    date: 'Oct 2025',
    title: 'Premium Contact System',
    description:
      'Implemented a production-ready contact form with EmailJS, real-time validation, and an availability status dashboard.',
  },
]

export const READING_NOW = [
  {
    id: 'clean-code',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    type: 'Book',
    category: 'Engineering',
    progress: 55,
    icon: FiBookOpen,
  },
  {
    id: 'node-docs',
    title: 'Node.js Official Documentation',
    author: null,
    type: 'Documentation',
    category: 'Backend',
    progress: 40,
    icon: FiFileText,
  },
  {
    id: 'eloquent-js',
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    type: 'Book',
    category: 'JavaScript',
    progress: 70,
    icon: FiBookOpen,
  },
  {
    id: 'odin-node',
    title: 'The Odin Project — Node Path',
    author: null,
    type: 'Course',
    category: 'Backend',
    progress: 60,
    icon: FiMonitor,
  },
]

export const WEEKLY_PROGRESS = [
  { id: 'projects',     label: 'Projects',     value: 70, color: '#2E6BFF' },
  { id: 'learning',     label: 'Learning',      value: 60, color: '#6A5CFF' },
  { id: 'dsa',          label: 'DSA',           value: 30, color: '#22C55E' },
  { id: 'open-source',  label: 'Open Source',   value: 10, color: '#F59E0B' },
  { id: 'portfolio',    label: 'Portfolio',      value: 90, color: '#EC4899' },
]
