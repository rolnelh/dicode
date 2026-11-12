"use client";
// La liste des articles (sur l'accueil en version courte, et sur la page /articles).
// Chaque carte : une image, une petite étiquette de catégorie, le titre.
// Les articles sont dans lib/articles.ts ; la page passe seulement leurs titres (articleCards).
// Les styles sont dans app/styles/articles.css
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import type { ArticleCard } from "@/lib/articles";
import { ArticleIllustration } from "./article-illustration";

export function ArticleList({ compact = false, cards }: { compact?: boolean; cards: ArticleCard[] }) {
  const { language } = useLanguage();
  const en = language === "en";
  // Sur l'accueil le titre de section est un h2, sur la page /articles c'est le h1.
  const CardHeading = compact ? "h3" : "h2";

  return (
    <section className={`blog wrap ${compact ? "blog-home" : "blog-page"}`}>
      <div className="blog-head">
        {compact ? (
          <h2>{en ? "Building is only the beginning." : "Créer n’est que le début."}</h2>
        ) : (
          <h1>{en ? "Ideas worth putting into practice." : "Des idées à mettre en pratique."}</h1>
        )}
        {compact && (
          <Link className="blog-all" href="/articles">
            {en ? "All articles" : "Tous les articles"} ↗
          </Link>
        )}
      </div>

      <div className="blog-grid">
        {cards.map((article) => {
          const t = article[language];
          return (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="blog-card">
              <ArticleIllustration slug={article.slug} language={language} />
              <span className="blog-tag">{t.category}</span>
              <CardHeading>{t.title}</CardHeading>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
