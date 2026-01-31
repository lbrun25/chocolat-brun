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
        chocolate: {
          dark: '#3B1E12',
          light: '#F5E6C8',
          medium: '#8B4513',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        dancing: ['var(--font-dancing-script)', 'cursive'],
        chocolate: ['var(--font-chocolate)', 'cursive'],
        'great-vibes': ['var(--font-great-vibes)', 'cursive'],
        cinzel: ['var(--font-cinzel)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config


