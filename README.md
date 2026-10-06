# Dicode · Portfolio de Dieudonné Houndagnon

Next.js App Router, TypeScript strict, React et Tailwind CSS 4. Portfolio en français, responsive, inspiré des maquettes validées : lavande, noir, jaune pastel, annotations manuscrites et espaces généreux.

## Démarrage

Prérequis : Node.js 22.13 ou supérieur et npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Ouvrir http://localhost:3000. Sous Windows, copier `.env.example` en `.env.local` depuis l’explorateur ou avec `Copy-Item .env.example .env.local`.

```sh
npm run typecheck
npm run build
npm start
```

Les polices Poppins et Caveat sont téléchargées par `next/font` au build, puis servies localement. Le premier build nécessite un accès aux serveurs de polices Google. Aucun appel Google Fonts n’est fait par le navigateur des visiteurs.

## Structure

- `app/` : pages, métadonnées, styles globaux, sitemap et robots.
- `app/contact/` : page dédiée au contact.
- `app/projets/[slug]/` : fiches de projets pré-générées.
- `app/api/contact/` : envoi serveur facultatif via Resend.
- `components/layout/` : navigation responsive et footer.
- `components/sections/` : hero, projets, services, processus et présentation.
- `components/contact/` : formulaire et ses états.
- `components/ui/` : lien-bouton réutilisable et motifs décoratifs.
- `lib/content.ts` : projets, services et choix du formulaire.
- `lib/site.ts` : identité, liens sociaux, e-mail et domaine canonique.
- `public/images/` : visuels inclus.

## Personnaliser

Modifier `lib/site.ts` pour les coordonnées. Modifier `lib/content.ts` pour les projets et services. Les couleurs, espacements et styles responsive sont regroupés dans `app/globals.css`; les utilitaires Tailwind restent disponibles dans tous les composants. Les titres sont en graisse 500. La page est principalement rendue côté serveur ; seuls le menu et le formulaire sont des composants client.

Les images de portrait et MeFolio proviennent du portfolio fourni :

- https://dieudonne-dev.vercel.app/images/cmp.jpeg
- https://dieudonne-dev.vercel.app/images/mef.png

Le visuel Vidmake est un aperçu illustratif repris de la maquette validée, recadré à l’affichage avec CSS. La fiche le précise. Remplacer `project-board.png` par une vraie capture ou un mockup final indépendant avant une communication commerciale définitive ; adapter `ProjectImage` et retirer les règles `.concept-art .project-image` lorsque ce fichier est remplacé. Aucun témoignage, résultat commercial ou client fictif n’a été ajouté.

## Formulaire : deux modes

Sans `RESEND_API_KEY` et `CONTACT_FROM`, le formulaire prépare un e-mail dans la messagerie du visiteur. Il indique explicitement que rien n’est envoyé automatiquement.

Pour activer l’envoi réel :

1. Vérifier votre domaine auprès de Resend.
2. Renseigner `RESEND_API_KEY`, `CONTACT_FROM` (expéditeur sur ce domaine) et `CONTACT_TO` dans l’environnement serveur.
3. Refaire le build et déployer.
4. Envoyer un message de test et vérifier sa réception. Aucun e-mail réel n’a été envoyé pendant la création du ZIP.

La clé reste côté serveur. L’API valide les entrées, refuse les origines différentes, utilise un piège à robots et ne permet pas de choisir un destinataire arbitraire. Avant d’activer l’envoi sur un site public à fort trafic, ajouter une limitation distribuée des requêtes ou une règle WAF / un CAPTCHA. Le piège à robots et le contrôle d’origine ne suffisent pas contre un spammeur déterminé.

Référence API : https://resend.com/docs/api-reference/emails/send-email

## SEO et GEO

