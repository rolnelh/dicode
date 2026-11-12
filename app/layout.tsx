import type { Metadata, Viewport } from "next";
import { socialImage } from "@/lib/social-image";
import { Analytics } from "@vercel/analytics/next";
import { Poppins, Caveat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/lib/site";
import { homeSeo, jsonLd, personSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";
// Les styles des sections refaites, un fichier par section :
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/projects.css";
import "./styles/services.css";
import "./styles/project-detail.css";
import "./styles/footer.css";
import "./styles/about.css";
import "./styles/articles.css";
import { LanguageProvider } from "@/components/language-provider";
import { SkipLink } from "@/components/skip-link";
const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-hand",
  display: "swap",
});
// Texte affiché sous l'image quand le lien est partagé (WhatsApp, LinkedIn, X…).
const shareDescription =
  "Design UX/UI et développement web & mobile : je conçois, refonds et fais évoluer vos sites, applications et interfaces SaaS.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeSeo.title,
    template: "%s | Dicode",
  },
  description: homeSeo.description,
  applicationName: site.name,
  verification: {
    google: "_M81974KQb_dBv3rXZBgunEoqTN5dL7bHQHXkLisgRQ",
  },
  alternates: { canonical: "/" },
  authors: [{ name: site.person }],
  creator: site.person,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: "Dicode · J’aide les startups et entrepreneurs à faire évoluer leurs produits numériques",
    description: shareDescription,
    url: "/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImage],
    title: "Dicode · J’aide les startups et entrepreneurs à faire évoluer leurs produits numériques",
    description: shareDescription,
  },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF7",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${sans.variable} ${hand.variable}`}>
      <body>
        <LanguageProvider>
          <SkipLink />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(personSchema(), websiteSchema()),
          }}
        />

        <Analytics />
      </body>
    </html>
  );
}
