export const EXPERIENCE_FILTERS = [
  { id: 'all',       label: 'All' },
  { id: 'training',  label: 'Training' },
  { id: 'community', label: 'Community' },
  { id: 'mentorship',label: 'Mentorship' },
  { id: 'programs',  label: 'Programs' },
]

export const EXPERIENCES = [
  {
    id: 'hec-gen-ai',
    organization: 'HEC Generative AI Training Program',
    role: 'Top Performer',
    duration: '2024',
    location: 'Pakistan',
    type: 'training',
    description:
      'Completed an intensive AI learning program focused on practical Generative AI concepts, RAG systems, Streamlit application development, prompt engineering techniques, and collaborative project delivery.',
    technologies: ['Python', 'Streamlit', 'RAG', 'Prompt Engineering', 'Gemini APIs'],
    achievements: ['Top Performer', 'Hands-on AI projects', 'Collaborative learning'],
    website: null,
    logoPlaceholder: 'HEC',
    logoColor: 'blue',
    status: 'completed',
  },
  {
    id: 'saylani-mass-it',
    organization: 'Saylani Mass IT Training',
    role: 'Frontend Development Trainee',
    duration: '2023 – 2024',
    location: 'Karachi, Pakistan',
    type: 'training',
    description:
      'Strengthened frontend development skills through structured learning and project-based practice, covering core web technologies and modern frameworks.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React'],
    achievements: ['Project-based curriculum', 'Structured learning path'],
    website: null,
    logoPlaceholder: 'SMIT',
    logoColor: 'purple',
    status: 'completed',
  },
  {
    id: 'dev-weekends',
    organization: 'Dev Weekends',
    role: 'Mentee',
    duration: '2024',
    location: 'Remote',
    type: 'mentorship',
    description:
      'Participated in mentoring sessions, technical discussions, and collaborative learning while building practical development skills with guidance from experienced practitioners.',
    technologies: [],
    achievements: ['Technical mentoring', 'Peer collaboration', 'Skill development'],
    website: null,
    logoPlaceholder: 'DW',
    logoColor: 'green',
    status: 'completed',
  },
  {
    id: 'rtc',
    organization: 'RTC',
    role: 'Brand Associate',
    duration: '2023',
    location: 'Pakistan',
    type: 'community',
    description:
      'Contributed to community engagement, communication initiatives, and team collaboration efforts within a technology-oriented organization.',
    technologies: [],
    achievements: ['Community engagement', 'Team collaboration', 'Communication initiatives'],
    website: null,
    logoPlaceholder: 'RTC',
    logoColor: 'amber',
    status: 'completed',
  },
  {
    id: 'stanford-code-in-place',
    organization: 'Stanford Code in Place',
    role: 'Participant',
    duration: '2024',
    location: 'Remote (Global)',
    type: 'programs',
    description:
      'Participated in a globally recognized programming education initiative organized by Stanford University, strengthening programming fundamentals alongside learners from around the world.',
    technologies: ['Python'],
    achievements: ['Global cohort participation', 'Programming fundamentals'],
    website: null,
    logoPlaceholder: 'SCI',
    logoColor: 'red',
    status: 'completed',
  },
]

export const EXPERIENCE_LEARNINGS = [
  {
    id: 'continuous-learning',
    title: 'Continuous Learning',
    description:
      'Every program reinforced that growth happens when you stay curious and commit to learning beyond the classroom.',
    iconType: 'brain',
  },
  {
    id: 'team-collaboration',
    title: 'Team Collaboration',
    description:
      'Working across cohorts and communities taught me how to contribute meaningfully within diverse teams.',
    iconType: 'team',
  },
  {
    id: 'real-projects',
    title: 'Building Real Projects',
    description:
      'Hands-on practice across training programs showed me that building is the fastest path to understanding.',
    iconType: 'code',
  },
  {
    id: 'professional-growth',
    title: 'Professional Growth',
    description:
      'Each experience — from mentoring sessions to community roles — shaped my professional presence and communication.',
    iconType: 'growth',
  },
]
