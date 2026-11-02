"use client";
// La section "À propos" : ta photo à gauche, ton parcours et ta façon de travailler à droite.
// Les styles sont dans app/styles/about.css
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function About() {
  const { language } = useLanguage();
  const en = language === "en";

  // Les chiffres et repères affichés sous le texte.
  const facts = en
    ? [
        { value: "3+ years", label: "building for the web" },
        { value: "Benin", label: "where I’m based" },
        { value: "Next.js · React · Laravel", label: "my everyday tools" },
      ]
    : [
        { value: "3+ ans", label: "de développement web" },
        { value: "Bénin", label: "là où je suis basé" },
        { value: "Next.js · React · Laravel", label: "mes outils au quotidien" },
      ];

  // Ce que j'apporte, en 3 points.
  const values = en
    ? [
        "A clear offer, in the design and in the content",
        "Pages that work just as well on mobile and desktop",
        "AI-generated code picked up, fixed and finished",
      ]
    : [
        "Une offre claire, dans le design comme dans les textes",
        "Des pages qui fonctionnent aussi bien sur mobile que sur ordinateur",
        "Du code généré par l’IA repris, corrigé et finalisé",
      ];

  return (
    <section id="a-propos" className="ab wrap section-anchor">
      <div className="ab-photo">
        <Image src="/images/hero/dieudonne-portrait.webp" alt="Dieudonné Houndagnon" width={1024} height={1386} sizes="(max-width: 700px) 70vw, 340px" />
      </div>

      <div className="ab-text">
        <h2>
          {en ? "Building your product, " : "Développer votre produit, "}
          <span>{en ? "understanding your business." : "comprendre votre activité."}</span>
        </h2>
        <p>
          {en
            ? "I’m Dieudonné Houndagnon, a web developer based in Benin with over three years of experience. I build showcase websites, landing pages and SaaS interfaces, mainly with Next.js, React and Laravel."
            : "Je suis Dieudonné Houndagnon, développeur web basé au Bénin, avec plus de trois ans d’expérience. Je réalise des sites vitrines, des landing pages et des interfaces SaaS, principalement avec Next.js, React et Laravel."}
        </p>
        <p>
          {en
            ? "Whether you’re starting from scratch, redesigning an existing site or finishing a project started with AI, I work the same way: understand what your visitors are looking for, make your offer easy to grasp, then deliver a fast, reliable website that you can actually use."
            : "Que vous partiez de zéro, que vous vouliez repenser un site existant ou finaliser un projet commencé avec l’IA, je travaille de la même façon : comprendre ce que vos visiteurs cherchent, rendre votre offre facile à saisir, puis livrer un site rapide et fiable que vous pouvez vraiment utiliser."}
        </p>

        <ul className="ab-values">
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>

        <dl className="ab-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
        </dl>

        <Link href="/contact" className="ab-button">
          {en ? "Let’s talk about your project ↗" : "Parlons de votre projet ↗"}
        </Link>
      </div>
    </section>
  );
}
