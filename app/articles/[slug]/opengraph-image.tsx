import { articles } from "@/lib/articles";
import { ogCard, ogSize } from "@/lib/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Article de Dieudonné Houndagnon, développeur Front-End";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return ogCard({
    kicker: a?.fr.category ?? "Article",
    title: a?.fr.title ?? "Dicode",
    subtitle: a?.fr.description ?? "",
  });
}
