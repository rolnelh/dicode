import type { CSSProperties } from "react";
import type { Language } from "@/components/language-provider";
import { projectCraft } from "@/lib/project-craft";

const labels = {
  fr: {
    eyebrow: "LE PROJET EN DÉTAIL",
    title: "Du parti pris à l’interface.",
    role: "Mon rôle",
    design: "Choix de conception",
    stack: "Stack technique",
    typography: "Typographies",
    palette: "Palette de couleurs",
    sources: "Sources du projet",
  },
  en: {
    eyebrow: "INSIDE THE PROJECT",
    title: "From direction to interface.",
    role: "My role",
    design: "Design choices",
    stack: "Technology stack",
    typography: "Typography",
    palette: "Colour palette",
    sources: "Project sources",
  },
};

export function ProjectCraft({ slug, language }: { slug: string; language: Language }) {
  const project = projectCraft[slug];
  if (!project) return null;
  const t = labels[language];
  const details = project.copy[language];
  return (
    <section className="project-craft" aria-labelledby="craft-heading">
      <header className="craft-heading">
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 id="craft-heading">{t.title}</h2>
      </header>
      <div className="craft-overview">
        <section className="craft-role" aria-labelledby="craft-role-title">
          <h3 id="craft-role-title">{t.role}</h3>
          <p className="craft-role-value">{details.role}</p>
          {details.roleNote && <p className="craft-note">{details.roleNote}</p>}
        </section>
        <section className="craft-stack" aria-labelledby="craft-stack-title">
          <h3 id="craft-stack-title">{details.stackTitle || t.stack}</h3>
          <ul className="craft-tech-list">
            {project.technologies.map((tech) => <li key={tech}>{tech}</li>)}
          </ul>
          {details.stackNote && <p className="craft-note">{details.stackNote}</p>}
        </section>
      </div>
      <section className="craft-process" aria-labelledby="craft-process-title">
        <h3 id="craft-process-title">{t.design}</h3>
        <ol>
          {details.design.map((choice, index) => (
            <li key={choice.title}>
              <span className="craft-step" aria-hidden="true">0{index + 1}</span>
              <div><h4>{choice.title}</h4><p>{choice.text}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <div className={`craft-visual-system${project.fonts.length ? "" : " craft-palette-only"}`}>
        {project.fonts.length > 0 && <section className="craft-typography" aria-labelledby="craft-type-title">
          <h3 id="craft-type-title">{t.typography}</h3>
          {project.fonts.map((font) => (
            <div className="craft-font" key={font.name}>
              <div><strong>{font.name}</strong><p>{font.usage[language]}</p></div>
            </div>
          ))}
          {details.fontNote && <p className="craft-note">{details.fontNote}</p>}
        </section>}
        <section className="craft-palette" aria-labelledby="craft-palette-title">
          <h3 id="craft-palette-title">{t.palette}</h3>
          <ul>
            {project.palette.map((colour) => (
              <li key={colour.hex}>
                <span className="craft-swatch" style={{ "--swatch": colour.hex } as CSSProperties} aria-hidden="true" />
                <strong>{colour.hex}</strong><span>{colour.name[language]}</span>
              </li>
            ))}
          </ul>
          <p className="craft-note">{details.paletteNote}</p>
          {project.fonts.length === 0 && details.fontNote && <p className="craft-note">{details.fontNote}</p>}
        </section>
      </div>
      {project.sources.length > 0 && (
        <nav className="craft-sources" aria-label={t.sources}>
          <span>{t.sources}</span>
          {project.sources.map((source) => <a className="text-link" href={source.url} key={source.url} target="_blank" rel="noopener noreferrer">{source.label[language]}</a>)}
        </nav>
      )}
    </section>
  );
}
