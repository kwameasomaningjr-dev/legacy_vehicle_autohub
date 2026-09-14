/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#eab308',
          500: '#c49228', // Metallic Gold from Logo
          600: '#a3761c',
          700: '#835b15',
          800: '#644211',
          900: '#482e0c',
        },
        navy: {
          900: '#070d17',
          800: '#0b1626',
          700: '#112238',
          600: '#183150',
          500: '#22446d',
        },
        dark: {
          900: '#070b12',
          800: '#0b121e',
          700: '#142032',
          600: '#203048',
        },
        accent: {
          gold: '#c49228',
          emerald: '#10b981',
          whatsapp: '#25D366',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
