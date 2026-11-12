// Tout le référencement (SEO) au même endroit : textes pour Google et
// données structurées Schema.org (JSON-LD), construits à partir des vraies
// données du site (lib/site.ts, lib/content.ts, lib/project-craft.ts).
// Règle : rien d'inventé. Chaque information ici existe déjà sur le site.
import { site } from "@/lib/site";
import { projectCraft } from "@/lib/project-craft";
import type { Project } from "@/lib/content";
import type { Article } from "@/lib/articles";

export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;

// --- Textes de la page d'accueil (onglet du navigateur et résultat Google) ---
export const homeSeo = {
  title: "Développeur Front-End React & Next.js à Cotonou, Bénin | Dicode",
  description:
    "Dieudonné Houndagnon, développeur Front-End freelance à Cotonou. Sites vitrines, refontes et applications React, Next.js et TypeScript, au Bénin et à distance.",
};

// Ce que Google doit associer à Dieudonné (uniquement ses vraies compétences).
const skills = [
  "Développement Front-End",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "UI/UX design",
  "Design responsive",
  "Intégration d’API",
  "Refonte de sites web",
  "Optimisation des performances web",
];

/** La personne derrière Dicode : présente sur toutes les pages. */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.person,
    alternateName: site.name,
    url: site.url,
    image: `${site.url}/images/dieudonne.jpeg`,
    jobTitle: "Développeur Front-End",
    description: homeSeo.description,
    // Basé à Cotonou (pas d'adresse précise : il n'y a pas de local physique).
    address: { "@type": "PostalAddress", addressLocality: "Cotonou", addressCountry: "BJ" },
    knowsLanguage: ["fr", "en"],
    knowsAbout: skills,
    hasOccupation: {
      "@type": "Occupation",
      name: "Développeur Front-End",
      occupationLocation: [
        { "@type": "City", name: "Cotonou" },
        { "@type": "Country", name: "Bénin" },
      ],
      skills: skills.join(", "),
    },
    sameAs: [site.github, site.linkedin, site.threads, site.dribbble],
  };
}

/** Le site lui-même. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    alternateName: `${site.name} — ${site.person}`,
    inLanguage: "fr-FR",
    publisher: { "@id": PERSON_ID },
  };
}

/** Page d'accueil = page de profil (type prévu par Google pour les profils de créateurs). */
export function profilePageSchema() {
  return {
    "@type": "ProfilePage",
    "@id": `${site.url}/#profile`,
    url: site.url,
    name: homeSeo.title,
    inLanguage: "fr-FR",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

/** Fil d'Ariane affiché par Google sous le titre du résultat. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

// --- Projets ---
// Les "technologies" de certains projets décrivent un support, pas une technologie.
const notATechnology = /^(site web|application mobile|ia \/ ai)/i;
function technologies(slug: string) {
  return (projectCraft[slug]?.technologies ?? []).filter((t) => !notATechnology.test(t));
}

function clip(text: string, max = 158) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

/** Titre et description Google d'une fiche projet. */
export function projectSeo(p: Project) {
  const kind = p.category.split(" · ")[0];
  const role = projectCraft[p.slug]?.copy.fr.role;
  const tech = technologies(p.slug).slice(0, 3);
  // « Résumé. Rôle : technologies. » Le nom de Dieudonné est déjà sur la page et dans le titre de l'onglet.
  const roleText = role ? `${role}${tech.length ? ` : ${tech.join(", ")}` : ""}.` : tech.length ? `Réalisé avec ${tech.join(", ")}.` : "";
  const full = `${p.summary} ${roleText}`.trim();
  // Trop long ? On garde le rôle sans les technologies plutôt que de couper une phrase.
  const description = full.length <= 158 ? full : clip(`${p.summary} ${role ? role + "." : ""}`.trim());
  // Le nom "Dicode — Portfolio" contient déjà la marque : pas de « | Dicode » en double.
  const title = p.name.includes(site.name) ? { absolute: `${p.name} · ${kind}` } : `${p.name} · ${kind}`;
  return { title, description, technologies: tech };
}

/** Un projet = une œuvre créative signée par Dieudonné. */
export function projectSchema(p: Project, image: string) {
  const { description, technologies: tech } = projectSeo(p);
  const external = p.url && /^https?:\/\//.test(p.url) ? p.url : undefined;
  return {
    "@type": "CreativeWork",
    "@id": `${site.url}/projets/${p.slug}#projet`,
    name: p.name,
    description,
    genre: p.category,
    url: `${site.url}/projets/${p.slug}`,
    image: image.startsWith("http") ? image : `${site.url}${image}`,
    inLanguage: "fr-FR",
    creator: { "@id": PERSON_ID },
    keywords: [...p.tags, ...tech].filter((v, i, a) => a.indexOf(v) === i).join(", "),
    ...(external ? { sameAs: external } : {}),
  };
}

// --- Articles ---
export function articleSchema(a: Article) {
  return {
    "@type": "Article",
    headline: a.fr.title,
    description: a.fr.description,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt ?? a.publishedAt,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${site.url}/articles/${a.slug}`,
    // Nom et URL répétés : Google les exige sur l'auteur, même avec un @id.
    author: { "@type": "Person", "@id": PERSON_ID, name: site.person, url: site.url },
    publisher: { "@type": "Person", "@id": PERSON_ID, name: site.person, url: site.url },
  };
}

/** Sérialise un graphe JSON-LD pour une balise <script type="application/ld+json">. */
export function jsonLd(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
