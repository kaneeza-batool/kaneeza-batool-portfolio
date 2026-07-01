export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0D0B1F',
          secondary: '#1a1560',
          violet: '#7C3AED',
          'violet-light': '#A78BFA',
          'violet-pale': '#C4B5FD',
          amber: '#FBBF24',
          green: '#34D399',
          blue: '#60A5FA',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
