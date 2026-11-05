"use client";
// Le bouton « Télécharger mon ebook » : il ouvre une fenêtre qui présente
// le contenu de l'ebook, puis renvoie vers la page Chariow pour le télécharger.
// Les styles sont dans app/styles/about.css (classes .eb-…)
import { useRef } from "react";
import { BookOpen, Check, Download, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/lib/site";

export function EbookButton({ className = "" }: { className?: string }) {
  const { language } = useLanguage();
  const en = language === "en";
  const dialog = useRef<HTMLDialogElement>(null);

  // Ce que contient l'ebook.
  const contents = en
    ? [
        "10 ready-to-use prompts to go from idea to first page",
        "1 bonus prompt",
        "A 22-page PDF guide",
        "Real examples: my portfolio and the Québec Signature redesign",
      ]
    : [
        "10 prompts prêts à l’emploi pour passer de l’idée à la première page",
        "1 prompt bonus",
        "Un guide PDF de 22 pages",
        "Des exemples réels : mon portfolio et la refonte Québec Signature",
      ];

  return (
    <>
      <button type="button" className={`eb-trigger ${className}`} onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">
        <BookOpen size={17} /> {en ? "Download my ebook" : "Télécharger mon ebook"}
      </button>

      <dialog
        ref={dialog}
        className="eb-dialog"
        aria-labelledby="eb-title"
        // Un clic sur le fond (en dehors de la fenêtre) la referme.
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="eb-inner">
          <button type="button" className="eb-close" aria-label={en ? "Close" : "Fermer"} onClick={() => dialog.current?.close()}>
            <X size={20} />
          </button>

          <img
            className="eb-banner"
            src="/images/ebook/dicode-guide-banner.png"
            width={1404}
            height={520}
            alt={
              en
                ? "Dicode guide by Dieudonné Houndagnon: build your first website with AI"
                : "Guide Dicode de Dieudonné Houndagnon : crée ton premier site avec l’IA"
            }
            loading="lazy"
            decoding="async"
          />

          <p className="eb-kicker">{en ? "The Dicode guide · Ebook" : "Le guide Dicode · Ebook"}</p>
          <h2 id="eb-title">{en ? "Build your first website with AI" : "Crée ton premier site avec l’IA"}</h2>
          <p className="eb-text">
            {en
              ? "A practical guide to turn your idea into a first web page with AI, step by step."
              : "Un guide pratique pour transformer ton idée en une première page web avec l’IA, étape par étape."}
          </p>

          <h3>{en ? "What’s inside" : "Ce que tu trouveras dedans"}</h3>
          <ul className="eb-list">
            {contents.map((item) => (
              <li key={item}>
                <span aria-hidden="true">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a href={site.ebook} target="_blank" rel="noopener noreferrer" className="eb-download">
            <Download size={18} /> {en ? "Download the ebook" : "Télécharger l’ebook"}
          </a>
          <small className="eb-note">
            {en ? "French-language ebook · Available on Chariow" : "Ebook en français · Disponible sur Chariow"}
          </small>
        </div>
      </dialog>
    </>
  );
}
