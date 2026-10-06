"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/language-provider";
import { BrandIcon, type BrandName } from "@/components/ui/brand-icon";
export function Footer() {
  const { language } = useLanguage();
  const en = language === "en";
  const socials: { name: string; icon: BrandName; url: string | null }[] = [
    { name: "LinkedIn", icon: "linkedin", url: site.linkedin },
    { name: "Threads", icon: "threads", url: site.threads },
    { name: "Substack", icon: "substack", url: site.substack },
    { name: "Dribbble", icon: "dribbble", url: site.dribbble },
    { name: "GitHub", icon: "github", url: site.github },
  ];
  return (
    <footer className="footer footer-studio wrap">
      <div className="footer-studio-top">
        <div>
          <Link href="/" className="wordmark">
            Dicode<span>.</span>
          </Link>
          <h2>
            {en ? "An idea to build." : "Une idée à créer."}
            <br />
            <em>
              {en
                ? "A product to take further."
                : "Un produit à faire grandir."}
            </em>
          </h2>
          <a href={site.booking} className="button small">
            Book a call <ArrowUpRight size={18} />
          </a>
        </div>
        <nav
          className="footer-studio-nav"
          aria-label={en ? "Explore Dicode" : "Explorer Dicode"}
        >
          <Link href="/#a-propos">↗ {en ? "About" : "À propos"}</Link>
          <Link href="/#projets">↗ {en ? "Projects" : "Projets"}</Link>
          <Link href="/#services">↗ Services</Link>
          <Link href="/articles">↗ Articles</Link>
          <Link href="/contact">↗ Contact</Link>
          <a href={site.ebook} target="_blank" rel="noopener noreferrer">
            ↗ {en ? "The ebook" : "L’ebook"}
          </a>
        </nav>
      </div>
      <div
        className="footer-stack"
        aria-label={
          en
            ? "Technologies I work with"
            : "Les technologies avec lesquelles je travaille"
        }
      >
        <p className="eyebrow">
          {en ? "IN MY TOOLKIT" : "DANS MA BOÎTE À OUTILS"}
        </p>
        <ul className="stack-scene">
          {[
            ["react", "React"],
            ["nextdotjs", "Next.js"],
            ["typescript", "TypeScript"],
            ["tailwindcss", "Tailwind CSS"],
            ["laravel", "Laravel"],
            ["github", "GitHub"],
          ].map(([slug, name]) => (
            <li className={`stack-tile stack-${slug}`} key={slug}>
              <Image src={`/icons/${slug}.svg`} alt="" width={42} height={42} />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-contact-row">
        <div>
          <a href={`mailto:${site.email}`} className="footer-email">
            {en ? "Let’s talk" : "Échangeons"} <ArrowUpRight size={22} />
          </a>
          <p>
            {en
              ? "A website to create, rethink or finish."
              : "Un site à créer, repenser ou finaliser."}
          </p>
          <Link href="/contact" className="text-link">
            {en ? "Prefer to write?" : "Vous préférez écrire ?"} ↗
          </Link>
        </div>
        <div className="socials">
          {socials.map((s) =>
            s.url ? (
              <a
                key={s.icon}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.name} · Dieudonné`}
                title={s.name}
              >
                <BrandIcon name={s.icon} />
              </a>
            ) : (
              <span
                className="social-pending"
                key={s.icon}
                role="img"
                aria-label={
                  en
                    ? "Substack · link coming soon"
                    : "Substack · lien à renseigner"
                }
                title={
                  en
                    ? "Substack link coming soon"
                    : "Lien Substack à renseigner"
                }
              >
                <BrandIcon name={s.icon} />
              </span>
            ),
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <nav aria-label={en ? "Footer" : "Pied de page"}>
          <Link href="/#services">Services</Link>
          <Link href="/#projets">{en ? "Projects" : "Projets"}</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link href="/" className="wordmark">
          Dicode.
        </Link>
        <span>© {new Date().getFullYear()} Dicode</span>
      </div>
    </footer>
  );
}