- Titres et descriptions propres à chaque page, URL canoniques et métadonnées Open Graph / Twitter.
- `/sitemap.xml` généré automatiquement par `app/sitemap.ts` à partir des routes et projets.
- `/robots.txt` généré automatiquement, avec lien vers le sitemap et exclusion de l’API.
- JSON-LD `Person` et `WebSite`, cohérents avec le contenu visible.
- HTML sémantique, langue française, hiérarchie de titres, textes alternatifs et pages de projets adressables.
- `/llms.txt` informatif pour expliciter l’identité, les services et les contenus.
- Localisation au Bénin mentionnée sans inventer d’adresse ni de fiche d’établissement.

GEO signifie ici faciliter la compréhension du contenu par les moteurs de réponse. Ni les données structurées ni `llms.txt` ne garantissent un classement ou une citation. Aucune note, statistique ou FAQ artificielle n’est utilisée.

Avant publication : renseigner `NEXT_PUBLIC_SITE_URL` avec le domaine réel, puis reconstruire. Le domaine par défaut est le portfolio existant. Ne pas laisser ce domaine si vous publiez ailleurs. Soumettre ensuite `/sitemap.xml` à Google Search Console et Bing Webmaster Tools. Protéger les environnements de prévisualisation contre l’indexation au niveau de l’hébergeur.

## Déploiement

Importer le dossier dans un dépôt Git, puis dans Vercel ou un hébergement compatible Next.js / Node.js. Commande de build : `npm run build`. Ne pas utiliser un hébergement statique seul : la route de contact peut nécessiter Node.js. Les dépendances et le dossier `.next` ne sont volontairement pas inclus dans le ZIP.

## Vérifications avant mise en production

- Vérifier la destination des liens projets et réseaux.
- Remplacer l’aperçu illustratif Vidmake par votre visuel final.
- Tester les parcours à 375, 768 et 1440 px ainsi que le zoom à 200 %.
- Tester l’envoi réel après configuration de Resend.
- Compléter les informations de confidentialité / mentions légales adaptées à votre activité avant publication commerciale.

Le site ne charge aucun traceur publicitaire ni outil d’analytics. Il ne stocke pas les messages dans une base de données.

## Mise à jour du 5 octobre 2026 — quatre projets

La galerie comprend Vidmake, MeFolio, L’Expo et Gozem. Les trois derniers projets sont repris du portfolio d’origine fourni, `https://dieudonne-dev.vercel.app/`. Les visuels ne sont pas des captures générées pour inventer de nouveaux projets : MeFolio était déjà inclus ; L’Expo (`/images/art.png`) et Gozem (`/images/zemgo.webp`) sont les visuels de présentation du portfolio source, conservés sans modification. Le visuel Vidmake existant et son statut illustratif sont préservés.

- L’Expo : galerie numérique d’artisans, lien fourni dans le portfolio vers `https://lexpo-gallery.vercel.app/`. Les chiffres présents dans sa maquette ne sont pas des résultats vérifiés.
- Gozem : concept de refonte indépendant, lien vers `https://rolnelh.github.io/gozem-refonte/`. Aucune commande client ou affiliation officielle revendiquée.
- Les quatre fiches ont leurs propres descriptions, textes alternatifs, dimensions de visuel et liens nommés. Le sitemap est généré depuis la même liste.
- La charte, les autres sections, le formulaire et le partage privé restent ceux de la version initiale.

## Itération présentation et FR/EN

- Hero recentré sur la valeur d’un développeur au-delà du code généré par l’IA ; monogramme D retiré. About réécrit sans inventer de résultats ou d’expérience.
- Navigation FR/EN fonctionnelle, partagée entre les pages. Préférence de langue locale au navigateur, sans service externe. Valeur initiale et métadonnées françaises conservées ; `document.lang` suit la langue active. Les routes françaises ne changent pas.
- Présentations de projets avec cadres, perspectives et ombres CSS inspirés des références fournies. Les pixels des visuels d’origine restent inchangés. Vidmake conserve provisoirement son visuel illustratif : une capture actuelle a été demandée pour éviter d’inventer son interface.
- « Book a call » renvoie au lien Google Calendar fourni dans le portfolio initial. Le widget ebook s’ouvre automatiquement après huit secondes sur l’accueil, en dehors des saisies, menus et dialogues actifs, et renvoie au produit Chariow existant, sans collecte d’email ni promesse de gratuité. Il ne réalise ni réservation ni achat.
- Logos de marques SVG Simple Icons, fichiers et licences locaux. Profils LinkedIn, Threads et Dribbble repris du portfolio initial. WhatsApp utilise le numéro de contact affiché au format international complet du Bénin. Le lien Substack est à renseigner dans `lib/site.ts` ; sans URL, son icône reste explicitement non cliquable.
- `npm run verify:localization` vérifie les traductions, la préférence de langue, le rendu initial, la validation et les états du formulaire avec simulations locales. Aucun email réel n’est envoyé par ces tests.

