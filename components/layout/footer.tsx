"use client";
// Le pied de page : un seul bloc sombre, simple.
//   Ligne 1 : logo + phrase + bouton de rendez-vous
//   Ligne 2 : liens + réseaux sociaux
//   Ligne 3 : copyright + e-mail
// Les styles sont dans app/styles/footer.css
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { useLanguage } from "@/components/language-provider";
import { BrandIcon, type BrandName } from "@/components/ui/brand-icon";
import { Logo } from "@/components/ui/logo";

const socials: { name: BrandName; label: string; href: string }[] = [
  { name: "linkedin", label: "LinkedIn", href: site.linkedin },
  { name: "github", label: "GitHub", href: site.github },
  { name: "dribbble", label: "Dribbble", href: site.dribbble },
  { name: "threads", label: "Threads", href: site.threads },
];

export function Footer() {
  const { language } = useLanguage();
  const en = language === "en";

  const links = [
    { href: "/#projets", label: en ? "Projects" : "Projets" },
    { href: "/#services", label: "Services" },
    { href: "/articles", label: "Articles" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="ft wrap">
      <div className="ft-top">
        <div>
          <Link href="/" className="ft-logo" aria-label={en ? "Dicode, home" : "Dicode, accueil"}>
            <Logo strokeWidth={7} />
          </Link>
          <p>{en ? "A website to create, rethink or finish." : "Un site à créer, repenser ou finaliser."}</p>
        </div>
        <a href={site.booking} className="ft-button">
          {en ? "Book a call" : "Réserver un appel"} <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="ft-middle">
        <nav aria-label={en ? "Footer" : "Pied de page"}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href={site.ebook} target="_blank" rel="noopener noreferrer">
            {en ? "The ebook" : "L’ebook"}
          </a>
        </nav>
        <div className="ft-socials">
          {socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <BrandIcon name={s.name} />
            </a>
          ))}
        </div>
      </div>

      <div className="ft-bottom">
        <span>© {new Date().getFullYear()} Dicode · {site.person}</span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </footer>
  );
}
