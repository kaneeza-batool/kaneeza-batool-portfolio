export const ACHIEVEMENT_FILTERS = [
  { id: 'all',           label: 'All'            },
  { id: 'award',         label: 'Awards'         },
  { id: 'program',       label: 'Programs'       },
  { id: 'hackathon',     label: 'Hackathons'     },
  { id: 'certification', label: 'Certifications' },
  { id: 'community',     label: 'Communities'    },
  { id: 'participation', label: 'Participation'  },
]

export const CATEGORY_COLORS = {
  award:         { hex: '#F59E0B', rgb: '245,158,11',  label: 'Award'          },
  program:       { hex: '#2E6BFF', rgb: '46,107,255',  label: 'Program'        },
  hackathon:     { hex: '#6A5CFF', rgb: '106,92,255',  label: 'Hackathon'      },
  certification: { hex: '#22C55E', rgb: '34,197,94',   label: 'Certification'  },
  community:     { hex: '#14B8A6', rgb: '20,184,166',  label: 'Community'      },
  participation: { hex: '#F97316', rgb: '249,115,22',  label: 'Participation'  },
}

export const STATUS_META = {
  awarded:      { label: 'Awarded',      dot: '#F59E0B', bg: 'rgba(245,158,11,0.14)',  border: 'rgba(245,158,11,0.28)'  },
  completed:    { label: 'Completed',    dot: '#22C55E', bg: 'rgba(34,197,94,0.14)',   border: 'rgba(34,197,94,0.28)'   },
  active:       { label: 'Active',       dot: '#2E6BFF', bg: 'rgba(46,107,255,0.14)',  border: 'rgba(46,107,255,0.28)'  },
  participated: { label: 'Participated', dot: '#6A5CFF', bg: 'rgba(106,92,255,0.14)', border: 'rgba(106,92,255,0.28)'  },
}

export const ACHIEVEMENTS = [
  {
    id: 'hec-genai-top-performer',
    title: 'Top Performer',
    issuer: 'HEC Generative AI Training Program',
    year: '2026',
    category: 'award',
    description:
      'Recognized as a top performer in the Higher Education Commission Generative AI Training Program — a nationally run initiative advancing AI literacy among Pakistani university students. This recognition reflects strong engagement, consistent effort, and applied learning throughout the program.',
    status: 'awarded',
    highlight: 'Top Performer Recognition',
    icon: 'trophy',
    credentialUrl: null,
    featured: true,
  },
  {
    id: 'stanford-code-in-place',
    title: 'Code in Place Participant',
    issuer: 'Stanford University',
    year: '2025',
    category: 'program',
    description:
      "Selected as a participant in Stanford's Code in Place — a globally selective, free online Python programming course taught by Stanford instructors and section leaders. Focused on foundational programming with an emphasis on problem-solving.",
    status: 'completed',
    highlight: 'Globally Selective Program',
    icon: 'academic',
    credentialUrl: null,
    featured: false,
  },
  {
    id: 'saylani-mass-it',
    title: 'Web Development Trainee',
    issuer: 'Saylani Mass IT Training Program',
    year: '2025',
    category: 'program',
    description:
      "Completed structured web development training through Saylani Welfare — one of Pakistan's largest tech education initiatives empowering thousands of learners with practical programming skills.",
    status: 'completed',
    highlight: 'National Tech Initiative',
    icon: 'code',
    credentialUrl: null,
    featured: false,
  },
  {
    id: 'dev-weekends-mentee',
    title: 'Dev Weekends Mentee',
    issuer: 'Dev Weekends',
    year: '2025',
    category: 'community',
    description:
      'Selected as a mentee in Dev Weekends — a community-driven initiative pairing emerging developers with experienced mentors for hands-on, project-based guidance and peer learning.',
    status: 'completed',
    highlight: 'Mentorship Program',
    icon: 'users',
    credentialUrl: null,
    featured: false,
  },
  {
    id: 'google-cloud-genai-badges',
    title: 'Generative AI Skill Badges',
    issuer: 'Google Cloud',
    year: '2025',
    category: 'certification',
    description:
      'Earned Google Cloud skill badges by completing the Generative AI learning path — covering prompt engineering, responsible AI, transformer models, and core ML concepts via Google Cloud Skills Boost.',
    status: 'awarded',
    highlight: 'Google Cloud Verified',
    icon: 'cloud',
    credentialUrl: null,
    featured: false,
  },
  {
    id: 'github-student-pack',
    title: 'GitHub Student Developer Pack',
    issuer: 'GitHub Education',
    year: '2025',
    category: 'certification',
    description:
      "Verified as a student developer by GitHub Education, gaining access to the GitHub Student Developer Pack — a curated suite of professional tools, cloud credits, and learning resources for active learners.",
    status: 'active',
    highlight: 'GitHub Verified Student',
    icon: 'github',
    credentialUrl: null,
    featured: false,
  },
  {
    id: 'kaggle-ai-vibe-coding',
    title: 'AI Vibe Coding Capstone',
    issuer: 'Kaggle',
    year: '2025',
    category: 'participation',
    description:
      'Submitted a capstone project in the Kaggle AI Vibe Coding challenge — applying AI, Python, and creative problem-solving in a public competition environment. Reflects confidence in building and sharing work.',
    status: 'participated',
    highlight: 'Kaggle Public Submission',
    icon: 'zap',
    credentialUrl: null,
    featured: false,
  },
  {
    id: 'ai-builders-challenge',
    title: 'AI Builders Challenge',
    issuer: 'AI Builders Community',
    year: '2026',
    category: 'hackathon',
    description:
      'Participated in the AI Builders Challenge — a hackathon-style initiative for developers prototyping real-world AI solutions. Gained hands-on experience in rapid AI application development and technical presentation.',
    status: 'participated',
    highlight: 'AI Hackathon Entry',
    icon: 'target',
    credentialUrl: null,
    featured: false,
  },
]

