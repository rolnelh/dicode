"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { articles } from "@/lib/articles";
import { ArticleIllustration } from "./article-illustration";
export function ArticleContent({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const en = language === "en";
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  const t = article[language];
  const vibe = slug.includes("vibengo");
  return (
    <article className="article-page wrap">
      <Link href="/articles" className="text-link">
        ← {en ? "All articles" : "Tous les articles"}
      </Link>
      <header className="article-heading">
        <p className="eyebrow">{t.category}</p>
        <h1>{t.title}</h1>
        <p className="article-deck">{t.description}</p>
        <div className="article-byline">
          <span>{article.author}</span>
          <span>
            {t.readingTime} {en ? "read" : "de lecture"}
          </span>
          <time dateTime={article.publishedAt}>
            {new Intl.DateTimeFormat(en ? "en-GB" : "fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(article.publishedAt))}
          </time>
          {article.updatedAt && (
            <span>
              {en ? "Updated " : "Mis à jour le "}
              <time dateTime={article.updatedAt}>
                {new Intl.DateTimeFormat(en ? "en-GB" : "fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(article.updatedAt))}
              </time>
            </span>
          )}
        </div>
      </header>
      <ArticleIllustration slug={slug} language={language} hero />
      {vibe && (
        <figure className="vibengo-figure">
          <div className="vibengo-mockup">
            <div className="vibengo-browser" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>vibeango.com</span>
            </div>
            <Image
              src="/images/vibengo-interface.jpg"
              alt={
                en
                  ? "Actual screenshot of VibenGo’s French public page, with its sample device results"
                  : "Capture réelle de la page publique française de VibenGo, avec ses résultats de démonstration par appareil"
              }
              width={1165}
              height={747}
              sizes="(max-width:700px) 100vw, 900px"
            />
          </div>
          <figcaption>
            {en
              ? "Public page captured on 5 October 2026. The device cards are demonstration data, not the result of an audit performed here."
              : "Page publique capturée le 5 octobre 2026. Les cartes d’appareils sont des données de démonstration, pas le résultat d’un audit réalisé ici."}
          </figcaption>
        </figure>
      )}
      <div className="article-prose">
        <p className="article-introduction">{t.intro}</p>
        <nav
          className="article-toc"
          aria-label={en ? "Article contents" : "Sommaire de l’article"}
        >
          <strong>{en ? "In this article" : "Dans cet article"}</strong>
          {t.sections.map((s, i) => (
            <a key={i} href={`#section-${i + 1}`}>
              {s.heading}
            </a>
          ))}
        </nav>
        {t.sections.map((s, i) => (
          <section key={i} id={`section-${i + 1}`}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {s.bullets && (
              <ul>
                {s.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
            {s.sources && (
              <p className="article-citations">
                {en ? "References: " : "Références : "}
                {s.sources.map((source, j) => (
                  <span key={source.url}>
                    {j > 0 ? " · " : ""}
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </section>
        ))}
        <p className="article-conclusion">{t.conclusion}</p>
        <aside className="article-sources">
          <h2>
            {en
              ? "Sources and further reading"
              : "Sources et pour aller plus loin"}
          </h2>
          <ul>
            {t.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="article-next">
          <p>
            {en
              ? "A project to build or improve?"
              : "Un projet à créer ou à améliorer ?"}
          </p>
          <Link className="button" href="/contact">
            {en ? "Let’s discuss it" : "Parlons-en"} ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
