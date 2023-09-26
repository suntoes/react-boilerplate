const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: []
    },
    fontSize: {
      ...defaultTheme.fontSize
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens
    },
    extend: {}
  },
  plugins: []
}
