import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/content";
import { articles } from "@/lib/articles";
export const dynamic = "force-static";

const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);
// Date du dernier article publié ou mis à jour : sert de date pour les pages qui les listent.
const latestArticle = articles
  .map((a) => a.updatedAt ?? a.publishedAt)
  .sort()
  .at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: latestArticle,
      images: ["/images/hero/forma.webp", "/images/hero/milka.webp", "/images/hero/essor.webp"].map(abs),
    },
    { url: `${site.url}/contact` },
    { url: `${site.url}/articles`, lastModified: latestArticle },
    // Chaque projet avec ses visuels : ils peuvent apparaître dans Google Images.
    ...projects.map((p) => ({
      url: `${site.url}/projets/${p.slug}`,
      images: [p.cover ?? p.image, ...(p.gallery ?? []).map((g) => g.image)]
        .filter((src) => !src.endsWith(".svg"))
        .map(abs),
    })),
    ...articles.map((a) => ({
      url: `${site.url}/articles/${a.slug}`,
      lastModified: a.updatedAt ?? a.publishedAt,
    })),
  ];
}
