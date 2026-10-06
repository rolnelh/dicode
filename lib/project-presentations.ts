import type { Language } from "@/components/language-provider";

type Presentation = {
  image: string;
  width: number;
  height: number;
  copy: Record<Language, { title: string; alt: string; caption: string }>;
};

/** Approved presentation artwork. Actual source captures stay in the case studies. */
export const projectPresentations: Record<string, Presentation> = {
  mefolio: {
    image: "/images/mefolio-pages-mosaic.png",
    width: 1448,
    height: 1086,
    copy: {
      fr: {
        title: "Les différents visages de MeFolio.",
        alt: "Mockup MeFolio réunissant les défis créatifs, le classement, Talent of the Week et les étapes du parcours créatif",
        caption: "Mockup de présentation généré : défis, classement, Talent of the Week et parcours créatif. Les chiffres illustrés ne sont pas des résultats vérifiés.",
      },
      en: {
        title: "The different sides of MeFolio.",
        alt: "MeFolio mockup showing creative challenges, rankings, Talent of the Week and creative career steps",
        caption: "Generated presentation mockup: challenges, rankings, Talent of the Week and the creative journey. The illustrated figures are not verified results.",
      },
    },
  },
  "dicode-portfolio": {
    image: "/images/dicode-macbook-presentation.png",
    width: 1448,
    height: 1086,
    copy: {
      fr: {
        title: "Le portfolio en situation.",
        alt: "Mockup de présentation du portfolio Dicode affiché sur un MacBook dans un décor sombre",
        caption: "Mockup de présentation généré. Les aperçus ordinateur et mobile ci-dessus utilisent l’interface réelle.",
      },
      en: {
        title: "The portfolio in context.",
        alt: "Presentation mockup of the Dicode portfolio on a MacBook in a dark setting",
        caption: "Generated presentation mockup. The desktop and mobile previews above use the actual interface.",
      },
    },
  },
};

export const gozemPresentationCaption: Record<Language, string> = {
  fr: "Mockup de présentation généré : accueil, services, pays, support et actualités. Les captures réelles figurent dans l’étude avant/après ; les chiffres illustrés ne sont pas vérifiés.",
  en: "Generated presentation mockup: homepage, services, countries, support and news. Actual captures appear in the before-and-after study; illustrated figures are not verified.",
};
