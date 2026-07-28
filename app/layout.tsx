import type { Metadata } from "next";
import { Rye, Poppins } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/SoundProvider";
import { MuteToggle } from "@/components/MuteToggle";

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-western",
});

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-pop",
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
      <body className={`${rye.variable} ${poppins.variable} font-pop`}>
        <SoundProvider>
          <MuteToggle />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