## Journal, modal et footer — itération suivante

Le positionnement du hero couvre la création de zéro, la refonte et la finalisation, avec ou sans IA. Le modal ebook ne se rouvre pas pendant la même navigation client ; sessionStorage évite un nouvel affichage sur un rechargement pendant 30 minutes. Une nouvelle session d’onglet ou un chargement après ce délai peut le reproposer. Aucune ouverture automatique sur Contact, Projets ou Articles ; un onglet caché et une saisie active reportent son ouverture. Le bouton manuel reste disponible.

Trois articles complets FR/EN sur QA, VibenGo et création web assistée par IA : `/articles` et fiches statiques avec métadonnées, Article JSON-LD, liens de source et sitemap. Il s’agit de guides/perspectives datés, pas de nouvelles inventées ni de promesses de classement. Les textes français sont rendus sur le serveur, la traduction anglaise est interactive sur les mêmes URL. L’aperçu Sites reste privé et non indexable ; aucune indexation publique n’est annoncée.

Le visuel VibenGo est une capture réelle de sa page publique française du 5 octobre 2026, placée dans un cadre CSS. Les cartes de résultat sont celles de sa démonstration publique, pas un audit lancé pour le portfolio. Son bouton vidéo affichait « Vidéo bientôt disponible » lors du contrôle ; aucun résultat client ni rapport privé n’a été récupéré.

Le footer reprend la composition de la référence : panneau clair arrondi, texture pointillée et tuiles de logos espacées. Les technologies reprises du portfolio source sont React, Next.js, TypeScript, Tailwind CSS, Laravel et GitHub. Ce sont des outils, pas des clients ni des certifications.


## Visuels de portfolio — 5 octobre 2026, soirée

- MeFolio utilise désormais la capture réelle du dashboard fournie dans la conversation : profil, statistiques et projets. Le cadre laptop CSS conserve la totalité de la capture, sans recadrage hérité de l’ancienne présentation.
- Déménagement Québec Signature regroupe les trois visuels fournis dans une seule réalisation : hero, équipements et footer. Il s’agit d’une proposition de refonte, sans revendication de commande client ou de site en production. Les deux vues secondaires sont accessibles en grand dans la fiche.
- Rynva doit remplacer temporairement Vidmake après réception d’une capture du dashboard. La page `https://rynva.app/dashboard` redirige vers une connexion dans le navigateur cloud ; aucune capture de la page de connexion n’est utilisée comme aperçu produit. Vidmake est conservé en attendant cette image.
- Les pixels sources sont conservés ; les effets de mockup sont rendus par CSS. Les nouveaux contenus sont traduits en FR/EN. L’URL Substack exacte reste à fournir.


## Illustrations du journal et contact

Les trois articles possèdent désormais une illustration éditoriale originale, utilisée dans les cartes du journal et en tête de fiche. Elles symbolisent la QA, les tests multi-appareils et le passage du prototype IA à un site fiable ; ce ne sont pas des captures de produits. La capture réelle VibenGo et sa légende de démonstration restent présentes séparément. Les illustrations sont déclarées dans `lib/article-illustrations.ts` et rendues par `ArticleIllustration`.

