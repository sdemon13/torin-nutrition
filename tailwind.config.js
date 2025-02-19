/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // сканируем страницы Next.js
    "./components/**/*.{js,ts,jsx,tsx}", // сканируем компоненты
  ],
  theme: {
    extend: {
      // Добавляем свои шрифты
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // Добавляем собственные цвета
      colors: {
        dark: '#111111',
        gold: '#C7A541',
        emerald: '#059669',
        maroon: '#800020',
      },
      // Добавляем кастомные keyframes и анимации
      keyframes: {
        gradientBG: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        logoFadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowText: {
          '0%, 100%': { textShadow: '0 0 10px rgba(199, 165, 65, 0.6)' },
          '50%': { textShadow: '0 0 20px rgba(199, 165, 65, 0.9)' },
        },
      },
      animation: {
        gradientBG: 'gradientBG 8s ease infinite',
        logoFadeIn: 'logoFadeIn 1.2s ease forwards',
        glowText: 'glowText 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
