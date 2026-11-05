"use client";
// La section "Projets récents" : une rangée de cartes qui défile.
// Chaque carte : l'image du projet, ses étiquettes dans une encoche en haut
// à droite, un bouton flèche dans une encoche en bas à droite, puis le nom.
// Les projets eux-mêmes sont dans lib/content.ts
// Les styles sont dans app/styles/projects.css
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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
  const row = useRef<HTMLUListElement>(null);

  // Fait défiler la rangée d'une carte vers la gauche (-1) ou la droite (1).
  const scroll = (direction: number) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section id="projets" className="pj section-anchor">
      <div className="wrap">
        <div className="pj-head">
          <h2>{text.title}</h2>
          <div className="pj-arrows">
            <button type="button" onClick={() => scroll(-1)} aria-label={en ? "Previous projects" : "Projets précédents"}>
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label={en ? "Next projects" : "Projets suivants"}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <ul className="pj-row" ref={row}>
          {list.map((project) => (
            <li key={project.slug} className="pj-card">
              <div className="pj-media">
                <Link href={`/projets/${project.slug}`} tabIndex={-1} aria-hidden="true">
                  <Image
                    src={project.cover ?? project.image}
                    alt=""
                    width={900}
                    height={700}
                    sizes="(max-width: 700px) 82vw, 380px"
                  />
                </Link>
                {/* Les étiquettes, dans l'encoche du haut */}
                <ul className="pj-tags">
                  {project.tags.slice(0, 2).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                {/* Le bouton flèche, dans l'encoche du bas */}
                <span className="pj-go">
                  <Link href={`/projets/${project.slug}`} aria-label={`${text.discover} : ${project.name}`}>
                    <ArrowUpRight size={20} />
                  </Link>
                </span>
              </div>
              <h3>
                <Link href={`/projets/${project.slug}`}>{project.name}</Link>
              </h3>
              <p>{project.category}</p>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="pj-cta">
          {text.question} {text.talk}
        </Link>
      </div>
    </section>
  );
}
