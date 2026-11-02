"use client";
// La section "Ce que je peux faire pour vous" : une ligne verticale
// au centre, et chaque service placé une fois à droite, une fois à gauche.
// Les textes des services sont dans lib/content.ts (français)
// et lib/localized-content.ts (anglais).
// Les styles sont dans app/styles/services.css
import Link from "next/link";
import { Code2, PenTool, Wrench, Check } from "lucide-react";
import { copy, getLocalizedServices } from "@/lib/localized-content";
import { useLanguage } from "@/components/language-provider";

export function Services() {
  const { language } = useLanguage();
  const text = copy[language].services;
  const services = getLocalizedServices(language);
  const icons = [Code2, PenTool, Wrench]; // une icône par service, dans le même ordre

  return (
    <section id="services" className="services-v2 section-anchor">
      <div className="wrap">
        <div className="services-v2-head">
          <p className="services-v2-pill">
            <span className="dot" /> {text.eyebrow}
          </p>
          <h2>
            {text.title[0]} {text.title[1]}
          </h2>
          <p>
            {text.intro[0]} {text.intro[1]}
          </p>
        </div>

        <ol className="timeline">
          {services.map((service, i) => {
            const Icon = icons[i];
            const number = String(i + 1).padStart(2, "0"); // 1 -> "01"
            return (
              // Une ligne sur deux est inversée (texte à gauche) grâce à la classe "reverse".
              <li key={service.title} className={`timeline-row ${i % 2 === 1 ? "reverse" : ""} ${i === 0 ? "highlight" : ""}`}>
                <div className="timeline-side timeline-icon-side">
                  <span className="timeline-icon">
                    <Icon size={24} strokeWidth={1.6} />
                  </span>
                  <span className="timeline-number">{number}</span>
                </div>
                <span className="timeline-point" aria-hidden="true" />
                <div className="timeline-side timeline-text-side">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className="timeline-tags">{service.tags}</span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="services-v2-footer">
          <span>
            <Check size={16} /> {text.scope}
          </span>
          <span>
            <Check size={16} /> {text.communication}
          </span>
          <Link href="/contact" className="services-v2-cta">
            {text.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
