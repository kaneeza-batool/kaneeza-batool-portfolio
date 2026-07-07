export const PROJECT_FILTERS = [
  { id: 'all',        label: 'All' },
  { id: 'ai',         label: 'AI' },
  { id: 'react',      label: 'React' },
  { id: 'mern',       label: 'MERN' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'fullstack',  label: 'Full Stack' },
]

export const ACCENT_COLORS = {
  blue:   { hex: '#2E6BFF', rgb: '46,107,255'   },
  purple: { hex: '#6A5CFF', rgb: '106,92,255'   },
  green:  { hex: '#22C55E', rgb: '34,197,94'    },
  amber:  { hex: '#F59E0B', rgb: '245,158,11'   },
  cyan:   { hex: '#06B6D4', rgb: '6,182,212'    },
  pink:   { hex: '#EC4899', rgb: '236,72,153'   },
  orange: { hex: '#F97316', rgb: '249,115,22'   },
  teal:   { hex: '#14B8A6', rgb: '20,184,166'   },
}

export const CATEGORY_META = {
  ai:         { label: 'AI',          colorKey: 'blue'   },
  react:      { label: 'React',       colorKey: 'purple' },
  mern:       { label: 'MERN',        colorKey: 'green'  },
  javascript: { label: 'JavaScript',  colorKey: 'amber'  },
  fullstack:  { label: 'Full Stack',  colorKey: 'cyan'   },
}