Le bouton WhatsApp porte le libellé « Me contacter / sur WhatsApp » (traduit en anglais). `components/contact/contact-widget.tsx` est le point de remplacement futur par un widget de chat. Aujourd’hui, c’est uniquement un lien vers le numéro existant, sans message automatique, collecte ou script tiers. Le widget ebook conserve son fonctionnement indépendant.


## Mockups par projet — 5 octobre 2026

- Rynva remplace temporairement Vidmake dans la galerie et possède la fiche `/projets/rynva`. La capture fournie est utilisée telle quelle ; le lien mène au dashboard authentifié. Aucun compte n’a été ouvert pour cette présentation.
- MeFolio adopte la première référence : grand panneau d’application frontal, angles arrondis, marge blanche et fond gris à formes douces. Il n’est plus présenté dans un ordinateur incliné.
- L’Expo adopte la troisième référence : deux panneaux de page superposés, fenêtre au premier plan et sections en arrière-plan. Les pixels proviennent d’une capture réelle du site public du 5 octobre 2026, 1165 × 5219, et non de l’ancienne maquette. Les affirmations du site source ne constituent pas des résultats vérifiés du portfolio.
- `DashboardMockup` et `LayeredPageMockup` séparent ces deux traitements ; les autres projets conservent leurs présentations.


## Rynva — capture complète fournie

La capture fournie avec le menu latéral déployé (1920 × 1688) remplace le précédent aperçu limité au haut du dashboard. La vignette conserve la totalité de l’image ; la fiche propose aussi une ouverture en grand. Les pixels sources, y compris le nom du compte, le compteur de crédits et les textes des projets, ne sont pas retouchés. La capture est fournie par l’utilisateur, pas obtenue après une connexion de l’assistant.


## Mockups photographiques — MeFolio et Québec Signature

Les deux présentations utilisent désormais des scènes d’ordinateurs portables : MeFolio sur un support en pierre dans un décor naturel, Québec Signature sur un bureau en bois près d’une fenêtre. Ces environnements sont des illustrations générées pour la présentation des projets, pas des photographies de leurs lieux réels.

Les captures des interfaces restent les fichiers originaux. `PhotographicMockup` les projette dans l’écran avec une homographie CSS calculée depuis quatre coins de référence (`lib/laptop-plates.ts`). L’ajustement responsive est assuré par ResizeObserver, avec nettoyage à la sortie du composant et solution de repli. L’image utilise `object-fit: contain` pour ne pas couper les interfaces. Aucun texte du projet n’est redessiné par l’IA. Rynva et L’Expo conservent leurs mockups précédents.


## Le portfolio dans ses propres réalisations

La réalisation « Dicode — Portfolio » ajoute une présentation ordinateur + téléphone, en tête de galerie. Il s’agit d’aperçus vivants : deux cadres chargent la route interne `/apercu-portfolio/`, avec les composants Header et Hero réels, aux largeurs 1280 et 390 pixels. Cette route ne contient aucune galerie et ne peut donc pas créer une boucle d’iframes. Elle n’apparaît pas dans le sitemap et possède une consigne noindex.

`PortfolioMockup` redimensionne les cadres avec ResizeObserver, charge les iframes paresseusement, les exclut de la navigation clavier et neutralise leurs clics. Les widgets de contact/ebook et animations sont désactivés dans l’aperçu ; le footer y est masqué. Aucun faux screenshot n’est généré. Les autres réalisations ne changent pas.


## Québec Signature — étude avant/après

La fiche compare maintenant le site public d’origine `https://demenagementquebecsignature.ca/` à la proposition de refonte fournie. Captures du 5 octobre 2026 : haut de page 1157 × 742, page complète 1288 × 1674. Les images s’ouvrent en grand et le site d’origine est lié explicitement.

Le composant `QuebecCaseStudy` explique en FR/EN les changements observables : hiérarchie, navigation supérieure, séparation des services et traitement visuel bleu/jaune plus léger. Le texte ne revendique ni livraison client, ni lancement de cette proposition, ni résultats de conversion mesurés. Le mockup sur ordinateur et les deux vues secondaires de la refonte restent présents.


