// L'image de partage (Open Graph) d'une page : ce qui s'affiche quand on colle
// le lien sur LinkedIn, WhatsApp, Facebook ou X. Générée au build, aux couleurs du site.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ARROW, FRAME, WORDMARK, LIME } from "@/components/ui/logo";

export const ogSize = { width: 1200, height: 630 };
const INK = "#141419";

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="105 105 1070 250"><g fill="none" stroke="${INK}" stroke-width="10" stroke-linejoin="round"><path d="${FRAME}"/><path d="${WORDMARK}"/></g><path d="${ARROW}" fill="${LIME}"/></svg>`;
const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

export async function ogCard({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  const [medium, semibold] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Poppins-500.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Poppins-600.ttf")),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "#ffffff", fontFamily: "Poppins", color: INK }}>
        {/* halo citron, comme sur le site */}
        <div style={{ position: "absolute", right: -220, top: -260, width: 720, height: 720, borderRadius: 720, background: "radial-gradient(circle, rgba(213,248,44,0.55) 0%, rgba(213,248,44,0) 70%)" }} />
        <img src={logoSrc} width={270} height={63} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <span style={{ fontSize: 28, fontWeight: 500, background: LIME, padding: "6px 18px", borderRadius: 12 }}>{kicker}</span>
          </div>
          <div style={{ fontSize: title.length > 60 ? 52 : title.length > 28 ? 64 : 80, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.08, marginTop: 24 }}>{title}</div>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#55545c", marginTop: 18, lineHeight: 1.35 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 500, color: "#55545c" }}>Dieudonné Houndagnon · Développeur Front-End React & Next.js</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
