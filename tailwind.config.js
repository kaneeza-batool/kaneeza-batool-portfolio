export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0D0B2A',
          secondary: '#1a1560',
          violet: '#7C3AED',
          'violet-light': '#A78BFA',
          'violet-pale': '#C4B5FD',
          amber: '#F59E0B',
          green: '#10B981',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
