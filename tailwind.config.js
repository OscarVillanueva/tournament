module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./componets/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        "100": "40rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
