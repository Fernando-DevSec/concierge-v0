/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'dark-luxury': '#11120D',
        'gold-luxury': '#C5A059',
        'gold-light': '#D4AF37',
      },
      fontFamily: {
        'nav': ['Montserrat', 'sans-serif'],
        'display': ['Pinyon Script', 'cursive'],
      },
    },
  },
  plugins: [],
}

