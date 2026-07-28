import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosa: {
          light: "#f6d3de",
          DEFAULT: "#d97e9b",
          dark: "#a8496b",
        },
        marrom: {
          light: "#a9784f",
          DEFAULT: "#6b4226",
          dark: "#3c2415",
        },
        prata: {
          light: "#f1f1f0",
          DEFAULT: "#c3c1bd",
          dark: "#8a8884",
        },
      },
      fontFamily: {
        western: ["var(--font-western)"],
        pop: ["var(--font-pop)"],
      },
    },
  },
  plugins: [],
};

export default config;
