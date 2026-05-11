/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: {
            DEFAULT: '#FBCFE8',
            hover: '#F9A8D4',
            light: '#FCE7F3',
          },
          orange: {
            DEFAULT: '#FFEDD5',
            hover: '#FED7AA',
            light: '#FFF7ED',
          },
        }
      }
    },
  },
  plugins: [],
}
