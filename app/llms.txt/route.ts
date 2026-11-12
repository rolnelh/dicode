// /llms.txt : une présentation du site pour les assistants IA (ChatGPT, Claude, Perplexity…),
// générée à partir des vraies données du site pour rester à jour automatiquement.
import { site } from "@/lib/site";
import { projects } from "@/lib/content";
import { articles } from "@/lib/articles";
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name} — ${site.person}`,
    "",
    `> ${site.description}`,
    "",
    "## Informations",
    `- Nom : ${site.person}`,
    `- Marque : ${site.name}`,
    "- Métier : développeur Front-End et designer UI, freelance",
    "- Localisation : Cotonou, Bénin. Disponible à distance, au Bénin, en France et dans toute la francophonie.",
    "- Compétences : React, Next.js, TypeScript, JavaScript, Tailwind CSS, UI/UX design, design responsive, intégration d’API, refonte de sites web.",
    "- Langues : français, anglais",
    `- Contact : ${site.email} · WhatsApp ${site.whatsapp}`,
    `- Profils : ${[site.linkedin, site.github, site.dribbble].join(" · ")}`,
    "",
    "## Pages",
    `- [Accueil](${site.url}/) : services, méthode de travail, projets, à propos.`,
    `- [Contact](${site.url}/contact) : demande de projet.`,
    `- [Articles](${site.url}/articles) : guides sur la qualité web et le développement.`,
    "",
    "## Projets",
    ...projects.map((p) => `- [${p.name}](${site.url}/projets/${p.slug}) : ${p.category}. ${p.summary}`),
    "",
    "## Articles",
    ...articles.map((a) => `- [${a.fr.title}](${site.url}/articles/${a.slug}) : ${a.fr.description}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