export const PROJECTS = [
  {
    id: 'mentor-mind-ai',
    title: 'MentorMind AI',
    slug: 'mentor-mind-ai',
    category: ['ai'],
    shortDescription:
      'An AI-powered mentoring platform delivering personalized learning pathways through RAG-based knowledge retrieval and Gemini API integration.',
    overview:
      'MentorMind AI is an intelligent mentoring assistant that leverages Retrieval-Augmented Generation (RAG) to provide personalized guidance, adaptive learning paths, and context-aware responses tailored to each learner\'s unique background and goals.',
    problem:
      'Learners often struggle to find personalized guidance that adapts to their unique pace and background. Generic tutorials and static resources fail to address individual learning gaps.',
    solution:
      'Built an AI mentor powered by Gemini APIs and RAG architecture that dynamically retrieves relevant knowledge and crafts personalized roadmaps, responses, and suggestions for each user.',
    features: [
      'RAG-based knowledge retrieval for accurate, grounded answers',
      'Personalized learning roadmap generation per user',
      'Gemini API-powered conversational interface',
      'Session memory for continuous learning context',
      'Streamlit dashboard with progress analytics',
    ],
    techGroups: {
      frontend:  ['Streamlit'],
      backend:   ['Python', 'LangChain'],
      database:  ['ChromaDB'],
      ai:        ['Gemini API'],
      tools:     [],
    },
    architecture: [
      { label: 'User',                 type: 'user'     },
      { label: 'Streamlit Dashboard',  type: 'frontend' },
      { label: 'Python + LangChain',   type: 'backend'  },
      { label: 'Gemini API',           type: 'ai'       },
      { label: 'ChromaDB',             type: 'database' },
    ],
    lessonsLearned:
      'RAG requires thoughtful document chunking and retrieval tuning — embedding quality and retrieval precision matter as much as model capability when grounding answers in domain knowledge.',
    futureImprovements:
      'Voice-based interaction, multi-language support, adaptive difficulty scoring, React-based frontend to replace Streamlit',
    techStack: ['Python', 'Streamlit', 'Gemini API', 'LangChain', 'ChromaDB'],
    status: 'completed',
    year: '2024',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'blue',
    featured: true,
  },
  {
    id: 'elder-bridge-guardian-os',
    title: 'ElderBridge GuardianOS',
    slug: 'elder-bridge-guardian-os',
    category: ['ai', 'fullstack'],
    shortDescription:
      'A compassionate AI-driven care platform supporting elderly individuals with health monitoring, smart reminders, and real-time family connectivity.',
    overview:
      'ElderBridge GuardianOS combines AI health insights with a family-facing dashboard to ensure elderly individuals remain safe, connected, and supported — with minimal intrusion on their daily routines.',
    problem:
      'Elderly individuals living alone face challenges with medication adherence, health pattern changes, and staying connected with family who cannot always be physically present.',
    solution:
      'Developed a unified care platform featuring AI-powered health monitoring, smart reminders, emergency alert escalation, and a real-time family dashboard — built accessibly and compassionately.',
    features: [
      'AI-driven health pattern monitoring and anomaly detection',
      'Smart medication reminder and escalation system',
      'Real-time family connectivity dashboard',
      'Emergency alert notifications with contact escalation',
      'Voice-friendly, high-contrast accessible interface',
    ],
    techGroups: {
      frontend:  ['Streamlit'],
      backend:   ['Python', 'Pandas'],
      database:  ['Firebase'],
      ai:        ['Gemini API'],
      tools:     [],
    },
    architecture: [
      { label: 'Elderly User / Family',   type: 'user'     },
      { label: 'Streamlit Dashboard',     type: 'frontend' },
      { label: 'Python + Pandas',         type: 'backend'  },
      { label: 'Gemini API',              type: 'ai'       },
      { label: 'Firebase Realtime DB',    type: 'database' },
    ],
    lessonsLearned:
      'Accessibility cannot be an afterthought — designing for elderly users reshaped every interaction model, from alert escalation logic to font contrast ratios and tap target sizing.',
    futureImprovements:
      'Wearable device integration, WhatsApp and SMS alert channels, multi-carer permission levels, AI-generated weekly health summary reports',
    techStack: ['Python', 'Streamlit', 'Gemini API', 'Firebase', 'Pandas'],
    status: 'completed',
    year: '2024',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'purple',
    featured: true,
  },
  {
    id: 'dexo-pk',
    title: 'Dexo.pk',
    slug: 'dexo-pk',
    category: ['mern', 'fullstack'],
    shortDescription:
      'A full-stack Pakistani e-commerce marketplace with product listings, cart management, secure authentication, and a complete admin dashboard.',
    overview:
      'Dexo.pk is a production-ready e-commerce platform designed for the Pakistani market — covering product discovery, multi-step checkout, and an admin panel for inventory and order management.',
    problem:
      'Local Pakistani sellers lacked a dedicated, culturally relevant online marketplace that supported local workflows and remained simple enough for non-technical sellers to operate.',
    solution:
      'Built a MERN stack platform with a responsive storefront, JWT-secured authentication, product management, and a full admin panel — optimized for mobile-first users and local e-commerce workflows.',
    features: [
      'Product catalog with search, filters, and categories',
      'Shopping cart and multi-step checkout flow',
      'User authentication with JWT and profile management',
      'Admin dashboard for inventory and order tracking',
      'Cloudinary-powered image uploads for product listings',
    ],
    techGroups: {
      frontend:  ['React'],
      backend:   ['Node.js', 'Express.js'],
      database:  ['MongoDB'],
      ai:        [],
      tools:     ['JWT', 'Cloudinary'],
    },
    architecture: [
      { label: 'Customer / Admin',    type: 'user'     },
      { label: 'React Frontend',      type: 'frontend' },
      { label: 'Node.js + Express',   type: 'backend'  },
      { label: 'MongoDB',             type: 'database' },
      { label: 'Cloudinary CDN',      type: 'service'  },
    ],
    lessonsLearned:
      'Stateless JWT authentication scales well but needs a careful invalidation strategy — a hybrid approach with short-lived access tokens and refresh tokens is worth the added complexity.',
    futureImprovements:
      'Local payment gateway integration (JazzCash / EasyPaisa), seller analytics dashboard, PWA with offline browsing, AI-powered product recommendations',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Cloudinary'],
    status: 'in-progress',
    year: '2024',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'green',
    featured: true,
  },
  {
    id: 'library-tracking-system',
    title: 'Library Tracking System',
    slug: 'library-tracking-system',
    category: ['react'],
    shortDescription:
      'A digital library management system for tracking books, members, borrowing history, and overdue alerts in real time.',
    overview:
      'A comprehensive library management application that digitizes book inventory, member registration, and lending workflows — replacing manual record-keeping with a fast, intuitive React interface.',
    problem:
      'Small libraries and reading clubs struggled with manual book tracking, causing lost records, unreturned books, and a poor member experience.',
    solution:
      'Built a React-based system with book and member management, borrowing history, overdue tracking, and search — all accessible and straightforward to use.',
    features: [
      'Book catalog with search and ISBN lookup',
      'Member registration and profile management',
      'Borrow and return tracking with due dates',
      'Overdue flags and alert notifications',
      'Data export to CSV for record keeping',
    ],
    techGroups: {
      frontend:  ['React', 'CSS Modules'],
      backend:   [],
      database:  ['LocalStorage'],
      ai:        [],
      tools:     ['JavaScript'],
    },
    architecture: [
      { label: 'Librarian / Member',  type: 'user'     },
      { label: 'React UI',            type: 'frontend' },
      { label: 'LocalStorage',        type: 'database' },
    ],
    lessonsLearned:
      'State management complexity scales faster than feature count — even a CRUD app benefits from establishing clear data flow patterns early, before logic becomes tightly entangled.',
    futureImprovements:
      'Cloud sync via Firebase, barcode scanning for check-in/out, multi-library support, mobile-first PWA version',
    techStack: ['React', 'JavaScript', 'LocalStorage', 'CSS Modules'],
    status: 'completed',
    year: '2023',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'amber',
    featured: false,
  },
  {
    id: 'mood-tracker',
    title: 'Mood Tracker',
    slug: 'mood-tracker',
    category: ['react', 'javascript'],
    shortDescription:
      'A daily mood journaling app with emoji check-ins, streak tracking, and visual analytics for better emotional self-awareness.',
    overview:
      'Mood Tracker is a mindful journaling application that helps users log their daily emotional states, identify patterns over time, and build healthier mental wellness habits through engaging visuals.',
    problem:
      'Maintaining consistent mood journaling is difficult without meaningful feedback and visual patterns to keep users motivated and reflective.',
    solution:
      'Created an intuitive React app with emoji-based mood logging, streak motivation, weekly/monthly charts, and personalized reflections — making journaling sustainable and insightful.',
    features: [
      'Emoji-based mood logging with custom notes',
      'Daily streak tracking and milestone badges',
      'Weekly and monthly mood trend charts',
      'Personal journal entries with tags',
      'LocalStorage persistence across sessions',
    ],
    techGroups: {
      frontend:  ['React', 'CSS3'],
      backend:   [],
      database:  ['LocalStorage'],
      ai:        [],
      tools:     ['Chart.js', 'JavaScript'],
    },
    architecture: [
      { label: 'User',          type: 'user'     },
      { label: 'React UI',      type: 'frontend' },
      { label: 'Chart.js',      type: 'service'  },
      { label: 'LocalStorage',  type: 'database' },
    ],
    lessonsLearned:
      'Data visualization transforms an app from a record-keeper into a reflection tool — charting mood patterns revealed insights that raw text logs never surfaced for users.',
    futureImprovements:
      'AI-driven mood predictions, optional therapist sharing mode, push notification daily check-ins, cloud backup',
    techStack: ['React', 'JavaScript', 'Chart.js', 'LocalStorage', 'CSS3'],
    status: 'completed',
    year: '2023',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'pink',
    featured: false,
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker',
    slug: 'habit-tracker',
    category: ['react'],
    shortDescription:
      'A minimalist habit-building app with daily check-ins, GitHub-style contribution grids, and streak visualization.',
    overview:
      'Habit Tracker gamifies daily routine building through streaks, contribution heat maps, and visual completion grids — helping users build lasting habits one day at a time.',
    problem:
      'Most habit apps are either too complex or lack the visual feedback that keeps users motivated to maintain consistent daily routines.',
    solution:
      'Built a clean, fast React app with a GitHub-style contribution grid, streak counters, and customizable habits — designed around the psychology of habit formation.',
    features: [
      'Custom habit creation and categorization',
      'GitHub-style contribution heat map grid',
      'Streak tracking with milestone celebrations',
      'Daily completion analytics and progress bars',
      'Offline-first with LocalStorage persistence',
    ],
    techGroups: {
      frontend:  ['React', 'Tailwind CSS'],
      backend:   [],
      database:  ['LocalStorage'],
      ai:        [],
      tools:     ['JavaScript'],
    },
    architecture: [
      { label: 'User',             type: 'user'     },
      { label: 'React + Tailwind', type: 'frontend' },
      { label: 'LocalStorage',     type: 'database' },
    ],
    lessonsLearned:
      'Gamification works best when it mirrors real behavioral psychology — streak counters and contribution grids tap into the same reward loops that make physical habit formation stick.',
    futureImprovements:
      'Habit templates library, social accountability pairing, Notion API integration, weekly stats digest email',
    techStack: ['React', 'JavaScript', 'LocalStorage', 'Tailwind CSS'],
    status: 'completed',
    year: '2024',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'cyan',
    featured: false,
  },
  {
    id: 'restaurant-website',
    title: 'Restaurant Website',
    slug: 'restaurant-website',
    category: ['javascript'],
    shortDescription:
      'A visually rich restaurant landing page with an interactive menu, online reservations, and smooth scroll interactions.',
    overview:
      'A complete restaurant web presence built with semantic HTML, CSS animations, and vanilla JavaScript — delivering an immersive dining experience without framework overhead.',
    problem:
      'Local restaurants needed an affordable, fast-loading web presence that showcased their menu and ambiance without relying on slow third-party platforms.',
    solution:
      'Designed and developed a performance-first site using vanilla JavaScript — featuring an animated hero, filtered menu, reservation form, and a responsive gallery.',
    features: [
      'Animated hero section with parallax scrolling',
      'Interactive menu with live category filters',
      'Online reservation form with client-side validation',
      'Lightbox image gallery for ambiance showcase',
      'Mobile-first fully responsive layout',
    ],
    techGroups: {
      frontend:  ['HTML5', 'CSS3', 'Bootstrap'],
      backend:   [],
      database:  [],
      ai:        [],
      tools:     ['JavaScript'],
    },
    architecture: [
      { label: 'Restaurant Visitor',  type: 'user'     },
      { label: 'HTML + CSS + JS',     type: 'frontend' },
      { label: 'Bootstrap',           type: 'service'  },
    ],
    lessonsLearned:
      'Framework-free development is the best foundation — mastering DOM manipulation, event delegation, and CSS animations from scratch made every framework I learned afterward faster and easier to pick up.',
    futureImprovements:
      'Online ordering system, real-time reservation API integration, CMS-backed menu management, micro-animation polish',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    status: 'completed',
    year: '2023',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'orange',
    featured: false,
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    slug: 'portfolio-website',
    category: ['react'],
    shortDescription:
      'This portfolio — a premium dark-themed React + Vite showcase with Framer Motion animations and a fully data-driven architecture.',
    overview:
      'A meticulously crafted personal portfolio built from scratch as both a project showcase and a demonstration of frontend engineering skills — featuring smooth animations, interactive sections, and a reusable component system.',
    problem:
      'Generic portfolio templates fail to communicate personality, technical depth, and design sensibility — resulting in forgettable first impressions.',
    solution:
      'Built a custom portfolio with a premium dark aesthetic, Framer Motion animations, data-driven architecture, and a growing component library — designed to grow with my development journey.',
    features: [
      'Premium dark theme with glassmorphism design',
      'Framer Motion scroll and entry animations',
      'Fully data-driven section architecture',
      'Interactive skills, experience, and project sections',
      'Responsive across all device sizes',
    ],
    techGroups: {
      frontend:  ['React', 'Vite', 'Tailwind CSS v4', 'Framer Motion'],
      backend:   [],
      database:  [],
      ai:        [],
      tools:     ['React Icons', 'EmailJS', 'Lenis'],
    },
    architecture: [
      { label: 'Visitor',         type: 'user'     },
      { label: 'React + Vite',    type: 'frontend' },
      { label: 'Framer Motion',   type: 'service'  },
      { label: 'EmailJS',         type: 'service'  },
    ],
    lessonsLearned:
      'Design systems and data-driven architecture pay back immediately — adding new sections required zero structural rework because every token and pattern was centralized from day one.',
    futureImprovements:
      'Blog section with MDX, dark/light theme toggle, multilingual support, CMS integration for real-time project updates',
    techStack: ['React', 'Vite', 'Tailwind CSS v4', 'Framer Motion', 'React Icons'],
    status: 'in-progress',
    year: '2025',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'blue',
    featured: false,
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    slug: 'weather-app',
    category: ['javascript'],
    shortDescription:
      'A clean weather application with real-time forecasts, location search, and dynamic weather-themed UI backgrounds.',
    overview:
      'A fully functional weather application that fetches real-time data from the OpenWeather API and dynamically adapts its visual theme based on current conditions — sunny, cloudy, rainy, or stormy.',
    problem:
      'Most weather apps are cluttered with ads or excessive data that buries the core information users actually need at a glance.',
    solution:
      'Built a minimal, distraction-free weather app surfacing current conditions, hourly trends, and a 5-day forecast — with a dynamic background matching the weather.',
    features: [
      'Real-time weather data via OpenWeather API',
      'City search and automatic geolocation',
      'Dynamic weather-themed animated backgrounds',
      '5-day forecast with hourly breakdown',
      'Temperature unit toggle between °C and °F',
    ],
    techGroups: {
      frontend:  ['HTML5', 'CSS3'],
      backend:   [],
      database:  [],
      ai:        [],
      tools:     ['JavaScript', 'OpenWeather API', 'Fetch API'],
    },
    architecture: [
      { label: 'User',              type: 'user'     },
      { label: 'HTML + CSS + JS',   type: 'frontend' },
      { label: 'OpenWeather API',   type: 'service'  },
    ],
    lessonsLearned:
      'External APIs demand defensive programming — gracefully handling rate limits, network failures, and malformed responses is as important as the happy-path feature itself.',
    futureImprovements:
      'Air quality index, UV index, hourly trend charts, progressive web app with cached last-known state for offline use',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'OpenWeather API', 'Fetch API'],
    status: 'completed',
    year: '2023',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'cyan',
    featured: false,
  },
  {
    id: 'react-component-collection',
    title: 'React Component Collection',
    slug: 'react-component-collection',
    category: ['react'],
    shortDescription:
      'A curated library of reusable, accessible, and animated React components built for rapid, consistent UI development.',
    overview:
      'A growing collection of production-ready React components — buttons, modals, data tables, and form controls — each built with accessibility, customization, and smooth animation in mind.',
    problem:
      'Starting new projects requires rebuilding the same UI primitives repeatedly, causing inconsistent designs and wasted development time across codebases.',
    solution:
      'Created a personal component library with documented, reusable components that drop into any React project — speeding up development while maintaining quality and visual consistency.',
    features: [
      'Buttons, inputs, modals, cards, and data tables',
      'Animated accordion, tab, and drawer components',
      'ARIA attributes and keyboard navigation throughout',
      'Framer Motion animation variants included',
      'Storybook documentation for all components',
    ],
    techGroups: {
      frontend:  ['React', 'Tailwind CSS', 'Framer Motion'],
      backend:   [],
      database:  [],
      ai:        [],
      tools:     ['JavaScript', 'Storybook'],
    },
    architecture: [
      { label: 'Developer',          type: 'user'     },
      { label: 'React Components',   type: 'frontend' },
      { label: 'Storybook Docs',     type: 'service'  },
    ],
    lessonsLearned:
      'The hardest part of a component library is API design — composable, flexible components require deliberate decisions about what stays encapsulated and what is configurable from outside.',
    futureImprovements:
      'NPM package publishing, TypeScript type definitions, visual regression testing with Chromatic, live interactive component playground',
    techStack: ['React', 'JavaScript', 'Framer Motion', 'Tailwind CSS', 'Storybook'],
    status: 'in-progress',
    year: '2024',
    github: 'https://github.com/kaneeza-batool',
    liveDemo: null,
    thumbnail: null,
    gallery: [],
    accentColor: 'purple',
    featured: false,
  },
]

export const PROJECT_LEARNINGS = [
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    description:
      'Every project starts with a real problem. Understanding the "why" before the "how" consistently shapes better, more focused solutions.',
    iconType: 'puzzle',
  },
  {
    id: 'ui-ux-thinking',
    title: 'UI/UX Thinking',
    description:
      'Good interfaces aren\'t just beautiful — they\'re intuitive. Design decisions carry as much weight as technical ones when it comes to user experience.',
    iconType: 'design',
  },
  {
    id: 'scalable-architecture',
    title: 'Scalable Architecture',
    description:
      'Building for today while thinking about tomorrow. Data-driven, modular code is dramatically easier to extend, maintain, and hand off.',
    iconType: 'layers',
  },
  {
    id: 'continuous-improvement',
    title: 'Continuous Improvement',
    description:
      'No project is ever truly finished. Each iteration reveals fresh opportunities to simplify, optimize, and build something more thoughtful.',
    iconType: 'rocket',
  },
]
