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
      colors: {
        customBlue: '#dbecff', 
        // customgray : '#0000000d'
        customgray : '#4490c745'
      },
      borderRadius : {
        signinboxradius : '24px'
      }
    },
  },
  plugins: [],
}