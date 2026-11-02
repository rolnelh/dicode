"use client";
// La section "Comment se passe votre projet ?" : les étapes côte à côte,
// une sur deux un peu plus bas, reliées par une ligne en pointillés.
// Les textes sont dans lib/localized-content.ts (process).
// Les styles sont dans app/styles/process.css
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import { copy } from "@/lib/localized-content";

// Une icône 3D par étape, dans le même ordre (fichiers dans public/images/process).
const icons = ["/images/process/idee.png", "/images/process/conception.png", "/images/process/lancement.png"];

export function Process() {
  const { language } = useLanguage();
  const text = copy[language].process;
  const lastIndex = text.steps.length - 1;

  return (
    <section className="process-v2">
      <div className="wrap">
        <div className="process-v2-head">
          <h2>
            {text.title[0]} {text.title[1]}
          </h2>
          <p>{text.intro}</p>
        </div>

        <ol className="process-steps">
          {text.steps.map((step, i) => {
            return (
              // Une étape sur deux reçoit la classe "low" pour descendre un peu.
              <li key={step.title} className={`process-step ${i % 2 === 1 ? "low" : ""}`}>
                <span className="process-icon">
                  <Image src={icons[i]} alt="" width={52} height={52} />
                  <small>0{i + 1}</small>
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>

                {/* La ligne en pointillés vers l'étape suivante (pas après la dernière) */}
                {i < lastIndex && (
                  <svg className={`process-line ${i % 2 === 1 ? "up" : ""}`} viewBox="0 0 200 60" aria-hidden="true">
                    <path d="M0 10 C 70 10, 130 50, 200 50" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
