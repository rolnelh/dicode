"use client";
// Maquette « défilement narratif » : chaque section a sa couleur et son animation.
// GSAP + ScrollTrigger pour les animations liées au défilement, Lenis pour la douceur.
// Si le visiteur a demandé moins d'animations (prefers-reduced-motion), tout s'affiche sans mouvement.
// Les styles sont dans app/maquette/maquette.css
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, MousePointer2, Search } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Logo } from "@/components/ui/logo";
import { BrandIcon } from "@/components/ui/brand-icon";
import { site } from "@/lib/site";

// --- Le titre, composé comme celui de la référence ---
// "light" = mots de liaison en gris clair ; "pill" = petite vignette d'interface dans la ligne.
type Word = { t: string; light?: boolean } | { obj: "cursor" | "code" };
const title: Word[] = [
  { t: "J’aide", light: true },
  { t: "les", light: true },
  { t: "startups" },
  { obj: "cursor" },
  { t: "et", light: true },
  { t: "entrepreneurs" },
  { t: "à", light: true },
  { t: "concevoir," },
  { t: "refondre" },
  { t: "et", light: true },
  { t: "faire", light: true },
  { t: "évoluer", light: true },
  { t: "leurs", light: true },
  { obj: "code" },
  { t: "produits" },
  { t: "numériques" },
];

// Les interfaces qui flottent autour du titre (parallaxe).
const floating = [
  { src: "/images/baobab-accueil.webp", w: 1333, h: 899, cls: "f1", speed: -60 },
  { src: "/images/hero/forma.webp", w: 1165, h: 883, cls: "f2", speed: -110 },
  { src: "/images/hero/milka.webp", w: 1280, h: 853, cls: "f3", speed: -140 },
  { src: "/images/hero/essor.webp", w: 1152, h: 800, cls: "f4", speed: -80 },
];

// Les projets qui défilent dans l'écran (section épinglée).
// "tall" = page entière, qui défile à l'intérieur de l'écran.
const screens: { slug: string; name: string; kind: string; src: string; w?: number; h?: number; tall?: boolean }[] = [
  { slug: "baobab", name: "Baobab", kind: "Site vitrine · Bandes dessinées", src: "/images/baobab-accueil.webp" },
  {
    slug: "fiacre-studio",
    name: "Fiacre Studio",
    kind: "Portfolio de photographe · Maquette & développement",
    src: "/images/fiacre/page-complete.webp",
    w: 538,
    h: 2581,
    tall: true,
  },
  { slug: "mefolio", name: "MeFolio", kind: "Plateforme créative", src: "/images/mefolio-dashboard.png" },
  { slug: "lexpo", name: "L’Expo", kind: "Galerie numérique · Artisans", src: "/images/lexpo-hero.jpg" },
  { slug: "gozem", name: "Gozem", kind: "Refonte indépendante", src: "/images/gozem-after-hero.jpg" },
  { slug: "quebec-signature", name: "Québec Signature", kind: "Refonte UI/UX", src: "/images/quebec-signature-hero.png" },
];

// La mosaïque finale (la case du milieu est l'écran qui rétrécit).
const mosaic = [
  "/images/baobab-mockup-4x3.webp",
  "/images/mefolio-tablette.webp",
  "/images/lexpo.png",
  "/images/gozem-sections-mosaic.png",
  null,
  "/images/dicode-macbook-presentation.png",
  "/images/baobab-app/parcours.webp",
  "/images/fiacre/carte.jpg",
  "/images/quebec-signature-hero.png",
];

const steps = [
  {
    n: "01",
    title: "On clarifie votre besoin",
    text: "Nous définissons vos objectifs, les fonctionnalités utiles, le budget et les délais.",
    tags: ["Objectifs", "Fonctionnalités", "Budget & délais"],
    icon: "/images/process/idee.png",
  },
  {
    n: "02",
    title: "Je conçois et développe",
    text: "Vous validez la direction visuelle, puis je développe votre site avec des points réguliers.",
    tags: ["Maquettes", "Design UI", "Développement"],
    icon: "/images/process/conception.png",
  },
  {
    n: "03",
    title: "On teste et on lance",
    text: "Nous vérifions les parcours sur ordinateur et mobile avant la mise en ligne et la prise en main.",
    tags: ["Tests mobile", "Mise en ligne", "Prise en main"],
    icon: "/images/process/lancement.png",
  },
];

