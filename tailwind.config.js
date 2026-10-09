/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          doodle: "#8FD9F2",
          deep: "#5EB8DD",
        },
        ink: {
          DEFAULT: "#2B2B2B",
          soft: "#4A4A4A",
        },
        cream: "#FFF5E4",
        gold: "#FFC966",
        coral: "#FF7F66",
        mint: "#B8F5EF",
        paper: "#FDFCF7",
      },
      fontFamily: {
        hand: ['"Patrick Hand"', '"Gochi Hand"', "cursive"],
        display: ['"Gochi Hand"', '"Patrick Hand"', "cursive"],
        body: ['"Nunito"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        doodle: "4px 4px 0 0 #2B2B2B",
        doodleSm: "3px 3px 0 0 #2B2B2B",
        doodleLg: "6px 6px 0 0 #2B2B2B",
      },
      borderRadius: {
        doodle: "22px 26px 22px 28px / 26px 22px 28px 22px",
      },
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.9)" },
          "60%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        fillBar: {
          "0%": { width: "0%" },
          "100%": { width: "var(--target)" },
        },
      },
      animation: {
        wobble: "wobble 1.4s ease-in-out infinite",
        pop: "pop 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
