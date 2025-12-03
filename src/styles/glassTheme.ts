// GlassMint Theme Tokens
export const glassTheme = {
  colors: {
    primary: {
      main: '#4ADE80',
      light: '#86EFAC',
      dark: '#22C55E',
    },
    accent: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#6D28D9',
    },
    surface: {
      glass: 'rgba(255, 255, 255, 0.06)',
      glassDark: 'rgba(15, 23, 36, 0.8)',
      glassLight: 'rgba(255, 255, 255, 0.03)',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#B7C3CE',
      dark: '#0F1724',
      muted: '#64748B',
    },
    background: {
      main: '#0F1724',
      elevated: '#1A2332',
      gradient: 'linear-gradient(135deg, #0F1724 0%, #1A2332 50%, #0F1724 100%)',
    },
    border: {
      glass: 'rgba(255, 255, 255, 0.08)',
      glassLight: 'rgba(255, 255, 255, 0.12)',
    },
    status: {
      new: { bg: 'rgba(96, 165, 250, 0.2)', text: '#60A5FA' },
      contacted: { bg: 'rgba(251, 191, 36, 0.2)', text: '#FBBF24' },
      qualified: { bg: 'rgba(74, 222, 128, 0.2)', text: '#4ADE80' },
      converted: { bg: 'rgba(124, 58, 237, 0.2)', text: '#A78BFA' },
      lost: { bg: 'rgba(239, 68, 68, 0.2)', text: '#EF4444' },
      pending: { bg: 'rgba(251, 191, 36, 0.2)', text: '#FBBF24' },
      confirmed: { bg: 'rgba(74, 222, 128, 0.2)', text: '#4ADE80' },
      cancelled: { bg: 'rgba(239, 68, 68, 0.2)', text: '#EF4444' },
    },
  },
  effects: {
    blur: 'blur(12px)',
    blurStrong: 'blur(20px)',
    shadow: '0 8px 30px rgba(7, 12, 34, 0.35)',
    shadowElevated: '0 12px 40px rgba(7, 12, 34, 0.5)',
    glassGradient: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(124,58,237,0.06))',
  },
  spacing: {
    base: 8,
  },
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  transition: {
    fast: '150ms ease',
    normal: '220ms ease',
    slow: '350ms ease',
  },
};

export default glassTheme;
