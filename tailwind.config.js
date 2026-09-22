/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090E',
          900: '#0D1117',
          850: '#131822',
          800: '#1A2230',
          700: '#263346',
          600: '#384960',
        },
        brand: {
          cyan: '#06B6D4',
          cyanLight: '#67E8F9',
          emerald: '#10B981',
          emeraldLight: '#6EE7B7',
          rose: '#F43F5E',
          roseLight: '#FDA4AF',
          amber: '#F59E0B',
          amberLight: '#FCD34D',
          indigo: '#6366F1',
          indigoLight: '#A5B4FC',
          violet: '#8B5CF6',
          violetLight: '#C4B5FD',
        },
        slate: {
          850: '#151D2A',
          950: '#090D15',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(6, 182, 212, 0.45)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.45)',
        'glow-rose': '0 0 20px -3px rgba(244, 63, 94, 0.45)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.45)',
        'glow-indigo': '0 0 20px -3px rgba(99, 102, 241, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-dark': '0 4px 24px -1px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 0.6s cubic-bezier(0, 0.2, 0.8, 1) forwards',
        'glow-flow': 'glowFlow 2s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.4' },
          '50%': { transform: 'scale(1.15)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowFlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))' },
          '50%': { filter: 'drop-shadow(0 0 18px rgba(245, 158, 11, 1))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
