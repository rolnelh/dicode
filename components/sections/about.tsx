"use client";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Sparks } from "@/components/ui/decorations";
import { useLanguage } from "@/components/language-provider";
export function About() {
  const { language } = useLanguage();
  const en = language === "en";
  return (
    <section id="a-propos" className="about wrap section-space section-anchor">
      <div className="portrait-wrap">
        <div className="portrait">
          <Image
            src="/images/dieudonne.jpeg"
            alt="Dieudonné Houndagnon"
            width={1239}
            height={1280}
            sizes="(max-width: 700px) 90vw, 40vw"
          />
        </div>
        <span className="hand portrait-note">
          {en ? "The person behind Dicode." : "Le visage derrière Dicode."}
        </span>
        <Sparks />
      </div>
      <div className="about-copy">
        <p className="eyebrow">{en ? "BEYOND THE CODE" : "AU-DELÀ DU CODE"}</p>
        <h2>
          {en ? "Building your product." : "Développer votre produit."}
          <br />
          <span className="about-accent">
            {en ? "Understanding your business." : "Comprendre votre activité."}
          </span>
        </h2>
        <p>
          {en
            ? "I’m Dieudonné Houndagnon, a web developer based in Benin with over three years of experience. Whether you’re starting from scratch, redesigning or finishing an existing project, I focus on making your website easy to use and your offer easy to understand."
            : "Je suis Dieudonné Houndagnon, développeur web au Bénin avec plus de trois ans d’expérience. Je vous accompagne dans la création, la refonte ou la finalisation de votre projet, avec le même souci : rendre votre site agréable à utiliser et votre offre facile à comprendre."}
        </p>
        <p>
          {en ? "I’m also a co-founder of " : "Je suis aussi cofondateur de "}
          <a href="https://vibeango.com" className="text-link">
            VibenGo
          </a>
          {en
            ? ", where I handle marketing and acquisition. That experience shapes how I build: I consider what your visitors are looking for, what helps them take the next step and how your product fits into your business."
            : ", où je m’occupe du marketing et de l’acquisition. Cette expérience nourrit ma façon de développer : je m’intéresse à ce que vos visiteurs cherchent, à ce qui les aide à avancer et à la place de votre produit dans votre activité."}
        </p>
        <ul className="about-values">
          {(en
            ? [
                "Make your offer clear through design and content",
                "Refine the experience across mobile and desktop",
                "Pick up AI-generated code and finish the project",
              ]
            : [
                "Clarifier votre offre dans le design et les contenus",
                "Soigner les parcours sur mobile comme sur ordinateur",
                "Reprendre le code généré par l’IA et finaliser le projet",
              ]
          ).map((v, i) => (
            <li key={i}>
              <span aria-hidden="true">0{i + 1}</span>
              {v}
            </li>
          ))}
        </ul>
        <p className="hand signature">Dieudonné Houndagnon</p>
        <ButtonLink href="/contact">
          {en ? "Let’s talk about your project" : "Parlons de votre projet"} ↗
        </ButtonLink>
      </div>
    </section>
  );
}
