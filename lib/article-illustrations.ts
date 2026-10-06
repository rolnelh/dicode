import type { Language } from '@/components/language-provider';
export type ArticleIllustrationData = {src: string; width: number; height: number; alt: Record<Language, string>};
/** Original editorial images, distinct from factual screenshots in the article. */
export const articleIllustrations: Record<string, ArticleIllustrationData> = {
 'checklist-qa-avant-mise-en-ligne': {src:'/images/article-qa.png',width:1536,height:1024,alt:{fr:'Illustration éditoriale du contrôle qualité web : fenêtre, checklist et loupe',en:'Editorial illustration of web quality assurance: browser, checklist and magnifier'}},
 'vibengo-tests-qa-produits-web': {src:'/images/article-vibengo.png',width:1536,height:1024,alt:{fr:'Illustration de tests sur ordinateur, tablette et mobile, accompagnés d’un rapport',en:'Illustration of tests across desktop, tablet and mobile with a report'}},
 'creation-web-ia-du-prototype-au-site-fiable': {src:'/images/article-ai.png',width:1536,height:1024,alt:{fr:'Illustration du passage de blocs de prototype à une interface web aboutie',en:'Illustration of prototype blocks becoming a polished web interface'}}
};
