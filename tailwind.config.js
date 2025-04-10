/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}', // Incluye archivos HTML si los usas
    './app/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors:{
        pastel:{
          pink:'#FADADD',
          blue: '#AECBFA',
          green: '#D4F1BE',
          yellow: '#FFFACD',
          purple: '#3c0366',
          black: '#0a0a0a',
          rose:   '#ffa1ad',
          lilac: '#dab2ff',
          white:' #fef2f2'

        },
      },
    },
  },
  plugins: [],
}

