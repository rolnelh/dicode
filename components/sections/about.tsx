"use client";
// La section "À propos", en fiche de présentation :
// la photo à gauche, une carte d'identité à droite (citation, nom, repères),
// puis trois cartes : ce que j'apporte, mes langages et outils, ce que je réalise.
// Les icônes des langages sont dans public/icons (voir ATTRIBUTION.md).
// Les styles sont dans app/styles/about.css
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Quote } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

// Les langages et outils affichés avec leur icône (fichiers public/icons/<icon>.svg).
const stack = [
  { icon: "nextdotjs", name: "Next.js" },
  { icon: "react", name: "React" },
  { icon: "typescript", name: "TypeScript" },
  { icon: "javascript", name: "JavaScript" },
  { icon: "tailwindcss", name: "Tailwind CSS" },
  { icon: "laravel", name: "Laravel" },
  { icon: "php", name: "PHP" },
  { icon: "mysql", name: "MySQL" },
  { icon: "supabase", name: "Supabase" },
  { icon: "figma", name: "Figma" },
];

export function About() {
  const { language } = useLanguage();
  const en = language === "en";

  // Les repères de la carte d'identité.
  const facts = en
    ? [
        { label: "Experience", value: "3+ years" },
        { label: "Based in", value: "Benin" },
        { label: "Languages", value: "French, English" },
        { label: "Work", value: "Remote, worldwide" },
      ]
    : [
        { label: "Expérience", value: "3+ ans" },
        { label: "Basé au", value: "Bénin" },
        { label: "Langues", value: "Français, anglais" },
        { label: "Travail", value: "À distance, partout" },
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

  // Ce que je réalise.
  const work = en
    ? ["Showcase websites", "Landing pages", "SaaS interfaces", "Redesigns", "Dashboards", "Mobile apps"]
    : ["Sites vitrines", "Landing pages", "Interfaces SaaS", "Refontes", "Dashboards", "Apps mobiles"];

  return (
    <section id="a-propos" className="ab section-anchor">
      <div className="wrap">
        <div className="ab-head">
          <h2>
            {en ? "Building your product, " : "Développer votre produit, "}
            <span>{en ? "understanding your business." : "comprendre votre activité."}</span>
          </h2>
        </div>

        <div className="ab-grid">
          {/* La photo */}
          <div className="ab-photo">
            <Image
              src="/images/hero/dieudonne-portrait.webp"
              alt="Dieudonné Houndagnon"
              width={1024}
              height={1386}
              sizes="(max-width: 800px) 90vw, 560px"
            />
          </div>

          {/* La carte d'identité */}
          <div className="ab-card ab-id">
            <p className="ab-quote">
              <Quote size={18} aria-hidden="true" />
              {en
                ? "Understand what your visitors are looking for, make your offer easy to grasp, then deliver a fast, reliable product."
                : "Comprendre ce que vos visiteurs cherchent, rendre votre offre facile à saisir, puis livrer un produit rapide et fiable."}
            </p>

            <div className="ab-person">
              <Image src="/images/hero/dieudonne-portrait.webp" alt="" width={1024} height={1386} sizes="52px" />
              <div>
                <strong>Dieudonné Houndagnon</strong>
                <span>{en ? "Web developer & UI designer" : "Développeur web & designer UI"}</span>
              </div>
            </div>

            <dl className="ab-facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="ab-bio">
              {en
                ? "I build showcase websites, landing pages and SaaS interfaces, mainly with Next.js, React and Laravel. Whether you’re starting from scratch, redesigning or finishing a project started with AI."
                : "Je réalise des sites vitrines, des landing pages et des interfaces SaaS, principalement avec Next.js, React et Laravel. Que vous partiez de zéro, repensiez l’existant ou finalisiez un projet commencé avec l’IA."}
            </p>

            <Link href="/contact" className="ab-button">
              {en ? "Let’s talk about your project" : "Parlons de votre projet"} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Les trois cartes du bas */}
        <div className="ab-bottom">
          <div className="ab-card ab-values">
            <h3>{en ? "What I bring" : "Ce que j’apporte"}</h3>
            <ul>
              {values.map((value) => (
                <li key={value}>
                  <span aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  {value}
                </li>
              ))}
            </ul>
          </div>

          <div className="ab-card ab-stack">
            <h3>{en ? "Languages & tools" : "Langages & outils"}</h3>
            <ul>
              {stack.map((tool) => (
                <li key={tool.icon}>
                  <Image src={`/icons/${tool.icon}.svg`} alt="" width={20} height={20} />
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="ab-card ab-work">
            <h3>{en ? "What I build" : "Ce que je réalise"}</h3>
            <ul>
              {work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
