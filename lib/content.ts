import { lexpoGallery } from "./lexpo-gallery";

export const services = [
  {
    title: "Création de sites web",
    text: "Un site sur mesure pour présenter votre activité, mettre en valeur votre offre et faciliter la prise de contact.",
    tags: "Site vitrine · Landing page",
    tone: "butter",
  },
  {
    title: "Refonte & expérience utilisateur",
    text: "Une interface plus claire, une navigation simplifiée et un affichage soigné sur ordinateur comme sur mobile.",
    tags: "Design · Responsive",
    tone: "lavender",
  },
  {
    title: "Reprise & finalisation",
    text: "Je reprends votre site ou votre interface SaaS pour corriger les bugs, intégrer vos API et préparer la mise en ligne.",
    tags: "Corrections · Intégration · Déploiement",
    tone: "ice",
  },
];
export type ProjectGalleryView = {
  image: string;
  fullImage?: string;
  imageAlt: string;
  imageAltEn: string;
  imageWidth: number;
  imageHeight: number;
  caption: string;
  captionEn: string;
  title?: string;
  titleEn?: string;
  sourceUrl?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  kind: "concept" | "screenshot" | "presentation";
  tags: readonly string[];
  url: string | null;
  note?: string;
  secondaryImage?: {
    image: string;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
  };
  gallery?: readonly ProjectGalleryView[];
};
export const projects: readonly Project[] = [
  {
    slug: "dicode-portfolio",
    name: "Dicode — Portfolio",
    category: "Portfolio personnel · Desktop & mobile",
    summary:
      "Mon savoir-faire, mes réalisations et mes idées réunis dans une expérience responsive.",
    description:
      "Ce portfolio présente mon travail de développeur, de la création de sites à leur refonte et leur finalisation. Il réunit des réalisations, un journal sur la qualité web et des parcours de contact, avec une interface française et anglaise adaptée à l’ordinateur et au mobile.",
    image: "/favicon.svg",
    imageAlt: "Portfolio Dicode sur ordinateur et mobile",
    imageWidth: 64,
    imageHeight: 64,
    kind: "presentation",
    tags: ["Next.js", "Tailwind CSS", "Responsive", "FR / EN"],
    url: "/",
  },
  {
    slug: "rynva",
    name: "Rynva",
    category: "Interface créative · Dashboard",
    summary:
      "Un espace central pour retrouver ses outils et ses projets créatifs.",
    description:
      "Le dashboard Rynva réunit l’accès aux outils image, vidéo, photo, design, audio et chat autour d’une recherche centrale. La présentation met en avant la hiérarchie du tableau de bord, les raccourcis et la continuité entre les projets récents.",
    image: "/images/rynva-dashboard-full.png",
    imageAlt:
      "Capture complète fournie du dashboard Rynva : menu déployé, outils créatifs et projets récents",
    imageWidth: 1920,
    imageHeight: 1688,
    kind: "screenshot",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    url: "https://rynva.app/dashboard",
    note: "Capture du dashboard fournie pour cette présentation. L’accès au produit peut nécessiter une connexion.",
  },
  {
    slug: "mefolio",
    name: "MeFolio",
    category: "Plateforme créative",
    summary: "Mettre les projets et le talent des créatifs au premier plan.",
    description:
      "Une plateforme qui présente les portfolios, les projets et les opportunités pour les créatifs. Une interface claire, une hiérarchie lisible et un parcours adapté aux petits écrans.",
    image: "/images/mefolio-dashboard.png",
    imageAlt:
      "Dashboard MeFolio : profil créatif, statistiques et liste des projets",
    imageWidth: 1366,
    imageHeight: 768,
    kind: "screenshot",
    tags: ["Laravel", "MySQL", "Tailwind CSS"],
    url: "https://mefolio-z6n9.onrender.com/",
  },
  {
    slug: "quebec-signature",
    name: "Déménagement Québec Signature",
    category: "Refonte UI/UX · Avant / après",
    summary:
      "Repenser un site de déménagement pour clarifier l’offre et la prise de contact.",
    description:
      "À partir du site Déménagement Québec Signature, j’ai repensé la hiérarchie de la page d’accueil, la navigation et la présentation des services. L’étude ci-dessous compare le site d’origine à ma proposition visuelle.",
    image: "/images/quebec-signature-hero.png",
    imageAlt:
      "Proposition de refonte Déménagement Québec Signature : hero bleu et jaune avec illustrations de déménagement",
    imageWidth: 1513,
    imageHeight: 1040,
    kind: "presentation",
    tags: ["Direction visuelle", "Web design", "Site vitrine"],
    url: null,
    note: "Proposition de refonte présentée à partir des visuels fournis. Aucune commande client ni mise en production n’est revendiquée ; les équipements illustrés restent à confirmer.",
    gallery: [
      {
        image: "/images/quebec-signature-equipment.png",
        imageAlt:
          "Section de présentation des équipements et véhicules, visuels d’illustration",
        imageAltEn: "Equipment and vehicle section of the redesign proposal",
        caption: "Équipements et véhicules · Visuels d’illustration",
        captionEn: "Equipment and vehicles · Illustrative visuals",
        imageWidth: 1536,
        imageHeight: 1024,
      },
      {
        image: "/images/quebec-signature-footer.png",
        imageAlt:
          "Pied de page de la proposition Déménagement Québec Signature",
        imageAltEn: "Footer of the Déménagement Québec Signature redesign proposal",
        caption: "Pied de page · Navigation et contact",
        captionEn: "Footer · Navigation and contact",
        imageWidth: 1672,
        imageHeight: 940,
      },
    ],
  },
  {
    slug: "lexpo",
    name: "L’Expo",
    category: "Galerie numérique · Artisans",
    summary:
      "Une vitrine numérique pour faire découvrir le savoir-faire des artisans.",
    description:
      "L’Expo présente les créations et les catalogues des artisans dans une galerie en ligne. Le projet met l’accent sur la découverte des talents, la présentation des produits et une première action claire pour créer sa vitrine.",
    image: "/images/lexpo-page.jpg",
    imageAlt:
      "Capture réelle de la page d’accueil L’Expo, galerie numérique des artisans",
    imageWidth: 1165,
    imageHeight: 5219,
    kind: "screenshot",
    tags: ["React JS", "Tailwind CSS", "Laravel API"],
    url: "https://lexpo-gallery.vercel.app/",
    note: "Captures réelles du site les 5 et 6 octobre 2026. L’accueil est présenté dans deux fenêtres superposées ; les autres pages et le dashboard sont visibles en grand ci-dessous. Les chiffres et témoignages du site source ne sont pas des résultats vérifiés ici.",
    gallery: lexpoGallery,
    secondaryImage: {
      image: "/images/lexpo-page.jpg",
      imageAlt: "Sections de la page publique L’Expo",
      imageWidth: 1165,
      imageHeight: 5219,
    },
  },
  {
    slug: "gozem",
    name: "Gozem",
    category: "Refonte indépendante · Avant / après",
    summary:
      "Une refonte de l’accueil Gozem centrée sur les usages, les services et les parcours proposés.",
    description:
      "Cette étude met en regard le site officiel Gozem Bénin et ma refonte disponible sur GitHub Pages. Les captures présentent la hiérarchie de l’accueil, les services et les choix de navigation de chaque version.",
    image: "/images/gozem-sections-mosaic.png",
    imageAlt: "Mockup de présentation Gozem : accueil, services, pays, support et actualités",
    imageWidth: 1448,
    imageHeight: 1086,
    kind: "presentation",
    tags: ["UI/UX", "Refonte web", "Intégration"],
    url: "https://rolnelh.github.io/gozem-refonte/",
    note: "Refonte personnelle publiée sur GitHub Pages. Cette présentation ne revendique ni commande client ni affiliation officielle avec Gozem.",
  },
];
export const needs = [
  "Création de site web",
  "Refonte de site",
  "Interface SaaS",
  "Reprise & finalisation",
  "Autre projet",
];
