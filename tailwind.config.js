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
        // Linear & Vercel inspired dark surfaces
        dark: {
          950: '#0B0F19', // Canvas background
          900: '#111827', // Card & Panel surface
          850: '#161F33', // Elevated hover surface
          800: '#1F2937', // Strong borders
          750: '#283548', // Subtle borders
          700: '#374151', // Accent borders
          600: '#4B5563', // Muted text
        },
        // Refined, authoritative Brand Palette (Cobalt Indigo as Main Brand Color)
        brand: {
          primary: '#4F46E5', // Indigo-600 (Main Layout Color)
          primaryHover: '#4338CA',
          primaryLight: '#6366F1',
          primaryMuted: 'rgba(79, 70, 229, 0.12)',
          accent: '#0EA5E9', // Sky Blue (Data & Frontier)
          accentLight: '#38BDF8',
          emerald: '#10B981', // Mint Green (Success & Path)
          emeraldLight: '#34D399',
          rose: '#EF4444', // Red/Coral (Target & Barrier)
          roseLight: '#F87171',
          amber: '#F59E0B', // Amber (Traffic & Swaps)
          amberLight: '#FBBF24',
          indigo: '#4F46E5',
          indigoLight: '#818CF8',
          teal: '#0D9488',
        },
        slate: {
          850: '#141D2E',
          950: '#080C14',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'primary': '0 4px 14px 0 rgba(79, 70, 229, 0.35)',
        'card-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'card-light': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(226, 232, 240, 0.8)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.97)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      }
    },
  },
  plugins: [],
}
