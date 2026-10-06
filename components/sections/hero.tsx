"use client";
import { ButtonLink } from "@/components/ui/button-link";
import { Loop, Sparks } from "@/components/ui/decorations";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/lib/site";
import { HeroProjectPreviews } from "./hero-project-previews";
export function Hero() {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <section className="hero wrap ai-hero">
      <HeroProjectPreviews />
      <Loop />
      <Sparks />
      <div className="hero-copy">
        <p className="hand greeting">
          {en
            ? "Hi, I’m Dieudonné. Let’s build with purpose."
            : "Bonjour, moi c’est Dieudonné. Du code, avec du sens."}
        </p>
        <p className="hero-kicker">
          {en
            ? "WEB DEVELOPMENT · DESIGN · PRODUCT THINKING"
            : "DÉVELOPPEMENT WEB · DESIGN · VISION PRODUIT"}
        </p>
        <h1>
          <span className="hero-lead">
            {en ? "From idea to product." : "De votre idée au produit."}
          </span>
          <br />
          {en ? "I create, rethink and finish" : "Je crée, repense et finalise"}
          <br className="desktop-break" />{" "}
          <span className="underline-mark">
            {en ? "your website." : "votre site."}
          </span>
        </h1>
        <p className="hero-description">
          {en
            ? "A website built from scratch or an existing product to improve, with or without AI. I bring thoughtful design, solid development and a clear path from your offer to your users."
            : "Un site créé de zéro ou un produit existant à améliorer, avec ou sans IA. J’allie design soigné, développement solide et parcours clairs pour relier votre offre à vos utilisateurs."}
        </p>
        <div className="hero-actions">
          <a href={site.booking} className="button">
            Book a call ↗
          </a>
          <ButtonLink href="#projets" variant="outline">
            {en ? "Explore my work" : "Voir mes projets"} ↗
          </ButtonLink>
        </div>
        <div className="hero-proof">
          <span>
            {en ? "3+ years building for the web" : "3+ ans de développement web"}
          </span>
          <span>{en ? "Co-founder of VibenGo" : "Cofondateur de VibenGo"}</span>
        </div>
      </div>
    </section>
  );
}
