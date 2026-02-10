/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#1e40af',
        'digital-blue': '#0056D2',
        'civic-green': '#10B981',
        'alert-red': '#EF4444',
        'imperial-purple': '#6366F1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(99,102,241,0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(16,185,129,0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(239,68,68,0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(37,99,235,0.15) 0px, transparent 50%)',
      },
      // --- THIS WAS MISSING ---
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards', // 'forwards' keeps it visible after animation ends
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
      // ------------------------
    },
  },
  plugins: [],
}