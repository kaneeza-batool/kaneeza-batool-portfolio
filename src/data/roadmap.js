import {
  FiCode,
  FiLayers,
  FiServer,
  FiZap,
  FiCloud,
  FiCpu,
  FiActivity,
  FiGlobe,
  FiAperture,
} from 'react-icons/fi'

export const STATUS_CONFIG = {
  completed: {
    label: 'Completed',
    color: '#22C55E',
    borderColor: 'rgba(34,197,94,0.45)',
    bgColor: 'rgba(34,197,94,0.07)',
    glowColor: 'rgba(34,197,94,0.28)',
    badgeClass: 'bg-success/10 text-success border border-success/30',
    progress: 100,
    pulse: false,
  },
  current: {
    label: 'In Progress',
    color: '#2E6BFF',
    borderColor: 'rgba(46,107,255,0.55)',
    bgColor: 'rgba(46,107,255,0.09)',
    glowColor: 'rgba(46,107,255,0.4)',
    badgeClass: 'bg-accent-blue/10 text-accent-blue border border-accent-blue/30',
    progress: 70,
    pulse: true,
  },
  next: {
    label: 'Up Next',
    color: '#6A5CFF',
    borderColor: 'rgba(106,92,255,0.4)',
    bgColor: 'rgba(106,92,255,0.07)',
    glowColor: 'rgba(106,92,255,0.22)',
    badgeClass: 'bg-accent-purple/10 text-accent-purple border border-accent-purple/30',
    progress: 20,
    pulse: false,
  },
  planned: {
    label: 'Planned',
    color: '#F59E0B',
    borderColor: 'rgba(245,158,11,0.4)',
    bgColor: 'rgba(245,158,11,0.07)',
    glowColor: 'rgba(245,158,11,0.18)',
    badgeClass: 'bg-warning/10 text-warning border border-warning/30',
    progress: 0,
    pulse: false,
  },
  future: {
    label: 'Future Vision',
    color: '#6E7B9C',
    borderColor: 'rgba(110,123,156,0.3)',
    bgColor: 'rgba(110,123,156,0.05)',
    glowColor: 'rgba(110,123,156,0.12)',
    badgeClass: 'bg-white/5 text-muted border border-white/10',
    progress: 0,
    pulse: false,
  },
}

