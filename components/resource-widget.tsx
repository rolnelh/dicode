"use client";
import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  EBOOK_PROMPT_KEY,
  EBOOK_PROMPT_DELAY,
  isRecentEbookPrompt,
} from "@/lib/ebook-prompt";
import { BookOpen, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ContactWidget } from "@/components/contact/contact-widget";
import { site } from "@/lib/site";
export function ResourceWidget() {
  const { language } = useLanguage();
  const en = language === "en";
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const openedHere = useRef(false);
  const openGuide = useCallback(() => {
    if (!dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    openedHere.current = true;
    try {
      window.sessionStorage.setItem(EBOOK_PROMPT_KEY, String(Date.now()));
    } catch {
      /* The widget works without browser storage. */
    }
  }, []);
  useEffect(() => {
    // Never interrupt contact or project reading. Returning to home retains the cap.
    if (pathname !== "/" || openedHere.current) return;
    try {
      if (
        isRecentEbookPrompt(
          window.sessionStorage.getItem(EBOOK_PROMPT_KEY),
          Date.now(),
        )
      )
        return;
    } catch {
      /* Per-mount fallback remains available. */
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const tryOpen = () => {
      if (cancelled || openedHere.current) return;
      // Recheck immediately before opening: a manual opening can have happened meanwhile.
      try {
        if (
          isRecentEbookPrompt(
            window.sessionStorage.getItem(EBOOK_PROMPT_KEY),
            Date.now(),
          )
        )
          return;
      } catch {
        /* Use in-memory guard. */
      }
      const editing = document.activeElement?.matches(
        "input,textarea,select,[contenteditable]:not([contenteditable='false'])",
      );
      if (
        document.visibilityState !== "visible" ||
        editing ||
        document.querySelector("dialog[open],#mobile-navigation")
      ) {
        timer = setTimeout(tryOpen, 2_000);
        return;
      }
      openGuide();
    };
    timer = setTimeout(tryOpen, EBOOK_PROMPT_DELAY);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname, openGuide]);
  if (pathname.startsWith("/apercu-portfolio")) return null;
  return (
    <>
      <div className="floating-actions">
        <button
          type="button"
          className="ebook-trigger"
          aria-haspopup="dialog"
          aria-controls="ebook-dialog"
          onClick={openGuide}
        >
          <BookOpen size={19} />
          <span>{en ? "AI website guide" : "Un site avec l’IA ?"}</span>
        </button>
        <ContactWidget language={language} />
      </div>
      <dialog
        id="ebook-dialog"
        ref={dialog}
        className="ebook-dialog"
        aria-labelledby="ebook-title"
        aria-describedby="ebook-description"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              e.currentTarget.close();
          }
        }}
      >
        <button
          type="button"
          className="ebook-close"
          aria-label={en ? "Close the offer" : "Fermer l’offre"}
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <img
          className="ebook-banner"
          src="/images/ebook/dicode-guide-banner.png"
          width={1404}
          height={520}
          alt={
            en
              ? "Dicode guide by Dieudonné Houndagnon: build your first website with AI. 10 prompts and one bonus, 22-page PDF. Portfolio and Québec Signature redesign examples."
              : "Guide Dicode de Dieudonné Houndagnon : crée ton premier site avec l’IA. 10 prompts et un bonus, PDF de 22 pages. Exemples du portfolio et de la refonte Québec Signature."
          }
          loading="lazy"
          decoding="async"
        />
        <div className="ebook-copy">
          <div className="ebook-summary">
            <h2 id="ebook-title">
              {en ? "Build your first website with AI" : "Crée ton premier site avec l’IA"}
            </h2>
            <p id="ebook-description">
              {en
                ? "10 ready-to-use prompts and one bonus to turn your idea into a first page."
                : "10 prompts prêts à l’emploi et un bonus pour passer de ton idée à ta première page."}
            </p>
          </div>
          <div className="ebook-action">
            <a
              href={site.ebook}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              {en ? "Get the offer" : "Profiter de l’offre"}
            </a>
            <small>
              {en
                ? "French-language ebook · Details on Chariow"
                : "Ebook en français · Détails sur Chariow"}
            </small>
          </div>
        </div>
      </dialog>
    </>
  );
}