export function Maquette() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("mq-static");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // Défilement doux, synchronisé avec ScrollTrigger.
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let removeGo = () => {};
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);

      // 1. Arrivée : les mots montent depuis un masque, ligne après ligne.
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(q(".mq-title .mq-w > span"), { yPercent: 110, duration: 1.2, stagger: 0.045 })
        .from(q(".mq-sub, .mq-hero-actions"), { y: 24, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.8")
        .from(q(".mq-float"), { opacity: 0, scale: 0.85, duration: 1.4, stagger: 0.08 }, "-=1.1")
        .from(q(".mq-cursor"), { opacity: 0, x: -30, y: 30, duration: 1, stagger: 0.2 }, "-=1");
      // Les curseurs se baladent doucement.
      gsap.to(q(".mq-cursor-a"), { x: 40, y: -24, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(q(".mq-cursor-b"), { x: -36, y: 20, duration: 2.7, ease: "sine.inOut", repeat: -1, yoyo: true });
      // Le bouton "Voir mes projets" fait défiler en douceur.
      const go = q('a[href="#mq-projets"]')[0];
      const onGo = (e: Event) => {
        e.preventDefault();
        lenis.scrollTo(q(".mq-projects")[0] as HTMLElement, { duration: 1.6 });
      };
      go?.addEventListener("click", onGo);
      removeGo = () => go?.removeEventListener("click", onGo);

      // 2. Le hero reste en place pendant que le rideau citron monte par-dessus.
      ScrollTrigger.create({
        trigger: q(".mq-hero")[0],
        start: "top top",
        endTrigger: q(".mq-manifesto")[0],
        end: "top top",
        pin: true,
        pinSpacing: false,
      });
      gsap.to(q(".mq-hero-inner"), {
        scale: 0.9,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: q(".mq-manifesto")[0], start: "top bottom", end: "top top", scrub: true },
      });
      // Les interfaces flottantes filent vers le haut, chacune à sa vitesse.
      q(".mq-float").forEach((f) => {
        gsap.to(f, {
          yPercent: Number(f.dataset.speed),
          rotate: Number(f.dataset.speed) / 12,
          ease: "none",
          scrollTrigger: { trigger: q(".mq-manifesto")[0], start: "top bottom", end: "top top", scrub: true },
        });
      });

      // 3. Le constat : la recherche ne trouve rien… puis votre site apparaît.
      const scene = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: q(".mq-manifesto")[0], start: "top top", end: "+=160%", scrub: 0.6, pin: true },
      });
      scene
        .fromTo(q(".mq-typed"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "steps(14)", duration: 1 })
        .fromTo(q(".mq-none"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 })
        .to(q(".mq-none"), { opacity: 0, y: -10, duration: 0.4 }, "+=0.4")
        .fromTo(q(".mq-site"), { opacity: 0, y: 60, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
        .fromTo(q(".mq-found"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
        .fromTo(q(".mq-chip"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, "<")
        .fromTo(q(".mq-cursor-scene"), { opacity: 0, x: 120, y: 120 }, { opacity: 1, x: 0, y: 0, duration: 0.8 }, "<0.2")
        .fromTo(q(".mq-man-note"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "<");

      // 4. Projets : les écrans défilent dans le petit cadre, puis tout recule dans une mosaïque.
      const device = q(".mq-device")[0];
      const center = q(".mq-tile-center")[0];
      const shots = q(".mq-screen");
      const box = q(".mq-names")[0];
      el.classList.add("mq-ready");
      const pj = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: q(".mq-projects")[0],
          start: "top top",
          end: `+=${(screens.length + 3) * 80}%`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      // Chaque projet entre par le bas ; une page entière défile ensuite dans l'écran.
      let t = 0;
      shots.forEach((shot, i) => {
        if (i > 0) {
          pj.to(shots[i - 1], { yPercent: -30, duration: 1 }, t)
            .fromTo(shot, { y: 0, yPercent: 100 }, { yPercent: 0, duration: 1 }, t)
            .to(q(".mq-names-track"), { y: () => -i * box.offsetHeight, duration: 1 }, t)
            .to(q(".mq-count-track"), { yPercent: (-100 * i) / screens.length, duration: 1 }, t);
          t += 1;
        }
        const tall = shot.querySelector<HTMLElement>(".mq-tall");
        if (tall) {
          pj.to(tall, { y: () => -(tall.offsetHeight - shot.offsetHeight), duration: 2.4, ease: "none" }, t + 0.1);
          t += 2.6;
        } else {
          t += 0.3;
        }
      });
      const end = t - 0.2;
      pj.to(q(".mq-pj-head, .mq-pj-caption"), { opacity: 0, duration: 0.4 }, end + 0.2)
        // L'écran et la case du milieu sont tous deux centrés : seule l'échelle change.
        .to(device, { scale: () => center.offsetWidth / device.offsetWidth, duration: 1.2 }, end + 0.2)
        .fromTo(
          q(".mq-tile:not(.mq-tile-center)"),
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.9, stagger: { each: 0.05, from: "center" } },
          end + 0.6,
        )
        .to(q(".mq-mosaic-label"), { opacity: 1, y: 0, duration: 0.5 }, end + 1.2);

      // 5. Méthode : le fond passe du noir au crème.
      gsap.fromTo(
        q(".mq-process")[0],
        { backgroundColor: "#141419", color: "#ffffff" },
        {
          backgroundColor: "#f4f4ef",
          color: "#141419",
          ease: "none",
          scrollTrigger: { trigger: q(".mq-process")[0], start: "top 80%", end: "top 20%", scrub: true },
        },
      );
      q(".mq-step").forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotate: 2,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });

      // 6. À propos : la photo se dévoile de bas en haut, les lignes montent.
      gsap.fromTo(
        q(".mq-photo")[0],
        { clipPath: "inset(100% 0% 0% 0% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: q(".mq-about")[0], start: "top 65%" },
        },
      );
      gsap.from(q(".mq-about .mq-w > span"), {
        yPercent: 110,
        stagger: 0.03,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".mq-about")[0], start: "top 65%" },
      });

      // 7. Fin : le rideau citron remonte et « Écrivez-moi » se forme lettre par lettre.
      gsap.from(q(".mq-final"), {
        yPercent: 12,
        borderTopLeftRadius: 120,
        borderTopRightRadius: 120,
        ease: "none",
        scrollTrigger: { trigger: q(".mq-final")[0], start: "top bottom", end: "top 30%", scrub: true },
      });
      gsap.from(q(".mq-big span"), {
        yPercent: 105,
        stagger: 0.04,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: q(".mq-big")[0], start: "top 85%" },
      });
    }, el);

    return () => {
      removeGo();
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={root} className="mq-root">
      {/* ===== 1. Hero ===== */}
      <section className="mq-hero">
        <nav className="mq-nav">
          <Logo className="mq-logo" />
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="mq-nav-cta">
            Écrivez-moi <ArrowUpRight size={16} />
          </a>
        </nav>

        {floating.map((f) => (
          <div key={f.src} className={`mq-float ${f.cls}`} data-speed={f.speed}>
            <Image src={f.src} alt="" width={f.w} height={f.h} sizes="22vw" priority />
          </div>
        ))}

        {/* Curseurs façon Figma : vous et moi, sur le même projet */}
        <span className="mq-cursor mq-cursor-a" aria-hidden="true">
          <MousePointer2 fill="currentColor" strokeWidth={1} />
          <em>Vous</em>
        </span>
        <span className="mq-cursor mq-cursor-b" aria-hidden="true">
          <MousePointer2 fill="currentColor" strokeWidth={1} />
          <em>Dieudonné</em>
        </span>

        <div className="mq-hero-inner">
          <h1 className="mq-title">
            {title.map((w, i) =>
              "obj" in w ? (
                <span key={i} className="mq-w mq-w-obj" aria-hidden="true">
                  {w.obj === "cursor" ? (
                    <span className="mq-obj mq-obj-cursor">
                      <MousePointer2 strokeWidth={1.6} />
                    </span>
                  ) : (
                    <span className="mq-obj mq-obj-code">
                      <Code2 strokeWidth={1.8} />
                    </span>
                  )}
                </span>
              ) : (
                <span key={i} className={w.light ? "mq-w mq-light" : "mq-w"}>
                  <span>{w.t}</span>
                </span>
              ),
            )}
          </h1>
          <p className="mq-sub">
            De la première maquette au produit en ligne : des interfaces claires, sur un code solide, prêt à évoluer.
          </p>
          <div className="mq-hero-actions">
            <a href="#mq-projets" className="mq-btn mq-btn-ink">
              Voir mes projets <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <p className="mq-scroll-hint">Faites défiler</p>
      </section>

      {/* ===== 2. Le constat, en illustration ===== */}
      <section className="mq-manifesto">
        <div className="mq-wrap mq-man-grid">
          <div className="mq-man-text">
            <p className="mq-kicker">Le constat</p>
            <h2 className="mq-h2">
              Sur Internet, <span className="mq-light">vous êtes</span> où&nbsp;?
            </h2>
            <p className="mq-man-note">Je crée le site qui vous rend visible.</p>
          </div>

          <div className="mq-scene" aria-hidden="true">
            <div className="mq-search">
              <Search size={18} />
              <span className="mq-typed">Votre activité</span>
              <i className="mq-caret" />
            </div>
            <p className="mq-none">Aucun résultat</p>
            <div className="mq-site">
              <div className="mq-bar">
                <span />
                <span />
                <span />
                <b>votre-activite.com</b>
              </div>
              <Image src="/images/baobab-accueil.webp" alt="" width={1333} height={899} sizes="420px" />
              <span className="mq-found">
                <Check size={14} strokeWidth={3} /> Trouvé
              </span>
            </div>
            <span className="mq-chip mq-chip-1">Clients</span>
            <span className="mq-chip mq-chip-2">Visibilité</span>
            <span className="mq-chip mq-chip-3">Confiance</span>
            <span className="mq-cursor mq-cursor-scene">
              <MousePointer2 fill="currentColor" strokeWidth={1} />
              <em>Vous</em>
            </span>
          </div>
        </div>
      </section>

      {/* ===== 3. Projets : petit écran au centre, puis mosaïque ===== */}
      <section className="mq-projects" id="mq-projets">
        <div className="mq-pj-head">
          <p className="mq-kicker mq-kicker-lime">Projets récents</p>
          <h2 className="mq-pj-title">
            Des interfaces <span className="mq-light">pensées pour</span> être utilisées
          </h2>
        </div>

        <div className="mq-mosaic">
          {mosaic.map((src, i) =>
            src ? (
              <div key={i} className="mq-tile">
                <Image src={src} alt="" width={900} height={600} sizes="30vw" />
              </div>
            ) : (
              <div key={i} className="mq-tile mq-tile-center" />
            ),
          )}
        </div>

        <div className="mq-device">
          <div className="mq-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mq-screens">
            {screens.map((s) => (
              <div key={s.slug} className="mq-screen">
                <Image
                  src={s.src}
                  alt={`${s.name} — ${s.kind}`}
                  width={s.w ?? 1400}
                  height={s.h ?? 875}
                  sizes="560px"
                  className={s.tall ? "mq-tall" : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mq-pj-caption">
          <div className="mq-names">
            <div className="mq-names-track">
              {screens.map((s) => (
                <Link key={s.slug} href={`/projets/${s.slug}`} className="mq-name">
                  <strong>{s.name}</strong>
                  <span>{s.kind}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mq-pj-nav" aria-hidden="true">
            <span>
              <ArrowLeft size={14} />
            </span>
            <span className="mq-count">
              <span className="mq-count-box">
                <span className="mq-count-track">
                  {screens.map((_, i) => (
                    <span key={i}>{String(i + 1).padStart(2, "0")}</span>
                  ))}
                </span>
              </span>
              / {String(screens.length).padStart(2, "0")}
            </span>
            <span>
              <ArrowRight size={14} />
            </span>
          </div>
        </div>

        <p className="mq-mosaic-label">
          Et d’autres projets, du site vitrine à l’application mobile. <Link href="/#projets">Tout voir ↗</Link>
        </p>
      </section>

      {/* ===== 4. Méthode : titre fixe à gauche, étapes qui défilent à droite ===== */}
      <section className="mq-process">
        <div className="mq-wrap mq-split">
          <div className="mq-sticky">
            <p className="mq-kicker">Méthode</p>
            <h2 className="mq-h2">
              Comment se passe <span className="mq-light">votre projet&nbsp;?</span>
            </h2>
            <p className="mq-sub">Trois étapes, avec des échanges à chaque moment clé.</p>
          </div>
          <ol className="mq-steps">
            {steps.map((s) => (
              <li key={s.n} className="mq-step">
                <div className="mq-step-top">
                  <span className="mq-step-n">{s.n}</span>
                  <Image src={s.icon} alt="" width={64} height={64} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== 5. À propos ===== */}
      <section className="mq-about">
        <div className="mq-wrap mq-about-grid">
          <div className="mq-photo">
            <Image src="/images/dieudonne-photo.webp" alt="Dieudonné Houndagnon" width={1239} height={1280} sizes="(max-width: 800px) 90vw, 520px" />
          </div>
          <div>
            <p className="mq-kicker">À propos</p>
            <h2 className="mq-h2">
              {"Développer votre produit,".split(" ").map((w, i) => (
                <span key={i} className="mq-w">
                  <span>{w}</span>
                </span>
              ))}{" "}
              {"comprendre votre activité.".split(" ").map((w, i) => (
                <span key={`b${i}`} className="mq-w mq-light">
                  <span>{w}</span>
                </span>
              ))}
            </h2>
            <p className="mq-about-text">
              Je suis Dieudonné Houndagnon, développeur Front-End et designer UI/UX basé à Cotonou. Je réalise des sites vitrines,
              des landing pages et des interfaces SaaS, principalement avec Next.js, React et Laravel.
            </p>
            <dl className="mq-facts">
              <div>
                <dt>Expérience</dt>
                <dd>3+ ans</dd>
              </div>
              <div>
                <dt>Travail</dt>
                <dd>À distance, partout</dd>
              </div>
              <div>
                <dt>Langues</dt>
                <dd>Français, anglais</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ===== 6. Fin : rideau citron ===== */}
      <section className="mq-final">
        <p className="mq-kicker">Un projet en tête ?</p>
        <h2 className="mq-big" aria-label="Écrivez-moi">
          {"Écrivez-moi".split("").map((c, i) => (
            <span key={i} aria-hidden="true">
              {c}
            </span>
          ))}
        </h2>
        <div className="mq-final-actions">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="mq-btn mq-btn-ink">
            <BrandIcon name="whatsapp" /> WhatsApp
          </a>
          <Link href="/contact" className="mq-btn mq-btn-line">
            Formulaire de contact <ArrowUpRight size={16} />
          </Link>
        </div>
        <footer className="mq-foot">
          <Logo className="mq-logo" />
          <span>© {new Date().getFullYear()} Dicode · Dieudonné Houndagnon</span>
        </footer>
      </section>
    </div>
  );
}
