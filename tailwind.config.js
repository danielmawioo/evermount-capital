// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "slide-left": "slide 25s linear infinite",
      },
      fontFamily: {
        syne: ["'Syne'", "sans-serif"],
        sans: ["Inter", "sans-serif"], // fallback if needed
      },
    },
  },
  plugins: [],
};
