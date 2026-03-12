import colors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        // Brand palette (from Dashboard design)
        brand: {
          navy: {
            DEFAULT: '#102940',
            light: '#2a4760',
            dark: '#0a1a2a',
          },
          accent: {
            DEFAULT: '#2EA67A',
            light: '#3fba8c',
            dark: '#258a65',
          },
        },
        // Semantic colors
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        chocolate: 'var(--color-chocolate)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
      },
    },
  },
  plugins: [],
};
