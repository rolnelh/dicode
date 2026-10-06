import type { Metadata, Viewport } from "next";
import { socialImage } from "@/lib/social-image";
import { Analytics } from "@vercel/analytics/next";
import { Poppins, Caveat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/lib/site";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { SkipLink } from "@/components/skip-link";
import { ResourceWidget } from "@/components/resource-widget";
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
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dicode | Développeur web au Bénin · Sites & SaaS",
    template: "%s | Dicode",
  },
  description: site.description,
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
    title: "Dicode · De votre idée à un site prêt pour vos clients",
    description: site.description,
    url: "/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImage],
    title: "Dicode · Développement web & SaaS",
    description: site.description,
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
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.person,
        alternateName: "Dicode",
        url: site.url,
        image: `${site.url}/images/dieudonne.jpeg`,
        jobTitle: "Développeur web",
        description: site.description,
        knowsAbout: [
          "Développement web",
          "React",
          "Next.js",
          "TypeScript",
          "Interfaces SaaS",
        ],
        sameAs: [site.github, site.linkedin, site.threads, site.dribbble],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: "Dicode",
        inLanguage: ["fr", "en"],
        publisher: { "@id": `${site.url}/#person` },
      },
    ],
  };
  return (
    <html lang="fr" className={`${sans.variable} ${hand.variable}`}>
      <body>
        <LanguageProvider>
          <SkipLink />
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
          <ResourceWidget />
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(json).replace(/</g, "\\u003c"),
          }}
        />

        <Analytics />
      </body>
    </html>
  );
}
