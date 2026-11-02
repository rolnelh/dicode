"use client";
// La section "Projets" : un carrousel qui montre un projet à la fois.
// On change de projet avec les flèches ou les petits points.
// Les projets eux-mêmes sont dans lib/content.ts
// Les styles sont dans app/styles/projects.css
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectMockup } from "@/components/projects/project-mockup";
import { projects, type Project } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";
import { copy, getLocalizedProject } from "@/lib/localized-content";

// Utilisé par la page de détail d'un projet (app/projets/[slug]).
export function ProjectImage({ project }: { project: Project }) {
  return <ProjectMockup project={project} />;
}

export function Projects() {
  const { language } = useLanguage();
  const en = language === "en";
  const text = copy[language].projects;
  const list = projects.map((project) => getLocalizedProject(project, language));

  // "current" = la position du projet affiché dans la liste.
  const [current, setCurrent] = useState(0);
  const total = list.length;

  // Le "+ total" et le "% total" permettent de revenir au début après le dernier projet.
  const goTo = (index: number) => setCurrent((index + total) % total);
  const previous = list[(current - 1 + total) % total];
  const project = list[current];
  const next = list[(current + 1) % total];

  return (
    <section id="projets" className="projects-v2 section-anchor">
      <div className="projects-v2-box wrap">
        <p className="projects-v2-pill">
          <span className="dot" /> {text.eyebrow}
        </p>
        <h2>{text.title}</h2>

        <div className="carousel">
          {/* Aperçu du projet précédent (à gauche) */}
          <button type="button" className="peek peek-left" onClick={() => goTo(current - 1)} aria-label={`${en ? "Previous project" : "Projet précédent"} : ${previous.name}`}>
            <Image src={previous.cover ?? previous.image} alt="" width={400} height={300} />
          </button>

          {/* Le projet affiché */}
          <article className="slide" key={project.slug}>
            <div className="slide-image">
              <Image
                src={project.cover ?? project.image}
                alt={project.imageAlt}
                width={900}
                height={700}
                sizes="(max-width: 800px) 90vw, 420px"
              />
            </div>
            <div className="slide-text">
              <p className="slide-category">{project.category}</p>
              <h3>{project.name}</h3>
              <p className="slide-summary">{project.summary}</p>
              <Link href={`/projets/${project.slug}`} className="slide-link">
                {text.discover} <ArrowUpRight size={16} />
              </Link>
              <ul className="slide-tags">
                {project.tags.slice(0, 3).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>

          {/* Aperçu du projet suivant (à droite) */}
          <button type="button" className="peek peek-right" onClick={() => goTo(current + 1)} aria-label={`${en ? "Next project" : "Projet suivant"} : ${next.name}`}>
            <Image src={next.cover ?? next.image} alt="" width={400} height={300} />
          </button>

          <button type="button" className="arrow arrow-left" onClick={() => goTo(current - 1)} aria-label={en ? "Previous project" : "Projet précédent"}>
            <ArrowLeft size={18} />
          </button>
          <button type="button" className="arrow arrow-right" onClick={() => goTo(current + 1)} aria-label={en ? "Next project" : "Projet suivant"}>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Les petits points : un par projet */}
        <div className="dots">
          {list.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              className={i === current ? "active" : ""}
              onClick={() => goTo(i)}
              aria-label={p.name}
              aria-current={i === current}
            />
          ))}
        </div>

        <Link href="/contact" className="projects-v2-cta">
          {text.question} {text.talk}
        </Link>
      </div>
    </section>
  );
}
