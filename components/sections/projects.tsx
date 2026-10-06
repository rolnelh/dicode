"use client";
import { ProjectMockup } from "@/components/projects/project-mockup";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { projects } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";
import { copy, getLocalizedProject } from "@/lib/localized-content";
import { Sparks } from "@/components/ui/decorations";
export function ProjectImage({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return <ProjectMockup project={project} />;
}
export function Projects() {
  const { language } = useLanguage();
  const text = copy[language].projects;
  const localizedProjects = projects.map((project) =>
    getLocalizedProject(project, language),
  );
  return (
    <section id="projets" className="projects wrap section-anchor">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>
            {text.title}
            <Sparks />
          </h2>
        </div>
        <span className="hand">{text.hand}</span>
      </div>
      <div className="project-grid">
        {localizedProjects.map((p) => (
          <Link
            className="project-card"
            key={p.slug}
            href={`/projets/${p.slug}`}
          >
            <ProjectImage project={p} />
            <div className="project-meta">
              <div>
                <h3>{p.name}</h3>
                <p>{p.category}</p>
              </div>
              <span className="circle-arrow">
                <ArrowUpRight size={22} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="project-bottom">
        <p>
          {text.bottom[0]}
          <br />
          {text.bottom[1]}
        </p>
        <Link className="orbit-cta" href="/contact">
          <MessageCircle size={24} />
          <span>
            {text.question}
            <br />
            <strong>{text.talk}</strong>
          </span>
        </Link>
      </div>
    </section>
  );
}