export const ACHIEVEMENT_COUNTERS = [
  { label: 'Milestones',     value: 8, suffix: '+' },
  { label: 'Programs',       value: 3, suffix: ''  },
  { label: 'Certifications', value: 2, suffix: '+' },
  { label: 'Hackathons',     value: 2, suffix: ''  },
]

export const ACHIEVEMENT_MILESTONES = [
  { year: '2025',  label: 'Started Web Dev',        sub: 'Saylani Mass IT Training'    },
  { year: '2025',  label: 'Stanford Program',        sub: 'Code in Place'               },
  { year: '2025',  label: 'Google Cloud Badges',     sub: 'Generative AI Verified'      },
  { year: '2025',  label: 'Dev Weekends Mentee',     sub: 'Community Mentorship'        },
  { year: '2026',  label: 'HEC Top Performer',       sub: 'Generative AI Award'         },
  { year: '2026',  label: 'AI Hackathons',           sub: 'AI Builders & Kaggle'        },
  { year: '2026+', label: 'AI Engineering Journey',  sub: 'Ongoing Growth'              },
]

export const ACHIEVEMENT_THEMES = [
  {
    id: 'consistency',
    title: 'Consistency',
    icon: 'refresh',
    description:
      'Showing up repeatedly across multiple programs and challenges demonstrates sustained commitment to learning — not a burst of effort, but a continuous habit.',
  },
  {
    id: 'curiosity',
    title: 'Curiosity',
    icon: 'search',
    description:
      'Spanning Stanford, Google Cloud, and AI hackathons reflects wide intellectual curiosity and genuine eagerness to explore unfamiliar domains.',
  },
  {
    id: 'building',
    title: 'Building in Public',
    icon: 'code',
    description:
      "Submitting projects to Kaggle and AI challenges demonstrates confidence in sharing work before it's perfect — a sign of growth mindset and initiative.",
  },
  {
    id: 'learning',
    title: 'Continuous Learning',
    icon: 'book',
    description:
      'Stacking certifications and programs alongside real projects shows a habit of pairing theory with practice — learning just-in-time, not just-in-case.',
  },
  {
    id: 'community',
    title: 'Community Engagement',
    icon: 'users',
    description:
      "Active participation in mentorship and Pakistan's tech ecosystem signals investment in both personal and collective growth — not just solo progress.",
  },
]
