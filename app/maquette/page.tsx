// Maquette de la refonte « défilement narratif » (inspirée de la référence Workx).
// Page isolée, non indexée : le vrai site n'est pas modifié.
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Maquette } from "@/components/maquette/maquette";
import "./maquette.css";

// La police la plus proche de celle du titre de la référence, disponible sur Google Fonts.
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maquette · nouvelle direction",
  robots: { index: false, follow: false },
};

export default function MaquettePage() {
  return (
    <div className={`mq ${display.variable}`}>
      <Maquette />
    </div>
  );
}
