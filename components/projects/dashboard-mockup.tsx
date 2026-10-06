import Image from 'next/image';
export type Capture = { image: string; imageAlt: string; imageWidth: number; imageHeight: number };
/** Flat, rounded application canvas, matching the supplied dashboard reference. */
export function DashboardMockup({ project }: { project: Capture & {slug: string;name: string} }) {
 return <div className={`project-art dashboard-mockup dashboard-mockup-${project.slug}`}>
  <span className="dashboard-backdrop-shape shape-one" aria-hidden="true" />
  <span className="dashboard-backdrop-shape shape-two" aria-hidden="true" />
  <div className="dashboard-canvas">
   <Image src={project.image} alt={project.imageAlt} width={project.imageWidth} height={project.imageHeight} sizes="(max-width:700px) 100vw, 70vw" className="dashboard-capture" />
  </div>
 </div>;
}
