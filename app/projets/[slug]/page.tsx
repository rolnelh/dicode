import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { ProjectDetail } from "@/components/projects/project-detail";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} · ${p.category}`,
    description: p.summary,
    alternates: { canonical: `/projets/${p.slug}` },
    openGraph: {
      title: `${p.name} | Dicode`,
      description: p.summary,
      url: `/projets/${p.slug}`,
    },
    twitter: { title: `${p.name} | Dicode`, description: p.summary },
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
  return <ProjectDetail project={p} />;
}
