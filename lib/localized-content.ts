import { needs, services, type Project } from "@/lib/content";
import type { Language } from "@/components/language-provider";

// Overlay only copy. Project URLs, images, dimensions and provenance remain
// owned by lib/content.ts, so changing a visual never changes its translation.
type ProjectCopy = Pick<
  Project,
  "category" | "summary" | "description" | "imageAlt" | "tags" | "note"
>;
const englishProjects: Record<string, ProjectCopy> = {
  "dicode-portfolio": {
    category: "Personal portfolio · Desktop & mobile",
    summary:
      "My skills, projects and ideas brought together in a responsive experience.",
    description:
      "This portfolio presents my development work, from creating websites to redesigning and finishing existing products. It combines selected projects, a journal about web quality and clear contact paths, with a French and English interface for desktop and mobile.",
    imageAlt: "Dicode portfolio shown on desktop and mobile",
    tags: ["Next.js", "Tailwind CSS", "Responsive design", "FR / EN"],
  },
  rynva: {
    category: "Creative interface · Dashboard",
    summary: "A central space for creative tools and recent projects.",
    description:
      "The Rynva dashboard brings image, video, photo, design, audio and chat tools together around a central search. This presentation highlights dashboard hierarchy, shortcuts and navigation to recent projects.",
    imageAlt:
      "Supplied full Rynva dashboard screenshot with expanded sidebar, creative tools and recent projects",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    note: "Dashboard screenshot supplied for this presentation. Access to the product may require signing in.",
  },
  mefolio: {
    category: "Creative platform",
    summary: "Putting creative talent and projects in the spotlight.",
    description:
      "A platform showcasing portfolios, projects and opportunities for creatives. A clear interface, readable hierarchy and a journey that works on smaller screens.",
    imageAlt: "MeFolio dashboard with creator profile, statistics and projects",
    tags: ["Laravel", "MySQL", "Tailwind CSS"],
  },
  "quebec-signature": {
    category: "UI/UX redesign · Before / after",
    summary:
      "Rethinking a moving company’s website to clarify its offer and contact paths.",
    description:
      "Starting from the Déménagement Québec Signature website, I rethought homepage hierarchy, navigation and service presentation. The study below compares the original website with my visual proposal.",
    imageAlt:
      "Déménagement Québec Signature redesign proposal: blue and yellow hero with moving illustrations",
    tags: ["Visual direction", "Web design", "Business website"],
    note: "Redesign proposal presented using the supplied visuals. No client commission or production launch is claimed; the illustrated equipment remains to be confirmed.",
  },
  lexpo: {
    category: "Digital gallery · Artisans",
    summary:
      "A digital showcase that brings artisans’ skills to a wider audience.",
    description:
      "L’Expo presents artisans’ creations and catalogues in an online gallery. The project focuses on discovering talent, showcasing products and offering a clear first step to create a storefront.",
    imageAlt:
      "Actual screenshot of L’Expo’s homepage, a digital gallery for artisans",
    tags: ["React JS", "Tailwind CSS", "Laravel API"],
    note: "Real site screenshots taken on 5 and 6 October 2026. The homepage appears in two overlapping windows; other pages and the dashboard are shown at a larger scale below. Source-site figures and testimonials have not been independently verified here.",
  },
  gozem: {
    category: "Independent redesign · Before / after",
    summary:
      "A Gozem homepage redesign focused on usage, services and proposed journeys.",
    description:
      "This study compares the official Gozem Benin website with my redesign available on GitHub Pages. The captures show the homepage hierarchy, services and navigation choices in each version.",
    imageAlt: "Gozem presentation mockup: homepage, services, countries, support and news",
    tags: ["UI/UX", "Web redesign", "Implementation"],
    note: "Personal redesign published on GitHub Pages. This presentation does not claim a client commission or official affiliation with Gozem.",
  },
};

export function getLocalizedProject(
  project: Project,
  language: Language,
): Project {
  const translation = englishProjects[project.slug];
  return language === "en" && translation
    ? { ...project, ...translation }
    : project;
}

const englishServices = [
  {
    title: "Custom websites",
    text: "A tailor-made website to introduce your business, showcase what you offer and make it easy to get in touch.",
    tags: "Business website · Landing page",
  },
  {
    title: "Redesign & user experience",
    text: "A clearer interface, simpler navigation and a polished experience on desktop and mobile.",
    tags: "Design · Responsive",
  },
  {
    title: "Rescue & completion",
    text: "I pick up your website or SaaS interface to fix bugs, integrate your APIs and get it ready to launch.",
    tags: "Bug fixes · Integration · Deployment",
  },
];
export function getLocalizedServices(language: Language) {
  return services.map((service, index) =>
    language === "en" ? { ...service, ...englishServices[index] } : service,
  );
}

