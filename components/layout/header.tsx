"use client";
// La barre de navigation : une "pilule" sombre avec le logo, les liens,
// le choix de langue et le bouton de prise de rendez-vous.
// Les styles sont dans app/styles/header.css
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const [open, setOpen] = useState(false); // menu mobile ouvert ou fermé
  const { language, setLanguage } = useLanguage();
  const en = language === "en";
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false); // la page a-t-elle défilé ?

  // La nav est transparente en haut de page, et prend un fond dès qu'on défile.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On referme le menu mobile quand on change de page.
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Pour ajouter un lien : ajoute une ligne ici.
  const links = [
    { href: "/", label: en ? "Home" : "Accueil" },
    { href: "/#projets", label: en ? "Projects" : "Projets" },
    { href: "/#services", label: "Services" },
    { href: "/articles", label: "Articles" },
    { href: "/#a-propos", label: en ? "About" : "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={scrolled || open ? "nav-wrap scrolled" : "nav-wrap"}>
      <div className="nav">
        <Link href="/" className="nav-logo" aria-label={en ? "Dicode, home" : "Dicode, accueil"}>
          <Logo className="nav-logo-svg" />
        </Link>

        <nav className="nav-links" aria-label={en ? "Main navigation" : "Navigation principale"}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={path === link.href ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <div className="nav-lang" role="group" aria-label={en ? "Website language" : "Langue du site"}>
            <button type="button" aria-pressed={!en} onClick={() => setLanguage("fr")}>
              FR
            </button>
            <button type="button" aria-pressed={en} onClick={() => setLanguage("en")}>
              EN
            </button>
          </div>
          <a href={site.booking} className="nav-cta">
            {en ? "Let’s talk" : "Parlons-en"}
          </a>
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? (en ? "Close menu" : "Fermer le menu") : en ? "Open menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menu affiché uniquement sur mobile, quand on clique sur le bouton */}
      {open && (
        <nav id="nav-mobile" className="nav-mobile" aria-label={en ? "Mobile navigation" : "Navigation mobile"}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href={site.booking}>{en ? "Book a call ↗" : "Réserver un appel ↗"}</a>
        </nav>
      )}
    </header>
  );
}
