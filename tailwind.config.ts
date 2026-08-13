import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-deep': '#080A0F',
        'surface-base': '#0D121A',
        'surface-low': '#161c20',
        'surface-mid': '#1a2024',
        'border-subtle': '#1E2633',
        'border-accent': '#2D384D',
        primary: '#8fd6ff',
        'on-surface': '#dee3e8',
        'on-muted': '#bcc8d1',
        critical: '#FF4D4D',
        warning: '#FFB347',
        success: '#00E676',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        headline: ['"Hanken Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
