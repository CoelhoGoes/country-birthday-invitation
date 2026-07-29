import type { Metadata } from "next";
import { Dr_Sugiyama, Miltonian_Tattoo, Delius } from "next/font/google";
import "./globals.css";

// Tipografia definitiva (ver docs/design-reference.md — Figma):
// Dr Sugiyama → destaques em script (título, frase de destaque)
// Miltonian Tattoo → títulos que precisam de legibilidade
// Delius → subtítulos, labels, itens de lista e texto de botões
const drSugiyama = Dr_Sugiyama({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

const miltonianTattoo = Miltonian_Tattoo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const delius = Delius({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Last Rodeo — Convite de Aniversário",
  description: "Convite virtual para a festa de aniversário tema country/western.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${drSugiyama.variable} ${miltonianTattoo.variable} ${delius.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
