/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        "gray": "#808080",
        "gunmetalGray": "#2A3439",
        "lightGray" : "#E5E4E2",
        "darkGray": "#1A1110",
        "primary": "#008080",
        "warning": "#CE2029",
        "warningLight": "#ED2939",
        "smokyBlack": "#100C08"
      },

      fontFamily: {
        "inter": ["Inter", "serif"],
      },

      zIndex: {
        1: 1,
        9: 9,
        99: 99,
        999: 999,
        9999: 9999,
        99999: 99999,
        999999: 999999,
      },
    },
  },
  plugins: [],
}