export const ROADMAP = [
  {
    id: 'stage-1',
    title: 'Web Foundations',
    stage: 1,
    status: 'completed',
    description:
      'Mastered the building blocks of the web — semantics, structure, styling, and scripting. Built static sites that taught me to think in terms of user experience from day one.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub', 'Bootstrap'],
    estimatedCompletion: 'Completed · 2023',
    dependencies: [],
    resources: [
      { title: 'The Odin Project', type: 'Course' },
      { title: 'MDN Web Docs', type: 'Reference' },
      { title: 'FreeCodeCamp', type: 'Platform' },
    ],
    projects: [
      { title: 'Personal Portfolio v1', type: 'Side Project' },
      { title: 'Static Landing Pages', type: 'Practice' },
    ],
    icon: FiCode,
    expandedContent: {
      goals: [
        'Write semantic, accessible HTML that screen readers respect',
        'Build responsive layouts with CSS Grid and Flexbox from scratch',
        'Understand JavaScript fundamentals — closures, the DOM, and async/await',
        'Use Git for version control and collaborative workflows confidently',
        'Deploy static sites to the web without relying on tutorials',
      ],
      futureOutcomes: [
        'Solid foundation that every future technology is built on top of',
        'Portfolio-quality static sites that demonstrate craft',
        'Version control habits that scale into team environments',
      ],
    },
  },
  {
    id: 'stage-2',
    title: 'React & Component Architecture',
    stage: 2,
    status: 'completed',
    description:
      'Adopted React as my primary UI framework and learned to think in reusable, composable components connected to real-world APIs — graduating from static to dynamic.',
    skills: ['React', 'Hooks', 'Responsive Design', 'REST APIs', 'Component Architecture', 'State Management'],
    estimatedCompletion: 'Completed · 2024',
    dependencies: ['stage-1'],
    resources: [
      { title: 'React Official Docs', type: 'Reference' },
      { title: 'Scrimba React Course', type: 'Course' },
      { title: 'Traversy Media', type: 'YouTube' },
    ],
    projects: [
      { title: 'Interactive Portfolio v2', type: 'Side Project' },
      { title: 'Weather Dashboard', type: 'API Project' },
    ],
    icon: FiLayers,
    expandedContent: {
      goals: [
        'Build reusable component libraries with clear, predictable interfaces',
        'Manage state with useState, useEffect, useContext, and custom hooks',
        'Integrate REST APIs and handle async data flows and loading states',
        'Design mobile-first responsive interfaces that work on every screen',
        'Understand the component lifecycle and when React re-renders',
      ],
      futureOutcomes: [
        'Production-grade React applications at industry standard quality',
        'Deep intuition for component composition and re-render optimization',
        'Full frontend feature delivery without needing supervision',
      ],
    },
  },
  {
    id: 'stage-3',
    title: 'Backend Development',
    stage: 3,
    status: 'current',
    description:
      'Currently closing the full-stack loop — learning backend architecture, database design, and secure authentication to ship complete products independently end-to-end.',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Authentication', 'REST API Design', 'Mongoose'],
    estimatedCompletion: 'In Progress · Est. Q3 2026',
    dependencies: ['stage-1', 'stage-2'],
    resources: [
      { title: 'Node.js Official Docs', type: 'Reference' },
      { title: 'The Odin Project – Node Path', type: 'Course' },
      { title: 'MongoDB University', type: 'Platform' },
    ],
    projects: [
      { title: 'Full Stack Notes App', type: 'In Progress' },
      { title: 'JWT Auth Boilerplate', type: 'In Progress' },
    ],
    icon: FiServer,
    expandedContent: {
      goals: [
        'Build RESTful APIs with Express.js following community best practices',
        'Design MongoDB schemas with Mongoose that reflect real-world data',
        'Implement JWT-based authentication with refresh token security',
        'Connect frontend and backend into a complete full-stack application',
        'Handle server-side errors, validation, and edge cases gracefully',
      ],
      futureOutcomes: [
        'Complete full-stack feature ownership from concept to deployment',
        'Production-ready APIs that handle real user traffic reliably',
        'Architectural intuition that supports microservices thinking later',
      ],
    },
  },
  {
    id: 'stage-4',
    title: 'Advanced React & Engineering Quality',
    stage: 4,
    status: 'next',
    description:
      'After backend fluency, I will revisit the React ecosystem at a deeper level — adopting TypeScript, writing comprehensive tests, and optimizing for performance and scale.',
    skills: ['TypeScript', 'Advanced React', 'Testing', 'Performance Optimization', 'React Query', 'Zustand'],
    estimatedCompletion: 'Est. Q4 2026 – Q1 2027',
    dependencies: ['stage-2', 'stage-3'],
    resources: [
      { title: 'TypeScript Deep Dive', type: 'Book' },
      { title: 'Testing Library Docs', type: 'Reference' },
      { title: 'Kent C. Dodds Blog', type: 'Blog' },
    ],
    projects: [
      { title: 'Typed Full Stack App', type: 'Planned' },
      { title: 'Component Library with Tests', type: 'Planned' },
    ],
    icon: FiZap,
    expandedContent: {
      goals: [
        'Adopt TypeScript across the entire full-stack for compile-time safety',
        'Write unit, integration, and end-to-end tests that actually catch bugs',
        'Optimize React rendering with memoization, code splitting, and lazy loading',
        'Implement scalable client-side state management patterns that survive growth',
        'Measure performance improvements with profiling rather than guessing',
      ],
      futureOutcomes: [
        'Production-grade code quality that scales with team and codebase size',
        'Confident collaboration on typed codebases in real team environments',
        'Portfolio projects with measurable performance metrics to discuss in interviews',
      ],
    },
  },
  {
    id: 'stage-5',
    title: 'DevOps & Cloud Infrastructure',
    stage: 5,
    status: 'planned',
    description:
      'Planning to gain hands-on experience with containerization, CI/CD pipelines, and cloud services to ship code reliably and independently — without depending on a DevOps team.',
    skills: ['Docker', 'GitHub Actions', 'AWS', 'CI/CD', 'Linux', 'Infrastructure as Code'],
    estimatedCompletion: 'Est. 2027',
    dependencies: ['stage-3', 'stage-4'],
    resources: [
      { title: 'AWS Cloud Practitioner', type: 'Certification' },
      { title: 'Docker Official Docs', type: 'Reference' },
      { title: 'GitHub Actions Docs', type: 'Reference' },
    ],
    projects: [
      { title: 'Containerized Full Stack App', type: 'Planned' },
      { title: 'Automated CI/CD Pipeline', type: 'Planned' },
    ],
    icon: FiCloud,
    expandedContent: {
      goals: [
        'Containerize applications with Docker for consistent environments everywhere',
        'Build automated CI/CD pipelines that test and deploy on every push',
        'Deploy and scale services on AWS with security best practices baked in',
        'Apply Infrastructure as Code principles for repeatable, auditable deployments',
        'Monitor production systems and respond to incidents calmly',
      ],
      futureOutcomes: [
        'Ship code from laptop to production without depending on anyone else',
        'Dramatically reduce deployment risk through automated testing and rollback',
        'Cloud infrastructure thinking that directly supports future ML deployments',
      ],
    },
  },
  {
    id: 'stage-6',
    title: 'Machine Learning & AI Systems',
    stage: 6,
    status: 'future',
    description:
      'My long-term destination — transitioning into ML engineering to build, train, and deploy intelligent systems at production scale. The full-stack foundation makes this transition deliberate, not accidental.',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'MLOps', 'Data Engineering', 'Production AI'],
    estimatedCompletion: 'Long-Term Vision · 2028+',
    dependencies: ['stage-4', 'stage-5'],
    resources: [
      { title: 'fast.ai', type: 'Course' },
      { title: 'Hands-On ML with Scikit-Learn', type: 'Book' },
      { title: 'Papers with Code', type: 'Research' },
    ],
    projects: [
      { title: 'ML-Powered Application Feature', type: 'Vision' },
      { title: 'Production AI System', type: 'Vision' },
    ],
    icon: FiCpu,
    expandedContent: {
      goals: [
        'Build and train neural networks with TensorFlow and PyTorch',
        'Design MLOps pipelines that version, monitor, and retrain models automatically',
        'Deploy ML models as scalable APIs that serve real users under real load',
        'Bridge the gap between software engineering and data science naturally',
        'Contribute to open-source AI tooling and research implementation',
      ],
      futureOutcomes: [
        'Machine Learning Engineer role at a product-focused company',
        'AI applications used by real users at meaningful scale',
        'A unique position at the intersection of software engineering and intelligence',
      ],
    },
  },
]

