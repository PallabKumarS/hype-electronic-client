/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        navBG: "url('/src/assets/navBg.webp')",
        input: "url('/src/assets/imageInput.webp')",
        modalBg: "url('/src/assets/modalBg.jpg')",
      },
      colors: {
        blueViolet: "#8a2be2",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
