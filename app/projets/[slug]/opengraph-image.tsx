import { projects } from "@/lib/content";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Projet réalisé par Dieudonné Houndagnon, développeur Front-End";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return ogCard({
    kicker: p ? p.category.split(" · ")[0] : "Projet",
    title: p?.name ?? "Dicode",
    subtitle: p?.summary ?? "",
  });
}
