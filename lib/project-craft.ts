import type { Language } from "@/components/language-provider";

type Localized = Record<Language, string>;
type CraftCopy = {
  role: string;
  roleNote?: string;
  design: { title: string; text: string }[];
  stackNote: string;
  stackTitle?: string;
  fontNote: string;
  paletteNote: string;
};

export type ProjectCraftDetails = {
  technologies: string[];
  fonts: { name: string; usage: Localized }[];
  palette: { hex: string; name: Localized }[];
  sources: { url: string; label: Localized }[];
  copy: Record<Language, CraftCopy>;
};

/** Scope and exact values are grounded in project source or qualified observations. */
export const projectCraft: Record<string, ProjectCraftDetails> = {
  "dicode-portfolio": {
    "technologies": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4"
    ],
    "fonts": [
      {
        "name": "Poppins",
        "usage": {
          "fr": "Texte et interface · 400, 500, 600",
          "en": "Body and interface · 400, 500, 600"
        }
      },
      {
        "name": "Caveat",
        "usage": {
          "fr": "Annotations manuscrites · 500",
          "en": "Handwritten annotations · 500"
        }
      }
    ],
    "palette": [
      {
        "hex": "#8365D2",
        "name": {
          "fr": "Violet",
          "en": "Purple"
        }
      },
      {
        "hex": "#F1EDFC",
        "name": {
          "fr": "Lavande",
          "en": "Lavender"
        }
      },
      {
        "hex": "#F6D86E",
        "name": {
          "fr": "Accent jaune",
          "en": "Yellow accent"
        }
      },
      {
        "hex": "#141419",
        "name": {
          "fr": "Encre",
          "en": "Ink"
        }
      },
      {
        "hex": "#FFFFFF",
        "name": {
          "fr": "Fond principal",
          "en": "Main background"
        }
      }
    ],
    "sources": [],
    "copy": {
      "fr": {
        "role": "Conception et pilotage du portfolio personnel",
        "design": [
          {
            "title": "Un parcours direct",
            "text": "La proposition de valeur ouvre la page, puis les projets et les services donnent accès à des parcours de contact courts."
          },
          {
            "title": "Montrer le travail",
            "text": "Les fiches donnent de la place aux interfaces, aux vues détaillées et aux comparaisons lorsque le projet porte sur une refonte."
          },
          {
            "title": "Une signature cohérente",
            "text": "Les panneaux clairs, les accents violets et les annotations manuscrites relient les pages. La navigation et les contenus existent en français et en anglais."
          }
        ],
        "stackNote": "",
        "fontNote": "",
        "paletteNote": "Couleurs du code source."
      },
      "en": {
        "role": "Personal portfolio design and direction",
        "design": [
          {
            "title": "A direct journey",
            "text": "The value proposition opens the page, then projects and services lead to short contact paths."
          },
          {
            "title": "Showing the work",
            "text": "Project pages make room for interfaces, detailed views and comparisons when the work involves a redesign."
          },
          {
            "title": "A consistent signature",
            "text": "Light panels, purple accents and handwritten notes connect the pages. Navigation and content are available in French and English."
          }
        ],
        "stackNote": "",
        "fontNote": "",
        "paletteNote": "Source-code colours."
      }
    }
  },
  "quebec-signature": {
    "technologies": [
      "Figma",
      "IA / AI"
    ],
    "fonts": [],
    "palette": [
      {
        "hex": "#031A35",
        "name": {
          "fr": "Bleu nuit",
          "en": "Navy"
        }
      },
      {
        "hex": "#0468A3",
        "name": {
          "fr": "Bleu",
          "en": "Blue"
        }
      },
      {
        "hex": "#FED54C",
        "name": {
          "fr": "Jaune",
          "en": "Yellow"
        }
      },
      {
        "hex": "#F8FAFC",
        "name": {
          "fr": "Fond clair",
          "en": "Light background"
        }
      }
    ],
    "sources": [
      {
        "url": "https://demenagementquebecsignature.ca/",
        "label": {
          "fr": "Site d’origine",
          "en": "Original website"
        }
      }
    ],
    "copy": {
      "fr": {
        "role": "Refonte UI/UX et proposition visuelle",
        "design": [
          {
            "title": "Rechercher des références",
            "text": "Je me suis inspiré de références sur Dribbble et Framer pour orienter la proposition visuelle."
          },
          {
            "title": "Construire dans Figma",
            "text": "J’ai créé la maquette dans Figma. Elle présente une navigation en haut de page, un titre central et des services mieux séparés."
          },
          {
            "title": "Affiner avec l’IA",
            "text": "J’ai ensuite amélioré la maquette avec l’IA, en conservant les repères bleus et jaunes de la proposition."
          }
        ],
        "stackNote": "Conception dans Figma, puis améliorations avec l’IA. Framer a servi de référence.",
        "fontNote": "Typographie non identifiée sur les visuels fournis.",
        "paletteNote": "Palette indicative relevée sur la maquette.",
        "roleNote": "Proposition de refonte, sans mise en production ni commande client revendiquée.",
        "stackTitle": "Outils de conception"
      },
      "en": {
        "role": "UI/UX redesign and visual proposal",
        "design": [
          {
            "title": "Finding references",
            "text": "I drew inspiration from references on Dribbble and Framer to guide the visual proposal."
          },
          {
            "title": "Building in Figma",
            "text": "I created the mockup in Figma. It features top navigation, a central headline and more clearly separated services."
          },
          {
            "title": "Refining with AI",
            "text": "I then refined the mockup with AI, retaining the proposal’s blue and yellow visual cues."
          }
        ],
        "stackNote": "Designed in Figma, then refined with AI. Framer was a reference source.",
        "fontNote": "Font family not identified in the supplied visuals.",
        "paletteNote": "Indicative palette sampled from the mockup.",
        "roleNote": "A redesign proposal, with no production launch or client commission claimed.",
        "stackTitle": "Design tools"
      }
    }
  },
  "gozem": {
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript",
      "Tailwind CSS 4",
      "Font Awesome"
    ],
    "fonts": [
      {
        "name": "Syne",
        "usage": {
          "fr": "Titres, navigation et textes",
          "en": "Headings, navigation and body"
        }
      }
    ],
    "palette": [
      {
        "hex": "#00A651",
        "name": {
          "fr": "Vert principal",
          "en": "Main green"
        }
      },
      {
        "hex": "#004D40",
        "name": {
          "fr": "Vert profond",
          "en": "Deep green"
        }
      },
      {
        "hex": "#008D44",
        "name": {
          "fr": "Vert de pied de page",
          "en": "Footer green"
        }
      },
      {
        "hex": "#FFFFFF",
        "name": {
          "fr": "Blanc",
          "en": "White"
        }
      }
    ],
    "sources": [
      {
        "url": "https://rolnelh.github.io/gozem-refonte/",
        "label": {
          "fr": "Version du projet consultée",
          "en": "Observed project version"
        }
      }
    ],
    "copy": {
      "fr": {
        "role": "Refonte web indépendante",
        "design": [
          {
            "title": "Centrer l’accueil sur l’usage",
            "text": "Une promesse fixe fait face au téléphone et à son aperçu de trajet. Deux boutons distinguent les parcours passager et conducteur."
          },
          {
            "title": "Hiérarchiser les services",
            "text": "Les services sont regroupés par public. Les marges blanches, les cartes et les boutons arrondis donnent des repères à cette page dense."
          },
          {
            "title": "Prolonger le parcours",
            "text": "Les sections pays, assistance et actualités complètent la présentation. Le vert reste le repère principal de l’identité visuelle."
          }
        ],
        "stackNote": "Ressources front-end observées sur la refonte publiée.",
        "fontNote": "Familles déclarées dans les styles de la page.",
        "paletteNote": "Couleurs relevées dans les styles de la page publique."
      },
      "en": {
        "role": "Independent web redesign",
        "design": [
          {
            "title": "Focusing the homepage on usage",
            "text": "A fixed proposition faces the phone and its route preview. Two buttons distinguish passenger and driver journeys."
          },
          {
            "title": "Organising the services",
            "text": "Services are grouped by audience. White space, cards and rounded buttons provide structure within the detailed page."
          },
          {
            "title": "Extending the journey",
            "text": "Country, support and news sections complete the presentation. Green remains the main visual identity cue."
          }
        ],
        "stackNote": "Front-end resources observed in the published redesign.",
        "fontNote": "Families declared in the page styles.",
        "paletteNote": "Colours taken from the public page styles."
      }
    }
  },
  "mefolio": {
    "technologies": [
      "Laravel",
      "MySQL",
      "Tailwind CSS"
    ],
    "fonts": [
      {
        "name": "Plus Jakarta Sans",
        "usage": {
          "fr": "Titres, navigation, textes et boutons",
          "en": "Headings, navigation, body and buttons"
        }
      }
    ],
    "palette": [
      {
        "hex": "#F7F6F1",
        "name": {
          "fr": "Crème clair",
          "en": "Light cream"
        }
      },
      {
        "hex": "#FAFAF8",
        "name": {
          "fr": "Blanc chaud",
          "en": "Warm white"
        }
      },
      {
        "hex": "#111827",
        "name": {
          "fr": "Encre",
          "en": "Ink"
        }
      },
      {
        "hex": "#FFFFFF",
        "name": {
          "fr": "Blanc",
          "en": "White"
        }
      },
      {
        "hex": "#4F46E5",
        "name": {
          "fr": "Indigo",
          "en": "Indigo"
        }
      },
      {
        "hex": "#FACC15",
        "name": {
          "fr": "Jaune",
          "en": "Yellow"
        }
      }
    ],
    "sources": [
      {
        "url": "https://mefolio-z6n9.onrender.com/",
        "label": {
          "fr": "Version du projet consultée",
          "en": "Observed project version"
        }
      }
    ],
    "copy": {
      "fr": {
        "role": "Développement complet, de A à Z",
        "design": [
          {
            "title": "Donner une place aux créatifs",
            "text": "Le titre central, les avatars et les projets mettent les personnes et leurs réalisations au premier plan."
          },
          {
            "title": "Distinguer les parcours",
            "text": "Créer son profil et explorer les projets sont deux entrées distinctes. La navigation rassemble l’exploration, les missions et la communauté."
          },
          {
            "title": "Installer un rythme lisible",
            "text": "Fond crème, surfaces blanches et accents indigo structurent les sections. Le soulignement jaune ponctue la promesse créative."
          }
        ],
        "stackNote": "",
        "fontNote": "Familles déclarées dans les styles de la page.",
        "paletteNote": "Couleurs relevées dans les styles de la page publique.",
        "roleNote": "Migration vers une architecture découplée prévue pour une prochaine évolution."
      },
      "en": {
        "role": "End-to-end development",
        "design": [
          {
            "title": "Giving creatives room",
            "text": "The central headline, avatars and projects put people and their work first."
          },
          {
            "title": "Separating the journeys",
            "text": "Creating a profile and exploring projects are separate entry points. Navigation brings exploration, missions and community together."
          },
          {
            "title": "Establishing a readable rhythm",
            "text": "A cream background, white surfaces and indigo accents organise the sections. A yellow underline accents the creative proposition."
          }
        ],
        "stackNote": "",
        "fontNote": "Families declared in the page styles.",
        "paletteNote": "Colours taken from the public page styles.",
        "roleNote": "A migration to a decoupled architecture is planned for a future evolution."
      }
    }
  },
  "lexpo": {
    "technologies": [
      "React JS",
      "Tailwind CSS",
      "Laravel API"
    ],
    "fonts": [
      {
        "name": "Fredoka",
        "usage": {
          "fr": "Titre principal",
          "en": "Main headline"
        }
      },
      {
        "name": "General Sans",
        "usage": {
          "fr": "Navigation, introduction et boutons",
          "en": "Navigation, introduction and buttons"
        }
      },
      {
        "name": "Quicksand",
        "usage": {
          "fr": "Titres et textes des sections",
          "en": "Section headings and body"
        }
      }
    ],
    "palette": [
      {
        "hex": "#EF9F27",
        "name": {
          "fr": "Orange doré",
          "en": "Golden orange"
        }
      },
      {
        "hex": "#FBF6EC",
        "name": {
          "fr": "Crème chaud",
          "en": "Warm cream"
        }
      },
      {
        "hex": "#FAF9F6",
        "name": {
          "fr": "Blanc cassé",
          "en": "Off-white"
        }
      },
      {
        "hex": "#111111",
        "name": {
          "fr": "Noir doux",
          "en": "Soft black"
        }
      },
      {
        "hex": "#666666",
        "name": {
          "fr": "Gris de lecture",
          "en": "Body grey"
        }
      },
      {
        "hex": "#FFFFFF",
        "name": {
          "fr": "Blanc",
          "en": "White"
        }
      }
    ],
    "sources": [
      {
        "url": "https://lexpo-gallery.vercel.app/",
        "label": {
          "fr": "Version du projet consultée",
          "en": "Observed project version"
        }
      },
      {
        "url": "https://mefolio-z6n9.onrender.com/projects/lexpo-plateforme-6aa0129ae7568",
        "label": {
          "fr": "Présentation du projet",
          "en": "Project write-up"
        }
      }
    ],
    "copy": {
      "fr": {
        "role": "Développement front-end et API",
        "design": [
          {
            "title": "Mettre l’artisanat en valeur",
            "text": "Une page claire, des photographies d’artisans et un accent orange donnent de la place aux créations et à leurs auteurs."
          },
          {
            "title": "Faciliter la découverte",
            "text": "La recherche se trouve dès l’accueil, avec une invitation distincte à rejoindre la communauté. Les formes arrondies rendent les points d’entrée visibles."
          },
          {
            "title": "Expliquer la mise en ligne",
            "text": "Les bénéfices et les étapes de publication suivent la présentation. Les collections replacent les objets dans l’univers de leurs créateurs."
          }
        ],
        "stackNote": "",
        "fontNote": "Familles déclarées dans les styles de la page.",
        "paletteNote": "Couleurs relevées dans les styles de la page publique."
      },
      "en": {
        "role": "Front-end and API development",
        "design": [
          {
            "title": "Showcasing craftsmanship",
            "text": "A light page, artisan photographs and an orange accent make room for the work and its creators."
          },
          {
            "title": "Making discovery easier",
            "text": "Search appears in the hero, alongside a separate invitation to join the community. Rounded shapes make the entry points visible."
          },
          {
            "title": "Explaining publication",
            "text": "Benefits and publication steps follow the introduction. Collections place objects in the world of their creators."
          }
        ],
        "stackNote": "",
        "fontNote": "Families declared in the page styles.",
        "paletteNote": "Colours taken from the public page styles."
      }
    }
  },
  "rynva": {
    "technologies": [
      "Next.js",
      "Tailwind CSS",
      "Supabase"
    ],
    "fonts": [],
    "palette": [
      {
        "hex": "#7160FF",
        "name": {
          "fr": "Violet du dégradé",
          "en": "Gradient purple"
        }
      },
      {
        "hex": "#4780FF",
        "name": {
          "fr": "Bleu du dégradé",
          "en": "Gradient blue"
        }
      },
      {
        "hex": "#18181B",
        "name": {
          "fr": "Texte",
          "en": "Text"
        }
      },
      {
        "hex": "#F4F4F5",
        "name": {
          "fr": "Fond gris",
          "en": "Gray background"
        }
      },
      {
        "hex": "#FFFFFF",
        "name": {
          "fr": "Surfaces",
          "en": "Surfaces"
        }
      }
    ],
    "sources": [],
    "copy": {
      "fr": {
        "role": "Développement de l’application web",
        "design": [
          {
            "title": "Réunir les outils",
            "text": "Les catégories image, vidéo, photo, design, audio et chat sont rassemblées autour d’un même tableau de bord."
          },
          {
            "title": "Garder des repères stables",
            "text": "Le menu latéral déployé sépare la navigation des contenus. Une recherche centrale et des raccourcis rendent les outils visibles dès l’entrée."
          },
          {
            "title": "Retrouver ses créations",
            "text": "Les cartes des projets récents donnent une continuité au travail. Les surfaces claires laissent la place aux visuels et aux accents du dégradé."
          }
        ],
        "stackNote": "",
        "fontNote": "Typographie non identifiée sur la capture fournie.",
        "paletteNote": "Palette indicative relevée sur la capture du dashboard."
      },
      "en": {
        "role": "Web application development",
        "design": [
          {
            "title": "Bringing tools together",
            "text": "Image, video, photo, design, audio and chat categories are gathered in one dashboard."
          },
          {
            "title": "Keeping stable landmarks",
            "text": "The expanded sidebar separates navigation from content. Central search and shortcuts surface the tools on arrival."
          },
          {
            "title": "Finding recent work",
            "text": "Recent-project cards provide continuity. Light surfaces make room for visuals and gradient accents."
          }
        ],
        "stackNote": "",
        "fontNote": "Font family not identified in the supplied screenshot.",
        "paletteNote": "Indicative palette sampled from the dashboard screenshot."
      }
    }
  }
};
