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
        customgray : '#4490c745',
        customSky : '#026EDD'
      },
      borderRadius : {
        signinboxradius : '24px'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        reduWidth: {
          '0%': { width: '100%' },
          '100%': { width: '0' },
        },
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        'reduWidth': 'reduWidth 7s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}