/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
      },
      backgroundImage: {
        pokeball: "url('/src/assets/thumb-1920-677583.png')",
        main: "url('/src/assets/seamless-pattern-pokemon-go-pokeball-background-vector-23236924.jpg')",
      },
    },
  },
  plugins: [],
};
