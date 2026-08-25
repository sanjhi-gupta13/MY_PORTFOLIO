/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kan3an: {
          sidebar: '#4f46e5',
          bg: '#f8fafc',
          card: '#ffffff',
          primary: '#4f46e5',
          dark: '#0f172a',
          muted: '#334155',
          subtle: '#475569',
          border: '#e2e8f0',
          soft: '#f1f5f9',
        },
        slate: {
          dark: '#0f172a',
          body: '#334155',
          muted: '#475569',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        display: ['Outfit', 'Syne', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'kan3an-card': '0 10px 30px -10px rgba(15, 23, 42, 0.06)',
        'kan3an-hover': '0 20px 40px -15px rgba(79, 70, 229, 0.15)',
        'kan3an-pill': '0 8px 20px -4px rgba(79, 70, 229, 0.35)',
        'kan3an-active-nav': '0 8px 20px -4px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
