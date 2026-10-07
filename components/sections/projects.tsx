"use client";
import { ProjectMockup } from "@/components/projects/project-mockup";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { projects, type Project } from "@/lib/content";
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
function ProjectCard({ project, mobile = false }: { project: Project; mobile?: boolean }) {
  const Heading = mobile ? "h4" : "h3";
  return (
    <Link className="project-card" href={`/projets/${project.slug}`}>
      <ProjectImage project={project} />
      <div className="project-meta">
        <div>
          <Heading>{project.name}</Heading>
          <p>{project.category}</p>
        </div>
        <span className="circle-arrow">
          <ArrowUpRight size={22} />
        </span>
      </div>
    </Link>
  );
}
export function Projects() {
  const { language } = useLanguage();
  const text = copy[language].projects;
  const localizedProjects = projects.map((project) =>
    getLocalizedProject(project, language),
  );
  const webProjects = localizedProjects.filter((project) => project.platform !== "mobile");
  const mobileProjects = localizedProjects.filter((project) => project.platform === "mobile");
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
        {webProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {mobileProjects.length > 0 && (
        <section id="projets-mobiles" className="mobile-projects section-anchor" aria-labelledby="mobile-projects-title">
          <h3 id="mobile-projects-title">{text.mobileTitle}</h3>
          <div className="project-grid">
            {mobileProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} mobile />
            ))}
          </div>
        </section>
      )}
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
