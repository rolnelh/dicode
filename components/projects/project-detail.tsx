"use client";
// La page détail d'un projet, en 2 parties :
//   1. Pourquoi ce projet : le texte à gauche (+ petite image), une grande image à droite.
//   2. Comment je l'ai conçu : un carrousel d'étapes, chacune avec une image.
// Les textes viennent de lib/content.ts (description) et lib/project-craft.ts (étapes).
// Les styles sont dans app/styles/project-detail.css
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { projectCraft } from "@/lib/project-craft";
import { useLanguage } from "@/components/language-provider";
import { copy, getLocalizedProject } from "@/lib/localized-content";

export function ProjectDetail({ project }: { project: Project }) {
  const { language } = useLanguage();
  const en = language === "en";
  const text = copy[language].projects;
  const p = getLocalizedProject(project, language);

  // Toutes les images du projet, sans doublon (et sans le logo .svg).
  // On écarte les captures de page entière très hautes : affichées en entier, elles seraient minuscules.
  const isTooTall = (width: number, height: number) => height > width * 2;
  const allImages = [
    p.cover,
    isTooTall(p.imageWidth, p.imageHeight) ? undefined : p.image,
    ...(p.gallery ?? []).filter((view) => !isTooTall(view.imageWidth, view.imageHeight)).map((view) => view.image),
  ];
  const images = allImages.filter(
    (src, i): src is string => !!src && !src.endsWith(".svg") && allImages.indexOf(src) === i,
  );
  const bigImage = images[0];
  const smallImage = images[1] ?? images[0];

  // Les étapes : les 3 "choix de conception" du projet.
  const steps = projectCraft[p.slug]?.copy[language].design ?? [];
  const [current, setCurrent] = useState(0);
  const goTo = (index: number) => setCurrent((index + steps.length) % steps.length);
  const step = steps[current];
  // Chaque étape prend une image différente (on reboucle si il y en a moins que d'étapes).
  const stepImage = images[(current + 1) % images.length];

  return (
    <article className="pd">
      {/* ===== 1. Pourquoi ce projet ===== */}
      <section className="pd-card wrap">
        <Link href="/#projets" className="pd-back">
          {text.back}
        </Link>

        <div className="pd-intro">
          <div className="pd-intro-text">
            <p className="pd-category">{p.category}</p>
            <h1>{p.name}</h1>
            <p className="pd-lead">{p.summary}</p>
            <p className="pd-description">{p.description}</p>

            <div className="pd-actions">
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="pd-button">
                  {en ? "Visit the website" : "Voir le site"} <ArrowUpRight size={16} />
                </a>
              )}
              <ul className="pd-tags">
                {p.tags.slice(0, 3).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="pd-small-image">
              <Image src={smallImage} alt="" width={600} height={400} sizes="240px" />
            </div>
          </div>

          <div className="pd-big-image">
            <Image src={bigImage} alt={p.imageAlt} width={1200} height={900} priority sizes="(max-width: 800px) 100vw, 560px" />
          </div>
        </div>
      </section>

      {/* ===== 2. Comment je l'ai conçu ===== */}
      {step && (
        <section className="pd-steps wrap">
          <h2>
            {en ? "How I built it, in " : "Comment je l’ai conçu, en "}
            {steps.length} {en ? "steps" : "étapes"}
          </h2>

          <div className="pd-step">
            <div className="pd-step-text" key={step.title}>
              <span className="pd-step-number">0{current + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            <div className="pd-step-image">
              <Image src={stepImage} alt="" width={1200} height={800} sizes="(max-width: 800px) 100vw, 700px" />
            </div>
          </div>

          <div className="pd-steps-bottom">
            <div className="pd-nav">
              <button type="button" onClick={() => goTo(current - 1)} aria-label={en ? "Previous step" : "Étape précédente"}>
                <ArrowLeft size={16} />
              </button>
              <button type="button" className="dark" onClick={() => goTo(current + 1)} aria-label={en ? "Next step" : "Étape suivante"}>
                <ArrowRight size={16} />
              </button>
            </div>
            <Link href="/contact" className="pd-contact">
              {text.contact}
            </Link>
          </div>
        </section>
      )}

      {/* Petite précision honnête si le projet en a une (maquette, refonte non officielle…) */}
      {p.note && <p className="pd-note wrap">{p.note}</p>}
    </article>
  );
}
