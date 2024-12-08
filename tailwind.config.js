/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'fill-available': '-webkit-fill-available !important',
      },
      colors: {
        primary: {
          DEFAULT: "#EF4444",
          700: "#B91C1C", 
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          '2xl': "6rem",
        },
      }
    },
  },
  plugins: [],
}

