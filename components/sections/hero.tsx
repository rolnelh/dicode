"use client";
// La section d'accueil (hero). Elle parle au visiteur, pas de moi :
// à qui je m'adresse, ce que je fais pour lui, puis des projets en éventail
// comme preuve, et une bande de mots qui défile.
// Les styles sont dans app/styles/hero.css
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/lib/site";

// Les cartes de projets affichées en éventail sous le titre.
// La carte du milieu est droite, les autres s'inclinent vers l'extérieur.
const cards = [
  { slug: "baobab", name: "Baobab", image: "/images/baobab-accueil.webp", width: 1333, height: 899 },
  { slug: "lexpo", name: "L’Expo", image: "/images/hero/lexpo.webp", width: 560, height: 359 },
  { slug: "gozem", name: "Gozem", image: "/images/gozem-after-hero.jpg", width: 1165, height: 747 },
  { slug: "quebec-signature", name: "Québec Signature", image: "/images/hero/quebec-signature.webp", width: 560, height: 385 },
  { slug: "mefolio", name: "MeFolio", image: "/images/hero/mefolio.webp", width: 560, height: 315 },
];

export function Hero() {
  const { language } = useLanguage();
  const en = language === "en";

  // Les mots qui défilent dans la bande sombre.
  const marquee = en
    ? ["Product design", "Redesign", "SaaS dashboards", "Mobile apps", "Next.js"]
    : ["Design produit", "Refonte", "Dashboards SaaS", "Apps mobiles", "Next.js"];

  return (
    <section className="hero-v3">
      <div className="hero-v3-inner wrap">
        <h1>
          {en ? "I help " : "J’aide les "}
          <mark>{en ? "B2B & consumer fintech startups" : "startups fintech B2B et grand public"}</mark>
          {en
            ? " design, redesign and scale their digital products."
            : " à concevoir, refondre et faire grandir leurs produits digitaux."}
        </h1>

        <p className="hero-v3-subtitle">
          {en
            ? "From the first mockup to the live product: clear interfaces your users understand, built on solid code that’s ready to grow."
            : "De la première maquette au produit en ligne\u00a0: des interfaces claires que vos utilisateurs comprennent, sur un code solide, prêt à évoluer."}
        </p>

        <div className="hero-v3-actions">
          <a href={site.booking} className="hero-v3-primary">
            {en ? "Book a call" : "Réserver un appel"} <ArrowUpRight size={18} />
          </a>
          <a href="#projets" className="hero-v3-secondary">
            {en ? "See the projects" : "Voir les projets"} <ArrowRight size={18} />
          </a>
        </div>

        <ul className="hero-v3-proof">
          <li>{en ? "UX/UI design + development" : "Design UX/UI + développement"}</li>
          <li>{en ? "3+ years of experience" : "3+ ans d’expérience"}</li>
          <li>{en ? "Remote, worldwide" : "À distance, partout"}</li>
        </ul>
      </div>

      {/* Les projets en éventail : chaque carte mène à sa fiche. */}
      <ul className="hero-v3-cards" aria-label={en ? "Selected projects" : "Projets choisis"}>
        {cards.map((card, i) => (
          <li key={card.slug} style={{ "--i": i - 2 } as React.CSSProperties}>
            <Link href={`/projets/${card.slug}`}>
              <Image
                src={card.image}
                alt={en ? `${card.name} project` : `Projet ${card.name}`}
                width={card.width}
                height={card.height}
                sizes="(max-width: 700px) 45vw, 260px"
                priority={i === 2}
              />
              <span className="hero-v3-card-name">{card.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* La bande qui défile. La liste est répétée 2 fois pour une boucle sans coupure. */}
      <div className="hero-v2-marquee" aria-hidden="true">
        <div className="track">
          {[...marquee, ...marquee].map((word, i) => (
            <span key={i}>
              {word} <b>✦</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
