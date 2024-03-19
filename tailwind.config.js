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
        MidNight : '#002E6E',
        BoxBlue : '#1150AF',
        // customBlue: '#dbecff', 
        DarkBlue: '#026EDD', 
        customSky: '#dbecff', 
        customBlue: '#6FA6F9', 
        cyan :'#00B9F1',
        customgray : '#00000059'
        // customgray : '#4490c745',
        // customSky : '#026EDD'
      },
      borderRadius : {
        signinboxradius : '24px'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        Page_wiggle: {
          '0%, 90%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        reduWidth: {
          '0%': { width: '100%' },
          '100%': { width: '0' },
        },
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        'Page_wiggle': 'Page_wiggle 10s ease-in-out infinite',
        'reduWidth': 'reduWidth 7s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}