export type ArticleSource = { label: string; url: string };
export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  sources?: ArticleSource[];
};
export type ArticleTranslation = {
  title: string;
  description: string;
  category: string;
  readingTime: string;
  intro: string;
  sections: ArticleSection[];
  conclusion: string;
  sources: ArticleSource[];
};
export type Article = {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  fr: ArticleTranslation;
  en: ArticleTranslation;
};

export const articles: Article[] = [
  {
    slug: "checklist-qa-avant-mise-en-ligne",
    publishedAt: "2026-10-05",
    author: "Dieudonné Houndagnon",
    fr: {
      title: "QA avant la mise en ligne : les vérifications qui comptent",
      description:
        "Une checklist QA concrète pour vérifier les parcours, formulaires, erreurs, usages mobiles et performances avant de publier un site ou une application.",
      category: "QA & tests",
      readingTime: "4 min",
      intro:
        "Un site peut être soigné et laisser passer un problème décisif : un formulaire qui ne transmet rien, une navigation inutilisable sur téléphone ou une confirmation affichée trop tôt. Avant la mise en ligne, une revue QA, c’est-à-dire une vérification de la qualité, aide à repérer ces écarts. Pour commencer, choisissez les actions essentielles à votre projet et testez-les jusqu’à leur résultat réel. Voici une méthode adaptée à un site vitrine ou à une première application.",
      sections: [
        {
          heading: "1. Définir les parcours à protéger",
          paragraphs: [
            "Listez trois à cinq parcours dont dépend l’utilité du site. Pour un portfolio, ce peut être découvrir une réalisation, comprendre une prestation et envoyer une demande. Pour une application, ajoutez l’inscription, la connexion et l’action principale du produit.",
            "Décrivez un résultat observable pour chacun : après l’envoi du formulaire, la demande apparaît dans la destination prévue et la personne voit une confirmation. Cette précision évite de valider seulement l’apparence du bouton. La documentation Playwright recommande justement de tester les comportements visibles par l’utilisateur.",
          ],
          sources: [
            {
              label: "Playwright : bonnes pratiques de test",
              url: "https://playwright.dev/docs/best-practices",
            },
          ],
        },
        {
          heading: "2. Essayer aussi les situations qui échouent",
          paragraphs: [
            "Réalisez chaque parcours avec des données de test, dans un environnement prévu pour cela. Essayez ensuite un champ obligatoire vide, une adresse e-mail invalide et une réponse serveur en échec. Vérifiez que le message explique le problème et que les informations déjà saisies restent disponibles lorsque c’est possible.",
            "Testez également un double clic sur l’envoi, un retour à la page précédente et un rafraîchissement. Une demande ne devrait pas être dupliquée sans raison. Une action encore en cours doit rester identifiable. Pour un paiement, utilisez exclusivement le mode de test du prestataire.",
          ],
        },
        {
          heading: "3. Vérifier le mobile et la navigation au clavier",
          paragraphs: [
            "Sur un écran étroit, contrôlez le menu, les boutons proches du bord et les formulaires lorsque le clavier virtuel s’ouvre. Essayez au moins un autre navigateur et, si possible, un téléphone réel. Notez les environnements effectivement testés pour rendre les limites de cette vérification explicites.",
            "Parcourez ensuite la page au clavier : l’élément actif doit être visible, les commandes accessibles et l’ordre cohérent. Contrôlez aussi les libellés des champs et l’agrandissement du texte. Le W3C propose ces premiers contrôles d’accessibilité tout en précisant qu’ils ne constituent pas une évaluation complète.",
          ],
          sources: [
            {
              label: "W3C WAI : premiers contrôles d’accessibilité",
              url: "https://www.w3.org/WAI/test-evaluate/preliminary/",
            },
          ],
        },
        {
          heading: "4. Mesurer et conserver des tests répétables",
          paragraphs: [
            "Observez le chargement, la réactivité et les déplacements du contenu. Les Core Web Vitals associent ces dimensions aux indicateurs LCP, INP et CLS. Un diagnostic en laboratoire aide avant publication ; les mesures auprès des utilisateurs complètent ensuite l’analyse.",
            "Gardez une courte liste de tests à relancer après chaque changement important. Automatisez progressivement les parcours les plus stables, avec des données maîtrisées. Après avoir modifié le menu, rejouez aussi l’accès au contact : une amélioration locale peut toucher un parcours voisin.",
          ],
          sources: [
            {
              label: "web.dev : comprendre les Web Vitals",
              url: "https://web.dev/articles/vitals",
            },
          ],
        },
        {
          heading: "5. Transformer chaque problème en action",
          paragraphs: [
            "Un signalement exploitable donne la page, les étapes, le résultat attendu, le résultat observé et le navigateur concerné. Ajoutez une capture sans données personnelles. Par exemple : « Sur mobile, ouvrir le menu puis Contact laisse le menu au-dessus du formulaire. »",
            "Classez les problèmes selon leur impact. Un parcours essentiel bloqué mérite une correction avant publication. Une différence d’espacement peut attendre si elle ne gêne pas l’usage. Après correction, rejouez le scénario et conservez la preuve du résultat.",
          ],
        },
      ],
      conclusion:
        "Avant de publier, rassemblez trois éléments : les parcours vérifiés, les problèmes encore ouverts et les limites connues du test. Cette trace donne une base concrète pour décider, corriger et vérifier à nouveau lors de la prochaine évolution.",
      sources: [
        {
          label: "Playwright : bonnes pratiques de test",
          url: "https://playwright.dev/docs/best-practices",
        },
        {
          label: "W3C WAI : premiers contrôles d’accessibilité",
          url: "https://www.w3.org/WAI/test-evaluate/preliminary/",
        },
        {
          label: "web.dev : comprendre les Web Vitals",
          url: "https://web.dev/articles/vitals",
        },
      ],
    },
    en: {
      title: "Pre-launch QA: the checks that matter",
      description:
        "A practical QA checklist for testing user journeys, forms, error handling, mobile use and performance before launching a website or application.",
      category: "QA & testing",
      readingTime: "4 min",
      intro:
        "A polished website can still hide a critical problem: a form that sends nothing, navigation that fails on a phone, or a confirmation shown too early. Before launch, a QA review, or quality check, helps uncover these gaps. Start by choosing the actions essential to your project and testing them through to their actual outcome. This approach works for a business website, a portfolio or an early-stage application.",
      sections: [
        {
          heading: "1. Define the journeys you need to protect",
          paragraphs: [
            "List three to five journeys that make the website useful. For a portfolio, these might be exploring a project, understanding a service and sending an enquiry. For an application, add registration, sign-in and the product’s main action.",
            "Describe an observable outcome for each one: after the form is submitted, the enquiry reaches its intended destination and the person sees a confirmation. This level of detail avoids checking only how the button looks. Playwright’s documentation likewise recommends testing user-visible behaviour.",
          ],
          sources: [
            {
              label: "Playwright: testing best practices",
              url: "https://playwright.dev/docs/best-practices",
            },
          ],
        },
        {
          heading: "2. Try the situations that go wrong",
          paragraphs: [
            "Complete each journey with test data in an appropriate test environment. Then try an empty required field, an invalid email address and a failed server response. Check that the message explains the problem and that previously entered information remains available where possible.",
            "Also test a double click on submit, going back to the previous page and refreshing. An enquiry should not be duplicated without a reason. An action still in progress should remain clearly identifiable. For payments, use the provider’s test mode exclusively.",
          ],
        },
        {
          heading: "3. Check mobile use and keyboard navigation",
          paragraphs: [
            "On a narrow screen, inspect the menu, buttons near the edge and forms when the on-screen keyboard opens. Try at least one additional browser and, if possible, a real phone. Record which environments you actually tested so the limits of the review are explicit.",
            "Then navigate the page with a keyboard: focus should be visible, controls reachable and the order logical. Check field labels and enlarged text too. The W3C includes these in its preliminary accessibility checks, while making clear that they do not amount to a complete assessment.",
          ],
          sources: [
            {
              label: "W3C WAI: preliminary accessibility checks",
              url: "https://www.w3.org/WAI/test-evaluate/preliminary/",
            },
          ],
        },
        {
          heading: "4. Measure and keep repeatable tests",
          paragraphs: [
            "Observe loading, responsiveness and content shifts. Core Web Vitals connect these dimensions to LCP, INP and CLS. Lab testing helps before release; measurements from real users subsequently add to the picture.",
            "Keep a short list of tests to repeat after significant changes. Gradually automate the most stable journeys using controlled test data. After changing the menu, check access to the contact page as well: a local improvement can affect a neighbouring journey.",
          ],
          sources: [
            {
              label: "web.dev: understanding Web Vitals",
              url: "https://web.dev/articles/vitals",
            },
          ],
        },
        {
          heading: "5. Turn each problem into an action",
          paragraphs: [
            "An actionable report includes the page, steps, expected outcome, observed outcome and affected browser. Add a screenshot without personal data. For example: “On mobile, opening the menu and selecting Contact leaves the menu covering the form.”",
            "Rank issues by their impact. A blocked essential journey deserves a fix before launch. A spacing difference can wait if it does not hinder use. After a fix, repeat the scenario and keep evidence of the outcome.",
          ],
        },
      ],
      conclusion:
        "Before publishing, gather three things: the journeys checked, the issues still open and the known limits of testing. This record provides a concrete basis for deciding, fixing and testing again when the product next changes.",
      sources: [
        {
          label: "Playwright: testing best practices",
          url: "https://playwright.dev/docs/best-practices",
        },
        {
          label: "W3C WAI: preliminary accessibility checks",
          url: "https://www.w3.org/WAI/test-evaluate/preliminary/",
        },
        {
          label: "web.dev: understanding Web Vitals",
          url: "https://web.dev/articles/vitals",
        },
      ],
    },
  },
  {
    slug: "vibengo-tests-qa-produits-web",
    publishedAt: "2026-10-05",
    author: "Dieudonné Houndagnon",
    fr: {
      title:
        "VibenGo : rendre les tests QA plus lisibles pour les créateurs web",
      description:
        "Présentation de VibenGo, de son approche des tests web par URL et d’une méthode pour passer d’un rapport de bugs à des corrections utiles au produit.",
      category: "Produit · VibenGo",
      readingTime: "4 min",
      intro:
        "Passer d’une interface à un produit utilisable demande de vérifier ce qui se passe entre les écrans. L’inscription aboutit-elle ? Le formulaire reste-t-il accessible sur mobile ? Le message d’erreur permet-il de continuer ? VibenGo se positionne sur ces questions de qualité. Je suis cofondateur du projet, en charge du marketing et de l’acquisition. Cette présentation porte sur son approche publique et sur la manière d’intégrer un rapport QA au travail produit.",
      sections: [
        {
          heading: "1. Le service présenté par VibenGo",
          paragraphs: [
            "Sur son site officiel, VibenGo présente un service de tests d’applications web à partir d’une URL, destiné notamment aux créateurs no-code et aux personnes qui construisent avec l’IA. Le parcours annoncé consiste à fournir l’adresse de l’application, lancer des vérifications et consulter un rapport.",
            "Le site décrit des problèmes accompagnés de captures, d’un contexte appareil ou navigateur et d’une explication, avec un classement par gravité. Cette description reprend la présentation de l’éditeur ; elle ne constitue pas une évaluation indépendante de la couverture des tests.",
          ],
          sources: [
            {
              label: "VibenGo : présentation officielle du service",
              url: "https://vibeango.com/",
            },
          ],
        },
        {
          heading: "2. Relier chaque anomalie à un usage",
          paragraphs: [
            "Pour une petite équipe, la première difficulté peut être de savoir quoi faire d’un problème détecté. Un bouton masqué n’a pas le même impact selon qu’il ferme une fenêtre secondaire ou termine l’inscription. Le contexte du parcours aide à choisir la prochaine action.",
            "Prenons un exemple hypothétique : une personne remplit une demande de démonstration sur téléphone, puis le clavier recouvre le bouton d’envoi. La page semble complète sur ordinateur, mais la demande reste bloquée dans ce cas précis. Décrire cette conséquence rend la correction plus facile à discuter entre produit, développement et marketing.",
          ],
        },
        {
          heading: "3. Préparer le périmètre avant le test",
          paragraphs: [
            "Avant d’utiliser un service QA externe, choisissez une version de test et des données fictives. Identifiez les écrans accessibles publiquement, les espaces nécessitant une connexion et les actions pouvant envoyer un message ou créer une commande. Confirmez les possibilités et les limites du service pour votre cas.",
            "Écrivez ensuite quelques scénarios attendus : consulter une offre, commencer une inscription, corriger une saisie et atteindre une confirmation. Cette préparation permet de comparer les résultats à un besoin précis. Un écran non parcouru ou un scénario non pris en charge reste à vérifier par une autre méthode.",
          ],
        },
        {
          heading: "4. Passer du rapport à une correction vérifiée",
          paragraphs: [
            "Pour chaque anomalie pertinente, essayez d’abord de reproduire le comportement dans le même contexte. Conservez l’URL, les étapes et l’écart entre résultat attendu et résultat observé. Si le problème n’est pas reproductible, notez cette incertitude avant de lancer une correction.",
            "Attribuez ensuite une priorité selon l’effet sur l’utilisateur, puis une personne responsable de la résolution. Une fois le changement livré, rejouez le scénario initial et un parcours voisin. Le suivi peut tenir dans une liste simple : à confirmer, à corriger, à retester, vérifié. L’important est de garder le lien entre observation et résultat.",
          ],
        },
        {
          heading: "5. Faire dialoguer acquisition et qualité produit",
          paragraphs: [
            "Une campagne conduit vers une expérience précise : une page d’arrivée, une proposition compréhensible et une action attendue. Préparer cette expérience inclut la vérification du parcours qui suit le clic. Une page de présentation peut ainsi être relue avec le même soin que le formulaire auquel elle mène.",
            "Si les demandes diminuent, examinez plusieurs hypothèses : trafic, message, mesure et fonctionnement technique. Un rapport QA peut aider à explorer cette dernière piste. Pour attribuer une amélioration à une correction, il faut des observations complémentaires et un suivi cohérent ; le nombre de bugs signalés ne suffit pas.",
          ],
        },
      ],
      conclusion:
        "L’intérêt d’une démarche comme celle proposée par VibenGo se juge aussi dans la suite donnée aux observations : comprendre, prioriser, corriger et vérifier. Commencez par un parcours essentiel et documentez ce qui a réellement été contrôlé. Cette discipline rend les échanges produit plus concrets.",
      sources: [
        {
          label: "VibenGo : présentation officielle du service",
          url: "https://vibeango.com/",
        },
      ],
    },
    en: {
      title: "VibenGo: making QA findings clearer for web creators",
      description:
        "An introduction to VibenGo, its URL-based approach to web testing, and a practical method for turning bug reports into useful product improvements.",
      category: "Product · VibenGo",
      readingTime: "4 min",
      intro:
        "Turning an interface into a usable product requires checking what happens between screens. Does registration complete? Is the form still accessible on mobile? Does the error message help someone continue? VibenGo positions itself around these quality questions. I am a cofounder of the project, responsible for marketing and acquisition. This introduction covers its publicly described approach and how a QA report can fit into product work.",
      sections: [
        {
          heading: "1. The service VibenGo describes",
          paragraphs: [
            "On its official website, VibenGo presents a URL-based web application testing service, aimed in particular at no-code creators and people building with AI. The advertised journey is to provide the application’s address, run checks and review a report.",
            "The website describes issues accompanied by screenshots, device or browser context and an explanation, ranked by severity. This description reflects the provider’s presentation; it is not an independent evaluation of test coverage.",
          ],
          sources: [
            {
              label: "VibenGo: official service overview",
              url: "https://vibeango.com/",
            },
          ],
        },
        {
          heading: "2. Connect each issue to a user journey",
          paragraphs: [
            "For a small team, the first challenge may be deciding what to do with a detected issue. A hidden button has a different impact depending on whether it closes a secondary window or completes registration. The journey’s context helps determine the next action.",
            "Consider a hypothetical example: someone fills in a demo request on their phone, then the keyboard covers the submit button. The page looks complete on desktop, but the request is blocked in this specific situation. Describing that consequence makes the fix easier to discuss across product, development and marketing.",
          ],
        },
        {
          heading: "3. Define the scope before testing",
          paragraphs: [
            "Before using an external QA service, choose a test version and fictional data. Identify publicly accessible screens, areas that require sign-in and actions that could send a message or create an order. Confirm the service’s capabilities and limitations for your particular case.",
            "Then write a few expected scenarios: viewing an offer, starting registration, correcting an input and reaching a confirmation. This preparation lets you compare the results with a specific need. A screen that was not visited or an unsupported scenario still needs checking through another method.",
          ],
        },
        {
          heading: "4. Turn a report into a verified fix",
          paragraphs: [
            "For each relevant issue, first try to reproduce the behaviour in the same context. Keep the URL, the steps and the difference between expected and observed outcomes. If the problem cannot be reproduced, record that uncertainty before starting a fix.",
            "Then assign a priority based on the effect on the user and someone responsible for resolving it. Once the change is delivered, repeat the original scenario and a neighbouring journey. Tracking can stay simple: needs confirmation, needs fixing, needs retesting, verified. What matters is keeping a connection between the observation and the result.",
          ],
        },
        {
          heading: "5. Connect acquisition with product quality",
          paragraphs: [
            "A campaign leads to a specific experience: a landing page, a clear proposition and an intended action. Preparing that experience includes checking the journey after the click. A presentation page can therefore be reviewed as carefully as the form it leads to.",
            "If enquiries decline, examine several possibilities: traffic, messaging, measurement and technical functionality. A QA report can help investigate that last possibility. Attributing an improvement to a fix requires additional observations and consistent measurement; the number of reported bugs alone is insufficient.",
          ],
        },
      ],
      conclusion:
        "The value of an approach like VibenGo’s also depends on what happens after an observation: understanding, prioritising, fixing and verifying. Start with one essential journey and document what was actually checked. That discipline makes product discussions more concrete.",
      sources: [
        {
          label: "VibenGo: official service overview",
          url: "https://vibeango.com/",
        },
      ],
    },
  },
  {
    "slug": "creation-web-ia-du-prototype-au-site-fiable",
    "publishedAt": "2026-10-05",
    "updatedAt": "2026-10-06",
    "author": "Dieudonné Houndagnon",
    "fr": {
      "title": "Développer et apprendre à l’ère de l’IA : ma démarche et les réflexes utiles",
      "description": "De l’inspiration à Figma, du code à sa compréhension : ma démarche de création web et des réflexes concrets pour progresser avec l’IA.",
      "category": "Ma démarche · IA & apprentissage",
      "readingTime": "5 min",
      "intro": "Mon objectif avec l’IA est de développer des sites plus aboutis tout en continuant à apprendre. Une interface qui prend forme rapidement offre un bon point de départ : elle donne quelque chose à observer, à questionner et à améliorer. Dans cet article, je pars d’un exemple de mon portfolio, la refonte Québec Signature, puis je propose des réflexes pour relier design, développement et compréhension du code.",
      "sections": [
        {
          "heading": "1. Donner une direction au projet avant de générer",
          "paragraphs": [
            "Pour ma proposition Québec Signature, j’ai commencé par chercher des inspirations sur Dribbble et Framer, puis construit une maquette dans Figma avant de l’améliorer avec l’IA. Framer servait ici de source d’inspiration. Ce parcours m’a permis de partir d’une direction visuelle avant d’aller plus loin dans la proposition.",
            "Le point de départ reste le besoin : que doit comprendre la personne qui arrive sur la page, et quelle action doit-elle pouvoir faire ? Pour une refonte, comparer la version de départ et la proposition aide à parler de choix précis : ordre des informations, navigation, services et prise de contact. C’est sur ces décisions que l’IA peut ensuite apporter des pistes."
          ]
        },
        {
          "heading": "2. Choisir les outils selon leur rôle",
          "paragraphs": [
            "Dans mes projets, les outils répondent à des besoins différents. Figma sert à préparer la maquette. MeFolio repose sur Laravel, MySQL et Tailwind CSS ; L’Expo associe React JS et Tailwind CSS à une API Laravel ; Rynva utilise Next.js, Tailwind CSS et Supabase. Ces exemples montrent qu’il n’y a pas une seule combinaison à appliquer à tous les sites.",
            "Pour l’IA, une distinction utile consiste à séparer la discussion et l’action dans le code. Un assistant conversationnel peut aider à reformuler un besoin ou une explication. Un assistant intégré au projet peut proposer des modifications. Dans les deux cas, mieux vaut lui donner un périmètre clair, les contraintes existantes et le résultat attendu, puis examiner sa proposition avant de la garder."
          ]
        },
        {
          "heading": "3. Transformer une demande vague en petite étape vérifiable",
          "paragraphs": [
            "Une demande comme « améliore cette page » laisse beaucoup de place à l’interprétation. Une consigne plus utile serait : « Rends ce formulaire utilisable sur téléphone, conserve les champs existants et explique les modifications. Prévois aussi le cas où l’envoi échoue. » Le résultat est plus facile à relire parce que l’objectif et les limites sont explicites.",
            "Pour avancer sans perdre le fil, je recommande de traiter un composant ou un parcours à la fois. Regarder les fichiers modifiés, comparer le résultat au besoin et conserver une version fonctionnelle donne un cadre aux itérations. Si la proposition change davantage que prévu, il est préférable de réduire le changement avant d’ajouter une autre fonctionnalité."
          ]
        },
        {
          "heading": "4. Apprendre vite en faisant travailler sa compréhension",
          "paragraphs": [
            "Un résultat généré devient plus utile pour apprendre quand on sait poser des questions précises : que reçoit cette fonction ? Que renvoie-t-elle ? Où la donnée change-t-elle ? Pourquoi cet état est-il nécessaire ? Demander une explication avec un petit exemple permet de cibler le point qui bloque, au lieu d’accumuler du code sans repère.",
            "Un exercice simple consiste ensuite à fermer la réponse, expliquer le mécanisme avec ses propres mots et refaire une petite partie sans assistance. Puis changer une contrainte : ajouter un champ, gérer une liste vide ou modifier la règle de validation. Pouvoir prévoir ce qui va changer et retrouver la bonne partie du code donne un repère concret de compréhension.",
            "La documentation garde une place essentielle pour vérifier une syntaxe, une option ou le comportement d’une API. Les modules d’apprentissage de MDN offrent notamment une base pour reprendre les fondamentaux du web. L’idée est de faire des allers-retours entre une question réelle, une explication et un essai personnel."
          ],
          "sources": [
            {
              "label": "MDN : les bases pour apprendre le développement web",
              "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started"
            }
          ]
        },
        {
          "heading": "5. Vérifier le site et ce qu’on sait en expliquer",
          "paragraphs": [
            "La documentation de GitHub rappelle que les résultats proposés par ses agents doivent être revus et validés. Pour un site, un premier contrôle consiste à suivre le parcours attendu, puis à provoquer les cas moins favorables : saisie invalide, données absentes, réponse en erreur et double clic. Sur mobile, il faut aussi regarder les débordements, le menu et les champs quand le clavier s’ouvre.",
            "Une vérification utile associe le comportement et son explication. Si un formulaire refuse une adresse incorrecte, peut-on montrer où cette règle est définie ? Si un bouton attend une réponse, sait-on ce qui réactive l’interface après une erreur ? Compléter ces essais par la navigation au clavier et des tests automatisés adaptés permet de garder des points de contrôle réutilisables.",
            "Il faut enfin distinguer ce qui a été testé de ce qui reste à vérifier. Un build réussi confirme une étape technique ; il ne prouve pas, à lui seul, qu’un message arrive à destination ou que le parcours fonctionne sur un téléphone réel. Cette distinction aide à préparer la suite du travail."
          ],
          "sources": [
            {
              "label": "GitHub : usage responsable des agents Copilot",
              "url": "https://docs.github.com/en/copilot/responsible-use/agents"
            }
          ]
        }
      ],
      "conclusion": "La démarche que je veux défendre est simple : partir d’une idée claire, lui donner une forme, utiliser l’IA pour explorer et avancer, puis prendre le temps de comprendre et de vérifier. Apprendre plus vite, c’est pouvoir réutiliser ce qu’on vient de découvrir sur le problème suivant. C’est cette autonomie que je cherche à développer en même temps que mes sites.",
      "sources": [
        {
          "label": "MDN : les bases pour apprendre le développement web",
          "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started"
        },
        {
          "label": "GitHub : usage responsable des agents Copilot",
          "url": "https://docs.github.com/en/copilot/responsible-use/agents"
        }
      ]
    },
    "en": {
      "title": "Building and learning in the age of AI: my approach and useful habits",
      "description": "From inspiration to Figma, from code to understanding: my approach to web creation and practical ways to keep learning with AI.",
      "category": "My approach · AI & learning",
      "readingTime": "5 min",
      "intro": "My goal with AI is to build more considered websites while continuing to learn. An interface that takes shape quickly provides a useful starting point: something to observe, question and improve. In this article, I start with a project from my portfolio, the Québec Signature redesign, then suggest practical ways to connect design, development and an understanding of the code.",
      "sections": [
        {
          "heading": "1. Give the project a direction before generating",
          "paragraphs": [
            "For my Québec Signature proposal, I started by looking for inspiration on Dribbble and Framer, then created a mockup in Figma before improving it with AI. Framer was a source of inspiration in this process. This gave the proposal a visual direction before taking it further.",
            "The starting point remains the need: what should someone understand when they land on the page, and what should they be able to do? For a redesign, comparing the original and the proposal makes it easier to discuss specific choices: information order, navigation, services and contact. AI can then contribute ideas around these decisions."
          ]
        },
        {
          "heading": "2. Choose tools for their role",
          "paragraphs": [
            "The tools in my projects serve different needs. Figma helps prepare the mockup. MeFolio uses Laravel, MySQL and Tailwind CSS; L’Expo combines React JS and Tailwind CSS with a Laravel API; Rynva uses Next.js, Tailwind CSS and Supabase. These examples show that one combination does not have to fit every website.",
            "For AI, it helps to distinguish discussion from actions in the code. A conversational assistant can help clarify a requirement or an explanation. An assistant integrated into a project can propose changes. In either case, give it a clear scope, the existing constraints and the expected result, then examine the proposal before keeping it."
          ]
        },
        {
          "heading": "3. Turn a vague request into a small, verifiable step",
          "paragraphs": [
            "A request such as “improve this page” leaves plenty of room for interpretation. A more useful instruction would be: “Make this form usable on a phone, keep the existing fields and explain the changes. Include the case where submission fails.” The result is easier to review because the goal and limits are explicit.",
            "To keep track of progress, I recommend working on one component or journey at a time. Reviewing the changed files, comparing the result with the need and keeping a working version gives each iteration a clear frame. If a proposal changes more than expected, reduce its scope before adding another feature."
          ]
        },
        {
          "heading": "4. Learn faster by testing your understanding",
          "paragraphs": [
            "Generated work becomes more useful for learning when you can ask precise questions: what does this function receive? What does it return? Where does the data change? Why is this state needed? Asking for an explanation with a small example helps target the confusing part instead of collecting code without a clear model.",
            "One simple exercise is to close the answer, explain the mechanism in your own words and recreate a small part without assistance. Then change a constraint: add a field, handle an empty list or adjust a validation rule. Being able to predict what will change and locate the relevant code provides a concrete check of understanding.",
            "Documentation remains important for checking syntax, an option or an API’s behaviour. MDN’s learning modules offer a starting point for revisiting web fundamentals. The aim is to move between a real question, an explanation and an experiment of your own."
          ],
          "sources": [
            {
              "label": "MDN: getting started with web development",
              "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started"
            }
          ]
        },
        {
          "heading": "5. Check the website and what you can explain",
          "paragraphs": [
            "GitHub’s documentation notes that the outputs of its agents need to be reviewed and validated. For a website, start by following the intended journey, then try less favourable cases: invalid input, missing data, an error response and a double click. On mobile, also check overflow, the menu and fields when the keyboard opens.",
            "A useful check connects behaviour to its explanation. If a form rejects an incorrect address, can you point to where that rule is defined? If a button waits for a response, do you know what restores the interface after an error? Keyboard navigation and appropriate automated tests add checkpoints that can be reused.",
            "Finally, distinguish what was tested from what still needs checking. A successful build confirms one technical step; on its own, it does not prove that a message reaches its destination or that a journey works on a real phone. Keeping that distinction clear helps prepare the next stage."
          ],
          "sources": [
            {
              "label": "GitHub: responsible use of Copilot agents",
              "url": "https://docs.github.com/en/copilot/responsible-use/agents"
            }
          ]
        }
      ],
      "conclusion": "The approach I want to advocate is straightforward: start with a clear idea, give it a shape, use AI to explore and move forward, then take time to understand and verify. Learning faster means being able to reuse what you have just discovered on the next problem. That is the independence I aim to develop alongside my websites.",
      "sources": [
        {
          "label": "MDN: getting started with web development",
          "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started"
        },
        {
          "label": "GitHub: responsible use of Copilot agents",
          "url": "https://docs.github.com/en/copilot/responsible-use/agents"
        }
      ]
    }
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
