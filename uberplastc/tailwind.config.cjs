/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#10B981',
        'eco-green-dark': '#059669',
        'eco-green-light': '#D1FAE5',
        'eco-blue': '#3B82F6',
        'eco-blue-dark': '#1D4ED8',
        'eco-blue-light': '#DBEAFE',
        'eco-purple': '#7C3AED',
        'eco-purple-dark': '#5B21B6',
        'eco-purple-light': '#EDE9FE',
      },
      textColor: {
        'primary': '#1F2937',
        'primary-dark': '#F9FAFB',
        'secondary': '#6B7280',
        'secondary-dark': '#D1D5DB',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}