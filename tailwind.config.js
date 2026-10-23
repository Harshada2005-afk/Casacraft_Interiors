/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FBF8F3',
        cream: '#F4EFE7',
        beige: { DEFAULT: '#E9E0D2', dark: '#D8CBB6' },
        charcoal: { DEFAULT: '#262523', light: '#3A3835', soft: '#55524D' },
        stone: { DEFAULT: '#8C877F', light: '#B9B4AC' },
        gold: { light: '#E3CFA8', DEFAULT: '#B8955E', dark: '#9A7A47' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -15px rgba(38, 37, 35, 0.18)',
        lift: '0 25px 60px -20px rgba(38, 37, 35, 0.30)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slow-zoom': { '0%': { transform: 'scale(1.12)' }, '100%': { transform: 'scale(1)' } },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slow-zoom': 'slow-zoom 2.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in': 'slide-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
