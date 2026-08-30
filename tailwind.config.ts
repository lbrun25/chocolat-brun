import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette historique (pages boutique / galerie / histoire)
        chocolate: {
          dark: '#3B1E12',
          light: '#F5E6C8',
          medium: '#8B4513',
        },
        // Palette landing « grande brasserie »
        ink: '#1B100B',
        cacao: '#3B1E12',
        bark: '#6B4A3A',
        brass: {
          DEFAULT: '#B8924C',
          deep: '#9A7537',
          pale: '#E7D5A8',
        },
        ivory: '#F6F1E8',
        paper: '#FBF8F2',
        cream: '#EDE4D3',
        sable: '#F5E6C8',
        lac: {
          DEFAULT: '#2E5B61',
          soft: '#9DBFC3',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        dancing: ['var(--font-dancing-script)', 'cursive'],
        chocolate: ['var(--font-chocolate)', 'cursive'],
        'great-vibes': ['var(--font-great-vibes)', 'cursive'],
        cinzel: ['var(--font-cinzel)', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.18em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,16,11,0.04), 0 12px 32px -12px rgba(27,16,11,0.18)',
        lift: '0 1px 2px rgba(27,16,11,0.06), 0 24px 48px -16px rgba(27,16,11,0.28)',
        glow: '0 0 0 1px rgba(184,146,76,0.35), 0 18px 40px -14px rgba(184,146,76,0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate, 0))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--tw-rotate, 0))' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 11s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
