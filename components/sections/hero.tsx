"use client";
// La section d'accueil (hero) : ton nom, ta photo au centre,
// tes réseaux à gauche, une citation et tes compétences à droite,
// puis une bande de mots qui défile.
// Les styles sont dans app/styles/hero.css
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { BrandIcon, type BrandName } from "@/components/ui/brand-icon";
import { Sparks } from "@/components/ui/decorations";
import { site } from "@/lib/site";

// Tes réseaux sociaux (les icônes sont dans public/icons).
const socials: { name: BrandName; label: string; href: string }[] = [
  { name: "linkedin", label: "LinkedIn", href: site.linkedin },
  { name: "github", label: "GitHub", href: site.github },
  { name: "dribbble", label: "Dribbble", href: site.dribbble },
  { name: "threads", label: "Threads", href: site.threads },
];

export function Hero() {
  const { language } = useLanguage();
  const en = language === "en";

  // Les petites étiquettes à droite de la photo.
  const skills = en
    ? ["Next.js", "React", "UI Design", "Redesign", "SaaS"]
    : ["Next.js", "React", "Design UI", "Refonte", "SaaS"];

  // Les mots qui défilent dans la bande sombre.
  const marquee = en
    ? ["Showcase websites", "Redesign", "SaaS dashboards", "Mobile apps", "Next.js"]
    : ["Sites vitrines", "Refonte", "Dashboards SaaS", "Apps mobiles", "Next.js"];

  return (
    <section className="hero-v2">
      <div className="hero-v2-inner wrap">
        {/* 1. Le titre */}
        <div className="hero-v2-top">
          <p className="hero-v2-badge">
            {en ? "Web developer based in Benin" : "Développeur web basé au Bénin"}
          </p>
          <h1>
            {en ? "I’m " : "Je suis "}
            <span className="name">Dieudonné</span>
            <Sparks />
          </h1>
          <p className="hero-v2-subtitle">
            {en
              ? "I create, rethink and finish your website."
              : "Je crée, repense et finalise votre site."}
          </p>

          {/* Le badge rond qui tourne (lien vers la prise de rendez-vous) */}
          <a href={site.booking} className="hero-v2-round" aria-label={en ? "Book a call" : "Réserver un appel"}>
            <svg className="round-text" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="circle-text" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text>
                <textPath href="#circle-text">
                  {en ? "BOOK A CALL • BOOK A CALL • " : "RÉSERVER UN APPEL • DICODE • "}
                </textPath>
              </text>
            </svg>
            <span className="round-arrow">
              <ArrowUpRight size={20} />
            </span>
          </a>
        </div>

        {/* 2. La photo au centre, avec une colonne de chaque côté */}
        <div className="hero-v2-middle">
          <div className="hero-v2-left">
            <p className="hero-v2-label">{en ? "Follow me" : "Me suivre"}</p>
            <div className="hero-v2-socials">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <BrandIcon name={s.name} />
                </a>
              ))}
            </div>
            <p className="hero-v2-stat">
              <strong>3+ {en ? "years" : "ans"}</strong>
              {en ? "building for the web" : "de développement web"}
            </p>
          </div>

          <div className="hero-v2-photo">
            <span className="hero-v2-circle" aria-hidden="true" />
            <Image
              src="/images/hero/dieudonne-portrait.webp"
              alt="Dieudonné Houndagnon"
              width={1024}
              height={1386}
              priority
              sizes="(max-width: 700px) 90vw, 400px"
            />
            <div className="hero-v2-buttons">
              <a href="#projets" className="btn-purple">
                {en ? "Projects" : "Projets"} <ArrowRight size={18} />
              </a>
              <a href={site.booking} className="btn-white">
                {en ? "Book a call" : "Réserver un appel"}
              </a>
            </div>
          </div>

          <div className="hero-v2-right">
            <p className="hero-v2-quote">
              <span aria-hidden="true">“</span>
              {en ? "Code, with purpose." : "Du code, avec du sens."}
            </p>
            <p className="hero-v2-text">
              {en
                ? "Thoughtful design, solid development and clear paths to your users."
                : "Design soigné, développement solide et parcours clairs pour vos utilisateurs."}
            </p>
            <ul className="hero-v2-skills">
              {skills.map((skill, i) => (
                <li key={skill} className={i % 2 === 0 ? "dark" : "light"}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. La bande qui défile. La liste est répétée 2 fois pour une boucle sans coupure. */}
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
