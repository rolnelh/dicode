import type { Metadata } from "next";
import { socialImage } from "@/lib/social-image";
import { ArticleList } from "@/components/articles/article-list";
import { articleCards } from "@/lib/articles";
export const metadata: Metadata = {
  title: "Articles · Qualité web, QA et développement Front-End",
  description:
    "Guides pratiques de Dieudonné Houndagnon, développeur Front-End : tests QA avant mise en ligne, VibenGo et création de sites web avec ou sans IA.",
  alternates: { canonical: "/articles" },
  twitter: {
    title: "Articles | Dicode",
    description:
      "Guides et perspectives sur le QA, VibenGo et le développement web.",
  },
  openGraph: {
    title: "Articles | Dicode",
    description:
      "Qualité web, VibenGo et développement : des repères pratiques.",
    url: "/articles",
    images: [socialImage],
  },
};
export default function Articles() {
  return <ArticleList cards={articleCards()} />;
}
