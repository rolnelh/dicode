import type { Metadata } from "next";
import { socialImage } from "@/lib/social-image";
import { ContactContent } from "@/components/contact/contact-content";
export const metadata: Metadata = {
  title: "Contact · Développeur Front-End freelance",
  description:
    "Un site à créer ou à refondre ? Écrivez à Dieudonné Houndagnon, développeur Front-End freelance à Cotonou (React, Next.js), disponible au Bénin et à distance.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Parlons de votre projet web | Dicode",
    description:
      "Création de site, refonte ou interface SaaS : présentez votre besoin à Dieudonné.",
    url: "/contact",
    images: [socialImage],
  },
  twitter: {
    title: "Parlons de votre projet web | Dicode",
    description: "Création de site, refonte ou interface SaaS.",
    images: [socialImage],
  },
};
export default function Contact() {
  const enabled = Boolean(process.env.FORMSPREE_ENDPOINT?.trim());
  return <ContactContent deliveryEnabled={enabled} />;
}