"use client";
// La section d'accueil (hero). Elle parle au visiteur, pas de moi :
// à qui je m'adresse et ce que je lui apporte, puis des interfaces
// alignées côte à côte comme preuve.
// Les styles sont dans app/styles/hero.css
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { Logo } from "@/components/ui/logo";
import { BrandIcon } from "@/components/ui/brand-icon";
import { site } from "@/lib/site";

// Les interfaces affichées côte à côte sous le titre, de gauche à droite.
const shots = [
  { name: "Baobab", image: "/images/baobab-accueil.webp", width: 1333, height: 899 },
  { name: "Forma", image: "/images/hero/forma.webp", width: 1165, height: 883 },
  { name: "Milka", image: "/images/hero/milka.webp", width: 1280, height: 853 },
  { name: "Essor", image: "/images/hero/essor.webp", width: 1152, height: 800 },
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
          <mark>{en ? "startups and entrepreneurs" : "startups et entrepreneurs"}</mark>{" "}
          {en
            ? "design, redesign and grow their digital products"
            : "à concevoir, refondre et faire évoluer leurs produits numériques"}
        </h1>

        <p className="hero-v3-subtitle">
          {en
            ? "From the first mockup to the live product: clear interfaces your users understand, built on solid code that’s ready to grow."
            : "De la première maquette au produit en ligne : des interfaces claires que vos utilisateurs comprennent, sur un code solide, prêt à évoluer."}
        </p>

        {/* Le bouton du hero : WhatsApp en direct ("Parlons de votre projet" est déjà dans la nav) */}
        <div className="hero-v3-actions">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="hero-v3-whatsapp">
            <BrandIcon name="whatsapp" />
            {en ? "Chat on WhatsApp" : "Discutons sur WhatsApp"}
          </a>
        </div>
      </div>

      {/* Les interfaces, alignées côte à côte. Même hauteur pour toutes :
          chaque image prend une largeur proportionnelle à son format. */}
      <ul className="hero-v3-shots" aria-label={en ? "Interfaces I designed" : "Interfaces conçues"}>
        {shots.map((shot, i) => (
          <li key={shot.name} style={{ flexGrow: shot.width / shot.height }}>
            <Image
              src={shot.image}
              alt={en ? `${shot.name} interface` : `Interface ${shot.name}`}
              width={shot.width}
              height={shot.height}
              sizes="(max-width: 700px) 92vw, 26vw"
              priority={i === 1}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
