/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
      colors: {
        ink: '#0C0C0C',
        mist: '#D7E2EA',
        'gold-start': 'var(--gold-gradient-start)',
        'gold-end': 'var(--gold-gradient-end)',
        'gold-accent': 'var(--gold-accent)',
        'gold-bronze': 'var(--gold-bronze)',
        'text-muted-gray': 'var(--text-muted-gray)',
        brand: {
          bg: 'var(--bg-primary)',
          deep: 'var(--bg-deep)',
          gold: {
            start: 'var(--gold-gradient-start)',
            end: 'var(--gold-gradient-end)',
            accent: 'var(--gold-accent)',
            bronze: 'var(--gold-bronze)',
          },
          silver: {
            start: 'var(--silver-gradient-start)',
            mid: 'var(--silver-gradient-mid)',
            end: 'var(--silver-gradient-end)',
          },
          muted: 'var(--text-muted-gray)',
          white: 'var(--text-primary-white)',
        },
      },
      borderColor: {
        'gold-accent': 'var(--gold-border)',
        'gold-accent-subtle': 'var(--gold-border-subtle)',
        'gold-accent-glow': 'var(--gold-border-glow)',
      },
      backgroundImage: {
        'gold-gradient': 'var(--gold-gradient)',
        'gold-gradient-v': 'var(--gold-gradient-v)',
        'silver-gradient': 'var(--silver-gradient)',
      },
    },
  },
  plugins: [],
};

