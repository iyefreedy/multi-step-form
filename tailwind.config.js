/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slide: 'slide 0.5s cubic-bezier(0.680, -0.550, 0.265, 1.550) both'
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '70%': {
            transform: 'translateX(-30%)',
            opacity: .3,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          }
        }

      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}