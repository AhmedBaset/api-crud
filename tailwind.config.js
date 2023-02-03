/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#337AB7",
        dark: "#002A42",
        gray: "#1E1E1E",
        "gray-light": "#6E6D7A",
        light: "#F4F4F5"
      },
    },
  },
  plugins: [],
}
