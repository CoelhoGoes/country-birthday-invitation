import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Breakpoints nomeados alinhados aos presets Mobile S/M/L do Chrome
        // DevTools — ver docs/design-reference.md "Revisão 7". Como o
        // Tailwind é mobile-first (min-width), "mobile-s" é equivalente à
        // base (sem prefixo) pra qualquer tela ≥320px — nosso piso de
        // suporte já é 320px. Existe só por simetria/clareza com
        // mobile-m/mobile-l, não muda nada visualmente.
        // Base (sem prefixo) / "mobile-s" = 320-374px, "mobile-m" =
        // 375-424px, "mobile-l" = 425-639px, "sm" (padrão do Tailwind) =
        // 640px+ (desktop).
        "mobile-s": "320px",
        "mobile-m": "375px",
        "mobile-l": "425px",
      },
      colors: {
        rosa: {
          light: "#f6d3de",
          DEFAULT: "#d97e9b",
          dark: "#a8496b",
        },
        marrom: {
          light: "#a9784f",
          DEFAULT: "#6b4226",
          // Tom de tinta usado nos destaques (label "Seu nome", título
          // Dr Sugiyama) — mais avermelhado que o marrom padrão, conforme
          // amostrado de docs/prototipo-mobile.png.
          dark: "#6b1618",
        },
        prata: {
          light: "#f4f4f3",
          DEFAULT: "#b9b9b6",
          dark: "#7a7a77",
        },
        kraft: {
          light: "#f3ead0",
          DEFAULT: "#e8d8c8",
          dark: "#d8c2a8",
        },
      },
      fontFamily: {
        // Tipografia definitiva (ver docs/design-reference.md):
        // Dr Sugiyama (script), Miltonian Tattoo (display), Delius (body).
        script: ["var(--font-script)"],
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
