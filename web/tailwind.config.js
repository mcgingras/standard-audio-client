module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionTimingFunction: {
        'ease-ease': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