export const SKILL_DEPENDENCY_CHAIN = [
  { label: 'HTML · CSS · JS', stage: 1, status: 'completed' },
  { label: 'React', stage: 2, status: 'completed' },
  { label: 'Node.js · MongoDB', stage: 3, status: 'current' },
  { label: 'TypeScript · Testing', stage: 4, status: 'next' },
  { label: 'Docker · AWS', stage: 5, status: 'planned' },
  { label: 'Machine Learning', stage: 6, status: 'future' },
]

export const CAREER_DESTINATION = [
  {
    label: 'Full Stack Engineer',
    description: 'Building complete web products end-to-end, owning frontend, backend, and deployment with confidence.',
    icon: FiLayers,
    status: 'current',
  },
  {
    label: 'ML Engineer',
    description: 'Training, deploying, and monitoring AI systems that serve real users in production environments.',
    icon: FiCpu,
    status: 'future',
  },
  {
    label: 'AI Product Builder',
    description: 'Shipping intelligent applications that solve real problems at scale — the ultimate destination.',
    icon: FiGlobe,
    status: 'future',
  },
]

export const LEARNING_PHILOSOPHY = [
  {
    step: 'Learn',
    description: 'Consume structured resources with focused intent — not passive consumption but active study.',
    icon: FiAperture,
    color: '#2E6BFF',
  },
  {
    step: 'Build',
    description: 'Apply concepts immediately through real projects with real constraints, not isolated examples.',
    icon: FiCode,
    color: '#22C55E',
  },
  {
    step: 'Reflect',
    description: 'Audit what worked, what broke, and what I still do not understand — honestly.',
    icon: FiActivity,
    color: '#6A5CFF',
  },
  {
    step: 'Improve',
    description: 'Iterate on the project and refine the mental model until it is genuinely solid.',
    icon: FiZap,
    color: '#F59E0B',
  },
  {
    step: 'Share',
    description: 'Teach through documentation, code reviews, or conversation — the real test of understanding.',
    icon: FiGlobe,
    color: '#22C55E',
  },
]
