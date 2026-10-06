import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/content";
import { articles } from "@/lib/articles";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/contact",
    "/articles",
    ...projects.map((p) => `/projets/${p.slug}`),
    ...articles.map((a) => `/articles/${a.slug}`),
  ].map((path) => ({
    url: `${site.url}${path || "/"}`,
    changeFrequency: "monthly" as const,
    priority: path ? 0.7 : 1,
  }));
}
