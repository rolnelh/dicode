"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/lib/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const en = language === "en";
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  const links = [
    ["/#projets", en ? "Projects" : "Projets"],
    ["/#services", "Services"],
    ["/articles", "Articles"],
    ["/#a-propos", en ? "About" : "À propos"],
  ];
  return (
    <header
      className="header wrap refreshed-header"
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <Link
        href="/"
        className="wordmark"
        aria-label={en ? "Dicode, home" : "Dicode, accueil"}
      >
        Dicode<span>.</span>
      </Link>
      <nav
        className="desktop-nav"
        aria-label={en ? "Main navigation" : "Navigation principale"}
      >
        {links.map(([href, label]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <div
          className="language-switch"
          role="group"
          aria-label={en ? "Website language" : "Langue du site"}
        >
          <button
            type="button"
            lang="fr"
            aria-label="Français"
            aria-pressed={!en}
            onClick={() => setLanguage("fr")}
          >
            FR
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            lang="en"
            aria-label="English"
            aria-pressed={en}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
        <div className="header-contact">
          <a href={site.booking} className="button small">
            Book a call ↗
          </a>
          <span className="hand note">
            {en
              ? "Available for your project ⤴"
              : "Disponible pour votre projet ⤴"}
          </span>
        </div>
        <button
          ref={toggle}
          className="mobile-menu"
          type="button"
          aria-label={
            open
              ? en
                ? "Close menu"
                : "Fermer le menu"
              : en
                ? "Open menu"
                : "Ouvrir le menu"
          }
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label={en ? "Mobile navigation" : "Navigation mobile"}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {[...links, ["/contact", en ? "Contact me" : "Me contacter"]].map(
            ([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ),
          )}
          <a href={site.booking}>Book a call ↗</a>
        </nav>
      )}
    </header>
  );
}
