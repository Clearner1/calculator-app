/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calculator-bg': '#f7f8fb',
        'key-bg': '#ffffff',
        'key-shadow': '#e0e0e0',
        'operator-bg': '#ff9500',
        'operator-shadow': '#d67d00'
      }
    },
  },
  plugins: [],
} 