const englishNeeds = [
  "New website",
  "Website redesign",
  "SaaS interface",
  "Rescue & completion",
  "Another project",
];
export function getNeedOptions(language: Language) {
  // Values remain compatible with the existing contact endpoint in either language.
  return needs.map((value, index) => ({
    value,
    label: language === "en" ? englishNeeds[index] || value : value,
  }));
}
export function getBudgetOptions(language: Language) {
  const values = [
    "À définir ensemble",
    "Moins de 500 €",
    "500 à 1 500 €",
    "1 500 à 3 000 €",
    "Plus de 3 000 €",
  ];
  const labels =
    language === "en"
      ? [
          "Let’s work it out together",
          "Under €500",
          "€500–€1,500",
          "€1,500–€3,000",
          "Over €3,000",
        ]
      : values;
  return values.map((value, index) => ({ value, label: labels[index] }));
}

export const copy = {
  fr: {
    services: {
      eyebrow: "MES SERVICES",
      title: ["Ce que je peux", "faire pour vous."],
      intro: [
        "Créer votre site, repenser l’existant ou finaliser un projet.",
        "Un accompagnement adapté à votre point de départ.",
      ],
      scope: "Un périmètre défini ensemble",
      communication: "Des échanges à chaque étape",
      contact: "Parlons de votre projet ↗",
    },
    process: {
      hand: "Simple, clair, ensemble.",
      title: ["Comment se passe", "votre projet ?"],
      intro: "Trois étapes, avec des échanges à chaque moment clé.",
      steps: [
        {
          title: "On clarifie votre besoin",
          text: "Nous définissons vos objectifs, les fonctionnalités utiles, le budget et les délais.",
        },
        {
          title: "Je conçois et développe",
          text: "Vous validez la direction visuelle, puis je développe votre site avec des points réguliers.",
        },
        {
          title: "On teste et on lance",
          text: "Nous vérifions les parcours sur ordinateur et mobile avant la mise en ligne et la prise en main.",
        },
      ],
    },
    projects: {
      eyebrow: "SÉLECTION DE PROJETS",
      title: "Des projets, des univers singuliers.",
      hand: "Un aperçu de mon univers.",
      bottom: [
        "Des interfaces pensées pour être",
        "aussi agréables à regarder qu’à utiliser.",
      ],
      question: "Un projet en tête ?",
      talk: "Parlons-en ! ↗",
      back: "← Tous les projets",
      discover: "Découvrir",
      disclaimer:
        "Maquette illustrative du prototype Vidmake. Cet aperçu présente une direction visuelle, pas un produit en production.",
      contact: "Un projet dans cet esprit ? Parlons-en ↗",
    },
    contact: {
      hand: "Faisons connaissance.",
      title: ["Une idée, un site à repenser ?", "Parlons de votre projet"],
      intro:
        "Présentez-moi votre besoin, même si tout n’est pas encore défini.",
      direct: "Vous préférez m’écrire directement ?",
    },
    form: {
      name: "Votre nom *",
      namePlaceholder: "Comment vous appelez-vous ?",
      email: "Votre e-mail *",
      emailPlaceholder: "vous@exemple.com",
      need: "Votre besoin *",
      needPlaceholder: "Choisir un service",
      budget: "Budget estimé (facultatif)",
      message: "Votre projet *",
      messagePlaceholder:
        "Votre activité, vos objectifs, le lien de votre site si vous en avez un…",
      honeypot: "Laissez ce champ vide",
      privacy:
        "Vos coordonnées serviront uniquement à répondre à votre demande.",
      mailtoNote:
        "Ce formulaire ouvre votre messagerie avec un e-mail prérempli ; rien n’est envoyé automatiquement.",
      busy: "Envoi en cours…",
      send: "Envoyer mon message ↗",
      prepare: "Préparer mon message ↗",
      hand: "Le premier pas, c’est ici.",
      draft:
        "Votre message est prêt. Finalisez son envoi dans votre messagerie.",
      sent: "Votre message a bien été envoyé. Merci pour votre confiance.",
      openDraft: "Ouvrir l’e-mail prérempli",
      validation: "Vérifiez les champs indiqués avant de continuer.",
      errors: {
        requiredName: "Indiquez votre nom.",
        invalidName: "Votre nom doit contenir au maximum 100 caractères.",
        requiredEmail: "Indiquez votre adresse e-mail.",
        invalidEmail:
          "Indiquez une adresse e-mail valide (200 caractères maximum).",
        requiredNeed: "Choisissez un service.",
        requiredMessage: "Présentez votre projet.",
        shortMessage: "Décrivez votre projet en au moins 20 caractères.",
        longMessage: "Votre message doit contenir au maximum 4 000 caractères.",
        invalid: "Vérifiez vos informations, puis réessayez.",
        forbidden:
          "Votre demande n’a pas pu être autorisée. Actualisez la page ou écrivez-moi directement.",
        rateLimited:
          "Trop de tentatives rapprochées. Patientez un moment ou écrivez-moi directement.",
        unavailable:
          "L’envoi est momentanément indisponible. Réessayez ou écrivez-moi directement.",
        network:
          "La connexion a échoué. Vérifiez votre accès Internet ou écrivez-moi directement.",
        failed: "Envoi impossible. Réessayez ou écrivez-moi directement.",
      },
      mail: {
        greeting: "Bonjour Dieudonné,",
        subject: "Projet Dicode",
        need: "Besoin",
        budget: "Budget",
        name: "Nom",
        email: "E-mail",
      },
    },
    notFound: {
      hand: "Petit détour imprévu.",
      title: "Cette page n’existe pas.",
      text: "Retrouvez mes projets et mes services sur la page d’accueil.",
      back: "Revenir à l’accueil",
    },
  },
  en: {
    services: {
      eyebrow: "MY SERVICES",
      title: ["What I can", "do for you."],
      intro: [
        "Build your website, rethink what’s there or finish a project.",
        "Support that meets you where you are.",
      ],
      scope: "A scope we define together",
      communication: "A conversation at every step",
      contact: "Let’s talk about your project ↗",
    },
    process: {
      hand: "Simple, clear, together.",
      title: ["How does your", "project take shape?"],
      intro: "Three steps, with a conversation at every key moment.",
      steps: [
        {
          title: "We clarify what you need",
          text: "We define your goals, useful features, budget and timeline.",
        },
        {
          title: "I design and develop",
          text: "You approve the visual direction, then I build your website with regular check-ins.",
        },
        {
          title: "We test and launch",
          text: "We check the desktop and mobile journeys before launch and handover.",
        },
      ],
    },
    projects: {
      eyebrow: "SELECTED PROJECTS",
      title: "Different projects. Distinctive worlds.",
      hand: "A glimpse into my world.",
      bottom: [
        "Interfaces designed to be",
        "as enjoyable to use as they are to look at.",
      ],
      question: "Got a project?",
      talk: "Let’s talk! ↗",
      back: "← All projects",
      discover: "Explore",
      disclaimer:
        "Illustrative mockup of the Vidmake prototype. This preview shows a visual direction, not a production product.",
      contact: "Have a similar project in mind? Let’s talk ↗",
    },
    contact: {
      hand: "Let’s get to know each other.",
      title: [
        "An idea, or a website to rethink?",
        "Let’s talk about your project",
      ],
      intro: "Tell me what you need, even if you’re still figuring it out.",
      direct: "Prefer to email me directly?",
    },
    form: {
      name: "Your name *",
      namePlaceholder: "What’s your name?",
      email: "Your email *",
      emailPlaceholder: "you@example.com",
      need: "What you need *",
      needPlaceholder: "Choose a service",
      budget: "Estimated budget (optional)",
      message: "Your project *",
      messagePlaceholder:
        "Your business, your goals and your website link, if you have one…",
      honeypot: "Leave this field empty",
      privacy:
        "Your contact details will only be used to respond to your enquiry.",
      mailtoNote:
        "This form opens your email app with a draft; nothing is sent automatically.",
      busy: "Sending…",
      send: "Send my message ↗",
      prepare: "Prepare my message ↗",
      hand: "The first step starts here.",
      draft: "Your message is ready. Finish sending it in your email app.",
      sent: "Your message has been sent. Thank you for getting in touch.",
      openDraft: "Open the email draft",
      validation: "Check the highlighted fields before continuing.",
      errors: {
        requiredName: "Please enter your name.",
        invalidName: "Your name must be no longer than 100 characters.",
        requiredEmail: "Please enter your email address.",
        invalidEmail: "Enter a valid email address (200 characters maximum).",
        requiredNeed: "Please choose a service.",
        requiredMessage: "Please tell me about your project.",
        shortMessage: "Describe your project in at least 20 characters.",
        longMessage: "Your message must be no longer than 4,000 characters.",
        invalid: "Check your details, then try again.",
        forbidden:
          "Your request could not be authorised. Refresh the page or email me directly.",
        rateLimited:
          "There have been too many attempts. Wait a moment or email me directly.",
        unavailable:
          "Sending is temporarily unavailable. Try again or email me directly.",
        network:
          "The connection failed. Check your internet access or email me directly.",
        failed:
          "Your message could not be sent. Try again or email me directly.",
      },
      mail: {
        greeting: "Hello Dieudonné,",
        subject: "Dicode project",
        need: "Service",
        budget: "Budget",
        name: "Name",
        email: "Email",
      },
    },
    notFound: {
      hand: "A little unexpected detour.",
      title: "This page doesn’t exist.",
      text: "You can find my projects and services on the home page.",
      back: "Back to the home page",
    },
  },
} as const;