## Gozem — captures de la vraie refonte et comparaison

La vignette Gozem utilise la capture réelle de `https://rolnelh.github.io/gozem-refonte/`, à la place de l’ancienne image de présentation. L’étude FR/EN compare cette version au site officiel `https://gozem.co/bj/fr/`. Les deux pages ont été consultées le 5 octobre 2026 ; les captures ne constituent pas une preuve de versions historiques.

Le composant partagé `RedesignCaseStudy` sert à Gozem et à Québec Signature. Chaque projet garde ses données, dimensions, liens et commentaires propres. Pour Gozem, les changements portent sur le hero téléphone/carte, les actions passager/conducteur, les repères de navigation, les services regroupés et les sections complémentaires.

Limites relevées sur les pages sources : fond du hero officiel rendu gris dans le navigateur, cause indéterminée ; deux images de la refonte ne chargent pas (illustration d’application et logo de footer) ; plusieurs actions restent des ancres. Aucun compte, téléchargement ou parcours financier n’a été engagé. Les chiffres/témoignages visibles ne sont pas validés et aucun résultat commercial n’est attribué à la refonte.

## Offre ebook — bannière unique

La modale affiche uniquement la bannière Dicode 1404 × 520 validée, conservée entière et sans recadrage. Le bouton « Profiter de l’offre » mène à la fiche Chariow existante. La version anglaise traduit les commandes et précise que le guide est en français. Le visuel, le titre lisible et le bouton passent sur une seule colonne sur téléphone ; la fenêtre reste défilable sur les écrans courts.

Le déclenchement après 8 secondes sur l’accueil, la limite de 30 minutes par session, l’ouverture manuelle, la fermeture native et l’exclusion de l’aperçu portfolio sont inchangés. Les tests `npm run verify:ebook` couvrent aussi le visuel unique, son format, le CTA, la traduction et l’aperçu exclu.

## Détails des projets et mockups — 6 octobre 2026

Les fiches des six réalisations partagent désormais un panneau de présentation : rôle, choix de conception, stack ou outils, typographies documentées et palette avec codes HEX. Les contenus FR/EN sont réunis dans `lib/project-craft.ts` et affichés par `ProjectCraft`.

- Le processus Dribbble / Framer → maquette Figma → améliorations avec l’IA concerne uniquement Québec Signature. Framer y est une source d’inspiration, pas la stack de la proposition.
- Les couleurs de Dicode proviennent du code. Celles de Gozem, MeFolio et L’Expo ont été relevées sur les pages publiques. Les palettes de Rynva et Québec Signature sont des échantillons indicatifs des captures fournies. Aucune police n’est déduite d’une simple image.
- La mosaïque MeFolio et le mockup MacBook Dicode sont ajoutés dans leurs fiches. Les cartes existantes de ces deux projets sont conservées.
- La mosaïque Gozem corrigée, comprenant un seul hero et différentes sections, remplace son aperçu principal en carte et en fiche. Les captures réelles et sources de l’étude avant/après demeurent intactes.
- Les trois nouveaux visuels sont des mockups de présentation générés. Ils sont affichés en entier, sans nouveau cadre d’appareil ni recadrage supplémentaire. Les textes visibles dans ces illustrations ne constituent pas une preuve de fonctionnalités ou de résultats mesurés.

Les fichiers originaux des captures sont conservés. Les textes alternatifs, légendes et détails sont disponibles en français et en anglais. Le fonctionnement de l’offre ebook à bannière unique reste inchangé.

Vérifications supplémentaires : `node scripts/verify-projects.mjs` après le build contrôle les six fiches et bloque toute publication de données de rôle ou de stack encore en attente. Le script reconnaît l’export statique `out/` et la sortie serveur `.next/server/app/`. Les contrôles `verify:localization` et `verify:mockups` couvrent les nouvelles sections et l’identité exacte des trois images validées.

