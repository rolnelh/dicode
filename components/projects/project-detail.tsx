"use client";

import Link from "next/link";
import { QuebecCaseStudy } from "./quebec-case-study";
import { GozemCaseStudy } from "./gozem-case-study";
import { ProjectPresentation } from "./project-presentation";
import { ProjectCraft } from "./project-craft";
import { ProjectGallery } from "./project-gallery";
import { gozemPresentationCaption } from "@/lib/project-presentations";
import type { Project } from "@/lib/content";
import { ProjectImage } from "@/components/sections/projects";
import { useLanguage } from "@/components/language-provider";
import { copy, getLocalizedProject } from "@/lib/localized-content";

export function ProjectDetail({ project }: { project: Project }) {
  const { language } = useLanguage();
  const text = copy[language].projects;
  const p = getLocalizedProject(project, language);
  return (
    <article className="detail wrap">
      <Link href="/#projets" className="text-link">
        {text.back}
      </Link>
      <p className="eyebrow mt-10">{p.category}</p>
      <h1>{p.name}</h1>
      <p className="detail-copy">{p.summary}</p>
      <ProjectImage project={p} />
      {p.slug === "gozem" && (
        <>
          <p className="presentation-caption">{gozemPresentationCaption[language]}</p>
          <a className="text-link capture-full-link" href={p.image} target="_blank" rel="noopener noreferrer">
            {language === "fr" ? "Ouvrir le mockup en grand" : "Open the full-size mockup"}
          </a>
        </>
      )}
      {["rynva", "mefolio", "lexpo"].includes(p.slug) && (
        <a
          className="text-link capture-full-link"
          href={p.image}
          target="_blank"
          rel="noopener noreferrer"
        >
          {language === "fr"
            ? "Voir la capture complète en grand"
            : "View the full-size screenshot"}
        </a>
      )}
      {p.kind === "concept" && (
        <p className="concept-disclaimer">{text.disclaimer}</p>
      )}
      {p.note && <p className="concept-disclaimer">{p.note}</p>}
      <div className="detail-tags">
        {p.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className="detail-copy">{p.description}</p>
      {p.slug === "lexpo" && <ProjectGallery project={p} language={language} />}
      <ProjectPresentation slug={p.slug} language={language} />
      <ProjectCraft slug={p.slug} language={language} />
      {p.slug === "quebec-signature" && <QuebecCaseStudy language={language} />}
      {p.slug === "gozem" && <GozemCaseStudy language={language} />}
      {p.slug !== "lexpo" && <ProjectGallery project={p} language={language} />}
      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          {text.discover} {p.name} ↗
        </a>
      )}
      <div className="mt-12">
        <Link href="/contact" className="text-link">
          {text.contact}
        </Link>
      </div>
    </article>
  );
}
