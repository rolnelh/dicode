import type { Metadata } from "next";
import { socialImage } from "@/lib/social-image";
import { ArticleList } from "@/components/articles/article-list";
export const metadata: Metadata = {
  title: "Articles · QA, VibenGo et développement web",
  description:
    "Guides et perspectives sur les tests QA, VibenGo et la création de sites web avec ou sans IA.",
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
  return <ArticleList />;
}
