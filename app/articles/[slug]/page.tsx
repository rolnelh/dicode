import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { site } from "@/lib/site";
import { ArticleContent } from "@/components/articles/article-content";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) return {};
  return {
    title: a.fr.title,
    description: a.fr.description,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.fr.title,
      description: a.fr.description,
      url: `/articles/${a.slug}`,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      authors: [site.person],
    },
    twitter: { title: a.fr.title, description: a.fr.description },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.fr.title,
    description: a.fr.description,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    inLanguage: "fr",
    mainEntityOfPage: `${site.url}/articles/${a.slug}`,
    author: {
      "@type": "Person",
      name: site.person,
      url: `${site.url}/#a-propos`,
    },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
  return (
    <>
      <ArticleContent slug={a.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(json).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
