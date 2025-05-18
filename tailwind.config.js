// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['General Sans', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#15803d', // emerald-700
          light: '#34d399', // emerald-400
          dark: '#14532d', // emerald-900
        }
      },
    },
  },
  plugins: [],
}