/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/admin/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        primary: "#f5f6f2",
        // primary: "#F4EFD1",
        secondary: "#33495B",
        secondaryOne: "#979698",
        // tertiary: "#33495B",
        tertiary: "#C44137",
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
    },
  },
  plugins: [],
}
