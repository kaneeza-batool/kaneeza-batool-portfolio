export const colors = {
  primary: '#081B3A',
  secondary: '#0F2854',
  accentBlue: '#2E6BFF',
  accentPurple: '#6A5CFF',
  background: '#050E20',
  surface: '#0D1F43',
  card: '#102A59',
  border: 'rgba(255,255,255,0.08)',
  textPrimary: '#FFFFFF',
  textSecondary: '#A8B2D1',
  muted: '#6E7B9C',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
}

export const gradients = {
  accent: 'linear-gradient(135deg, #2E6BFF 0%, #6A5CFF 100%)',
  accentReverse: 'linear-gradient(135deg, #6A5CFF 0%, #2E6BFF 100%)',
  surface: 'linear-gradient(135deg, #0D1F43 0%, #102A59 100%)',
  dark: 'linear-gradient(135deg, #050E20 0%, #081B3A 100%)',
  glow: 'radial-gradient(ellipse at center, rgba(46,107,255,0.15) 0%, transparent 70%)',
  purpleGlow: 'radial-gradient(ellipse at center, rgba(106,92,255,0.15) 0%, transparent 70%)',
  mesh: 'linear-gradient(135deg, #050E20 0%, #081B3A 30%, #0F2854 60%, #050E20 100%)',
}

export const shadows = {
  card: '0 4px 32px rgba(0,0,0,0.4)',
  glow: '0 0 40px rgba(46,107,255,0.25)',
  purpleGlow: '0 0 40px rgba(106,92,255,0.25)',
  sm: '0 2px 8px rgba(0,0,0,0.3)',
  md: '0 8px 32px rgba(0,0,0,0.4)',
  lg: '0 16px 64px rgba(0,0,0,0.5)',
  button: '0 4px 24px rgba(46,107,255,0.4)',
  buttonPurple: '0 4px 24px rgba(106,92,255,0.4)',
}

export const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
}

export const transitions = {
  fast: 'all 0.15s ease',
  base: 'all 0.3s ease',
  slow: 'all 0.5s ease',
  spring: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const zIndex = {
  base: 0,
  above: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  tooltip: 500,
  cursor: 9999,
}
