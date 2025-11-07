/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a9d94a',
        'primary-dark': '#91c227',
        dark: {
          DEFAULT: '#121212',
          'card': '#1f1f1f',
          'border': '#333',
        },
      },
    },
  },
  plugins: [],
}