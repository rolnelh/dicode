import type { Metadata } from "next";
import { socialImage } from "@/lib/social-image";
import { ContactContent } from "@/components/contact/contact-content";
export const metadata: Metadata = {
  title: "Contact · Parlons de votre projet web",
  description:
    "Présentez votre projet de création, refonte ou interface SaaS à Dieudonné Houndagnon, développeur web. Échangeons sur vos besoins et votre budget.",
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
  const enabled = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM,
  );
  return <ContactContent deliveryEnabled={enabled} />;
}
