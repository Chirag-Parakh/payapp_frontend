/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anta: ['Anta', 'sans-serif'],
        'noto-sans': ['Noto Sans', 'sans-serif'],
        'tiro-devanagari-hindi': ['Tiro Devanagari Hindi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}