import Image from "next/image";
import {PortfolioMockup} from "./portfolio-mockup";
import {DashboardMockup, type Capture} from "./dashboard-mockup";
import {LayeredPageMockup} from "./layered-page-mockup";
import {PhotographicMockup} from "./photographic-mockup";
import {laptopPlates} from "@/lib/laptop-plates";
type MockupProject = {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  kind: string;
  secondaryImage?: Capture;
};
/** Each presentation keeps its supplied asset without an extra crop or frame. */
export function ProjectMockup({ project }: { project: MockupProject }) {
  if (project.slug === "dicode-portfolio") return <PortfolioMockup />;
  if (laptopPlates[project.slug]) return <PhotographicMockup project={project} plate={laptopPlates[project.slug]} />;
  if (project.slug === "rynva") return <DashboardMockup project={project} />;
  if (project.slug === "lexpo") return <LayeredPageMockup project={project} />;
  if (project.kind === "concept")
    return (
      <div className="project-art concept-art scene-original">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          sizes="(max-width:700px) 100vw, 50vw"
          className="project-image"
        />
      </div>
    );
  if (project.slug === "post" || project.slug === "gozem")
    return (
      <div className={`project-art presentation-mosaic${project.slug === "post" ? " post-presentation" : ""}`}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          sizes="(max-width:700px) 100vw, 50vw"
          className="project-image"
        />
      </div>
    );
  return (
    <div
      className={`project-art device-scene scene-${project.slug}${["mefolio", "rynva", "quebec-signature"].includes(project.slug) ? " scene-full-capture" : ""}`}
    >
      <span className="scene-orb" aria-hidden="true" />
      <div className="device-composition">
        <div className="device-chrome" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{project.name}</span>
          <b>↗</b>
        </div>
        <div
          className="device-screen"
          style={
            ["mefolio", "rynva", "quebec-signature"].includes(project.slug)
              ? {
                  aspectRatio: `${project.imageWidth} / ${project.imageHeight}`,
                }
              : undefined
          }
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            sizes="(max-width:700px) 100vw, 50vw"
            className="project-image"
          />
        </div>
        <div className="device-base" aria-hidden="true" />
      </div>
      <span className="scene-tag" aria-hidden="true">
        {project.name} / WEB
      </span>
    </div>
  );
}
