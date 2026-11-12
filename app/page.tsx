import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { About } from "@/components/sections/about";
import { ArticleList } from "@/components/articles/article-list";
import { articleCards } from "@/lib/articles";
import { homeSeo, jsonLd, profilePageSchema } from "@/lib/seo";

// Le titre et la description Google viennent de lib/seo.ts (via app/layout.tsx).
export const metadata: Metadata = {
  title: { absolute: homeSeo.title },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <About />
      {/* Seuls les titres des articles partent dans le navigateur, pas leur texte complet. */}
      <ArticleList compact cards={articleCards()} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(profilePageSchema()) }} />
    </>
  );
}
