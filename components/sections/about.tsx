"use client";
// La section "À propos" : ta photo à gauche, un court texte à droite.
// Les styles sont dans app/styles/about.css
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function About() {
  const { language } = useLanguage();
  const en = language === "en";

  // Les 3 points forts affichés en petites étiquettes.
  const values = en
    ? ["Clear offer", "Mobile & desktop", "AI code, finished properly"]
    : ["Une offre claire", "Mobile & ordinateur", "Code IA finalisé"];

  return (
    <section id="a-propos" className="ab wrap section-anchor">
      <div className="ab-photo">
        <Image src="/images/dieudonne.jpeg" alt="Dieudonné Houndagnon" width={1239} height={1280} sizes="(max-width: 700px) 60vw, 280px" />
      </div>

      <div className="ab-text">
        <p className="hand">{en ? "The person behind Dicode." : "Le visage derrière Dicode."}</p>
        <h2>
          {en ? "Building your product, " : "Développer votre produit, "}
          <span>{en ? "understanding your business." : "comprendre votre activité."}</span>
        </h2>
        <p>
          {en
            ? "I’m Dieudonné Houndagnon, a web developer based in Benin with over three years of experience. I create, redesign and finish websites, with one goal: a site that is pleasant to use and an offer that is easy to understand."
            : "Je suis Dieudonné Houndagnon, développeur web au Bénin avec plus de trois ans d’expérience. Je crée, repense et finalise des sites avec un objectif : un site agréable à utiliser et une offre facile à comprendre."}
        </p>
        <ul className="ab-values">
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
        <Link href="/contact" className="ab-button">
          {en ? "Let’s talk about your project ↗" : "Parlons de votre projet ↗"}
        </Link>
      </div>
    </section>
  );
}
