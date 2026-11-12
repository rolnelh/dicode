import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { ProjectDetail } from "@/components/projects/project-detail";
import { breadcrumbSchema, jsonLd, projectSchema, projectSeo } from "@/lib/seo";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
// L'image de partage de chaque projet est générée par opengraph-image.tsx (même dossier).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  const { title, description } = projectSeo(p);
  return {
    title,
    description,
    alternates: { canonical: `/projets/${p.slug}` },
    openGraph: {
      type: "article",
      title: `${p.name} | Dicode`,
      description,
      url: `/projets/${p.slug}`,
    },
    twitter: { title: `${p.name} | Dicode`, description },
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const json = jsonLd(
    projectSchema(p, p.cover ?? p.image),
    breadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: p.name, path: `/projets/${p.slug}` },
    ]),
  );
  return (
    <>
      <ProjectDetail project={p} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
    </>
  );
}
