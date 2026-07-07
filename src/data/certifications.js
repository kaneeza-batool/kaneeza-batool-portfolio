export const CERT_FILTERS = [
  { id: 'all',         label: 'All'             },
  { id: 'ai',          label: 'AI'              },
  { id: 'cloud',       label: 'Cloud'           },
  { id: 'web',         label: 'Web Development' },
  { id: 'programming', label: 'Programming'     },
  { id: 'community',   label: 'Community'       },
]

export const CERT_COLORS = {
  purple: { hex: '#6A5CFF', rgb: '106,92,255'  },
  blue:   { hex: '#2E6BFF', rgb: '46,107,255'  },
  green:  { hex: '#22C55E', rgb: '34,197,94'   },
  amber:  { hex: '#F59E0B', rgb: '245,158,11'  },
  cyan:   { hex: '#06B6D4', rgb: '6,182,212'   },
  teal:   { hex: '#14B8A6', rgb: '20,184,166'  },
}

export const CATEGORY_LABEL = {
  ai:          'AI',
  cloud:       'Cloud',
  web:         'Web Development',
  programming: 'Programming',
  community:   'Community',
}

export const CERTIFICATIONS = [
  {
    id: 'hec-generative-ai',
    title: 'Generative AI Training Program',
    issuer: 'Higher Education Commission (HEC)',
    issuerShort: 'HEC',
    issueDate: '2024',
    category: 'ai',
    credentialUrl: '',
    certificateImage: null,
    skills: [
      'Generative AI',
      'Large Language Models',
      'Prompt Engineering',
      'AI Applications',
      'Responsible AI',
    ],
    featured: true,
    verified: true,
    description:
      'Completed the HEC Generative AI Training Program — a nationally recognized initiative equipping university students with applied knowledge in generative AI, large language models, and responsible AI practices. Recognized as a top performer for outstanding engagement and project-level implementation.',
    colorKey: 'purple',
  },
  {
    id: 'google-intro-gen-ai',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    issuerShort: 'GC',
    issueDate: '2024',
    category: 'ai',
    credentialUrl: '',
    certificateImage: null,
    skills: ['Generative AI', 'Foundation Models', 'AI Fundamentals', 'Google Cloud'],
    featured: false,
    verified: true,
    description:
      'Covers the definition, types, and applications of generative AI — exploring how it differs from traditional machine learning and its real-world use cases.',
    colorKey: 'blue',
  },
  {
    id: 'google-intro-llms',
    title: 'Introduction to Large Language Models',
    issuer: 'Google Cloud',
    issuerShort: 'GC',
    issueDate: '2024',
    category: 'ai',
    credentialUrl: '',
    certificateImage: null,
    skills: ['Large Language Models', 'Prompt Tuning', 'NLP', 'Foundation Models'],
    featured: false,
    verified: true,
    description:
      'Explores LLMs, their use cases, and how to improve performance through prompt tuning — with practical insights into Google\'s AI development ecosystem.',
    colorKey: 'blue',
  },
  {
    id: 'google-responsible-ai',
    title: 'Introduction to Responsible AI',
    issuer: 'Google Cloud',
    issuerShort: 'GC',
    issueDate: '2024',
    category: 'ai',
    credentialUrl: '',
    certificateImage: null,
    skills: ['Responsible AI', 'AI Ethics', 'Fairness & Inclusion', 'AI Safety'],
    featured: false,
    verified: true,
    description:
      'Covers responsible AI principles, why ethics in AI matters, and how Google implements responsible AI practices across its products and services.',
    colorKey: 'blue',
  },
  {
    id: 'github-student-pack',
    title: 'GitHub Student Developer Pack',
    issuer: 'GitHub Education',
    issuerShort: 'GH',
    issueDate: '2024',
    category: 'community',
    credentialUrl: 'https://education.github.com/pack',
    certificateImage: null,
    skills: ['GitHub', 'Version Control', 'Open Source', 'Developer Tools'],
    featured: false,
    verified: true,
    description:
      'Verified student developer recognition through GitHub Education — providing access to professional tools, cloud credits, and industry-grade resources used in real-world development.',
    colorKey: 'amber',
  },
]

export const CERT_LEARNING_JOURNEY = [
  {
    id: 'foundation',
    year: '2023',
    phase: 'Foundation',
    label: 'Web Fundamentals',
    description: 'HTML, CSS, JavaScript & programming foundations',
    colorKey: 'cyan',
  },
  {
    id: 'growth',
    year: '2024',
    phase: 'Growth',
    label: 'AI & Cloud Learning',
    description: 'Generative AI, LLMs, responsible AI, cloud tools',
    colorKey: 'blue',
  },
  {
    id: 'building',
    year: '2024–2025',
    phase: 'Building',
    label: 'Real-World Projects',
    description: 'Applying credentials through projects & experiments',
    colorKey: 'purple',
  },
  {
    id: 'future',
    year: '2025+',
    phase: 'Future',
    label: 'Continuous Learning',
    description: 'Advanced certs & specialized domains ahead',
    colorKey: 'teal',
  },
]
