import Image from "next/image";
import type { Language } from "@/components/language-provider";
import { projectPresentations } from "@/lib/project-presentations";

export function ProjectPresentation({ slug, language }: { slug: string; language: Language }) {
  const visual = projectPresentations[slug];
  if (!visual) return null;
  const t = visual.copy[language];
  return (
    <section className="project-presentation" aria-labelledby="presentation-heading">
      <h2 id="presentation-heading">{t.title}</h2>
      <figure>
        <a href={visual.image} target="_blank" rel="noopener noreferrer" aria-label={language === "fr" ? "Ouvrir le mockup en grand" : "Open the full-size mockup"}>
          <Image src={visual.image} alt={t.alt} width={visual.width} height={visual.height} sizes="(max-width: 700px) 100vw, 920px" />
        </a>
        <a className="text-link presentation-full-link" href={visual.image} target="_blank" rel="noopener noreferrer">
          {language === "fr" ? "Voir le mockup en pleine résolution" : "View the full-resolution mockup"}
        </a>
        <figcaption>{t.caption}</figcaption>
      </figure>
    </section>
  );
}