Stack et périmètre confirmés par l’auteur : MeFolio est développé de A à Z avec Laravel, MySQL et Tailwind CSS ; la migration vers une architecture découplée est une évolution prévue, pas une architecture déjà livrée. L’Expo utilise React JS et Tailwind CSS avec une API Laravel. Rynva utilise Next.js, Tailwind CSS et Supabase. Ces précisions actuelles remplacent les anciennes indications contradictoires d’une fiche publique.

## Hero, services en relief et apprentissage avec l’IA — 6 octobre 2026

Le hero présente trois extraits des visuels existants de Québec Signature, L’Expo et MeFolio. Ces miniatures WebP conservent le contenu des images sources, sans nouvelle génération. Elles sont inclinées et atténuées sur les bords ; un dégradé blanc protège le centre du texte. Elles restent décoratives et non interactives, avec des alternatives vides et aucune iframe. Les trois fichiers pèsent moins de 60 Ko ensemble. Sous 1100 px, les cartes sont masquées et leurs sources sont remplacées par un pixel transparent. Le hero réutilisé dans l’aperçu du portfolio ne crée pas de récursion.

Les trois services prennent un relief CSS : surfaces épaisses, ombres et tuiles d’icônes en perspective. Le contenu et le lien de contact restent du HTML lisible, sans dépendance 3D, canvas, WebGL ni suivi de pointeur. Le survol est réservé aux écrans larges avec souris ; les cartes sont alignées sur une colonne sous 1000 px et la préférence de mouvement réduit neutralise les transformations.

Le troisième article devient « Développer et apprendre à l’ère de l’IA : ma démarche et les réflexes utiles », en français et en anglais. Il s’appuie sur le processus confirmé de Québec Signature et les stacks réelles de MeFolio, L’Expo et Rynva, puis propose des méthodes d’apprentissage et de vérification. Il ne prétend pas que l’auteur utilise quotidiennement un assistant IA précis. Les deux premiers articles et l’URL historique du troisième sont conservés. La date initiale reste le 5 octobre ; une mise à jour au 6 octobre est affichée et présente dans les métadonnées et le JSON-LD. Les sources MDN et GitHub ont été consultées pour les recommandations documentaires.

Contrôles dédiés : `node --test scripts/verify-hero-previews.cjs` et `node --test scripts/verify-services.cjs`, à lancer après le build. Les scripts reconnaissent l’export statique et la sortie serveur Next.js. Ils couvrent le rendu HTML, la décoration accessible, les variantes responsive et sans mouvement, la filiation des miniatures, leur budget de taille et les contenus FR/EN. Ils ne remplacent pas une vérification visuelle interactive.

## Galerie réelle L’Expo — 6 octobre 2026

La fiche L’Expo présente cinq vues réelles en grand : accueil, explorateur filtré « Mode & Lin », annuaire des artisans, aperçu du dashboard et formules d’abonnement. Les images gardent leurs proportions et disposent de légendes FR/EN, d’un lien d’ouverture en grand et d’un lien vers leur page source. L’accueil et l’annuaire disposent également d’une capture de page complète. Les onglets du dashboard et le filtre de l’explorateur ne sont pas encodés dans leur URL ; le lien source ouvre donc leur route commune.

- Données : `lib/lexpo-gallery.ts` ; composant réutilisable : `components/projects/project-gallery.tsx`.
- Images originales non retouchées : `public/images/lexpo/` ; provenance, dimensions et empreintes : `docs/lexpo-capture-provenance.json`.
- Contrôles supplémentaires : `node --test scripts/verify-project-gallery.cjs` après compilation.

Le dashboard a été consulté depuis le lien public du site, sans connexion. Les chiffres, prix, témoignages et illustrations restent ceux de la version source ; ils ne constituent pas des résultats commerciaux validés. Deux fiches produit consultées ont affiché une page blanche. La vue « Ma boutique », dont une image ne se chargeait pas, n’a pas été retenue. Aucun code du site L’Expo, compte, produit ou paiement n’a été modifié.
