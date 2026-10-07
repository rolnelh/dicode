import Image from "next/image";
import type { Language } from "@/components/language-provider";
import type { Project } from "@/lib/content";

export function ProjectGallery({ project, language }: { project: Project; language: Language }) {
  if (!project.gallery?.length) return null;
  const isExpo = project.slug === "lexpo";
  const isPost = project.slug === "post";
  const french = language === "fr";
  const headingId = `${project.slug}-gallery-title`;

  return (
    <section
      className={`project-gallery${isExpo ? " project-gallery-pages" : ""}${isPost ? " project-gallery-post" : ""}`}
      aria-labelledby={headingId}
    >
      <h2 id={headingId}>
        {isExpo
          ? french ? "De la découverte à l’espace artisan." : "From discovery to the artisan workspace."
          : french ? "Le projet, dans les détails." : "A closer look at the project."}
      </h2>
      {isExpo && (
        <p className="project-gallery-intro">
          {french
            ? "Les pages de L’Expo, capturées directement sur le site. Chaque vue peut être ouverte en grand pour en lire les détails."
            : "L’Expo pages, captured directly from the website. Open any view at full size to explore the details."}
        </p>
      )}
      {project.gallery.map((view, index) => {
        const title = french ? view.title : view.titleEn;
        const fullImage = view.fullImage || view.image;
        const openLabel = isPost
          ? french ? "Ouvrir la maquette en grand" : "Open the full-size mockup"
          : view.fullImage
          ? french ? "Ouvrir la page complète en grand" : "Open the full-page screenshot"
          : french ? "Ouvrir la capture en grand" : "Open the full-size screenshot";
        return (
          <figure key={view.image}>
            {title && (
              <div className="project-gallery-view-heading">
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
              </div>
            )}
            <a
              className="project-gallery-image-link"
              href={fullImage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${openLabel}${title ? ` : ${title}` : ""}`}
            >
              <Image
                src={view.image}
                alt={french ? view.imageAlt : view.imageAltEn}
                width={view.imageWidth}
                height={view.imageHeight}
                sizes="(max-width: 700px) 100vw, (max-width: 1200px) 92vw, 1120px"
              />
            </a>
            <figcaption>
              <span>{french ? view.caption : view.captionEn}</span>
              {isExpo && (
                <span className="project-gallery-actions">
                  <a href={fullImage} target="_blank" rel="noopener noreferrer">{openLabel}</a>
                  {view.sourceUrl && (
                    <a href={view.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {french ? "Voir la page" : "Visit the page"}
                    </a>
                  )}
                </span>
              )}
            </figcaption>
          </figure>
        );
      })}
    </section>
  );
}
