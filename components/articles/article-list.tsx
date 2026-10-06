"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { articles } from "@/lib/articles";
import { ArticleIllustration } from "./article-illustration";
export function ArticleList({ compact = false }: { compact?: boolean }) {
  const { language } = useLanguage();
  const en = language === "en";
  const CardHeading = compact ? "h3" : "h2";
  return (
    <section
      className={`journal wrap ${compact ? "journal-preview section-space" : "journal-page"}`}
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {en ? "NOTES · QUALITY · PRODUCT" : "NOTES · QUALITÉ · PRODUIT"}
          </p>
          {compact ? (
            <h2>
              {en
                ? "Building is only the beginning."
                : "Créer n’est que le début."}
            </h2>
          ) : (
            <h1>
              {en
                ? "Ideas worth putting into practice."
                : "Des idées à mettre en pratique."}
            </h1>
          )}
        </div>
        {compact && (
          <Link className="text-link" href="/articles">
            {en ? "All articles" : "Tous les articles"} ↗
          </Link>
        )}
      </div>
      <p className="journal-intro">
        {en
          ? "Practical notes on web quality, VibenGo and building useful products, with or without AI."
          : "Des repères concrets sur la qualité web, VibenGo et la création de produits utiles, avec ou sans IA."}
      </p>
      <div className="article-grid">
        {articles.map((a) => {
          const t = a[language];
          return (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              className="article-card"
            >
              <ArticleIllustration slug={a.slug} language={language} />
              <div className="article-card-body">
                <div className="article-meta">
                  <span>{t.category}</span>
                  <time dateTime={a.publishedAt}>
                    {new Intl.DateTimeFormat(en ? "en-GB" : "fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    }).format(new Date(a.publishedAt))}
                  </time>
                </div>
                <CardHeading>{t.title}</CardHeading>
                <p>{t.description}</p>
                <span className="article-read">
                  {en ? "Read the article" : "Lire l’article"}
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
