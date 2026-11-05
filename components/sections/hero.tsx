"use client";
// La section d'accueil (hero). Elle parle au visiteur, pas de moi :
// à qui je m'adresse et ce que je lui apporte, puis des projets
// présentés en cartes inclinées comme preuve.
// Les styles sont dans app/styles/hero.css
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

// Les cartes de projets, de gauche à droite. Chaque carte mène à sa fiche.
const cards = [
  { slug: "baobab", name: "Baobab", image: "/images/baobab-accueil.webp", width: 1333, height: 899 },
  { slug: "lexpo", name: "L’Expo", image: "/images/hero/lexpo.webp", width: 560, height: 359 },
  { slug: "gozem", name: "Gozem", image: "/images/gozem-after-hero.jpg", width: 1165, height: 747 },
  { slug: "quebec-signature", name: "Québec Signature", image: "/images/hero/quebec-signature.webp", width: 560, height: 385 },
];

export function Hero() {
  const { language } = useLanguage();
  const en = language === "en";

  return (
    <section className="hero-v3">
      <div className="hero-v3-inner wrap">
        <h1>
          {en ? "I help " : "J’aide les "}
          <span className="hero-v3-icon" aria-hidden="true">
            <Logo variant="mark" strokeWidth={14} />
          </span>{" "}
          <mark>{en ? "B2B & consumer fintech startups" : "startups fintech B2B et grand public"}</mark>{" "}
          {en
            ? "design, redesign and scale their digital products"
            : "à concevoir, refondre et faire grandir leurs produits digitaux"}{" "}
          <span className="hero-v3-pill" aria-hidden="true">
            <Image src="/images/hero/mefolio.webp" alt="" width={560} height={315} sizes="140px" />
          </span>
        </h1>

        <p className="hero-v3-subtitle">
          {en
            ? "From the first mockup to the live product: clear interfaces your users understand, built on solid code that’s ready to grow."
            : "De la première maquette au produit en ligne : des interfaces claires que vos utilisateurs comprennent, sur un code solide, prêt à évoluer."}
        </p>

        <a href={site.booking} className="hero-v3-primary">
          {en ? "Book a call" : "Réserver un appel"} <ArrowUpRight size={17} />
        </a>
      </div>

      {/* Les projets en cartes inclinées */}
      <ul className="hero-v3-cards" aria-label={en ? "Selected projects" : "Projets choisis"}>
        {cards.map((card, i) => (
          <li key={card.slug} className={`card-${i + 1}`}>
            <Link href={`/projets/${card.slug}`}>
              <Image
                src={card.image}
                alt={en ? `${card.name} project` : `Projet ${card.name}`}
                width={card.width}
                height={card.height}
                sizes="(max-width: 700px) 45vw, 280px"
                priority={i < 2}
              />
              <span className="hero-v3-card-name">{card.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
