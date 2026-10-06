"use client";
import Link from "next/link";
import { Code2, PenTool, Wrench, Check } from "lucide-react";
import { copy, getLocalizedServices } from "@/lib/localized-content";
import { useLanguage } from "@/components/language-provider";
import { Loop } from "@/components/ui/decorations";
export function Services() {
  const { language } = useLanguage();
  const text = copy[language].services;
  const services = getLocalizedServices(language);
  const icons = [Code2, PenTool, Wrench];
  return (
    <section id="services" className="services services-depth section-space section-anchor">
      <div className="wrap">
        <div className="center-heading">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>
            {text.title[0]}
            <br />
            {text.title[1]}
          </h2>
          <p>
            {text.intro[0]}
            <br />
            {text.intro[1]}
          </p>
        </div>
        <div className="services-grid">
          <Loop />
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <article
                key={s.title}
                className={`service-card ${s.tone} service-${i}`}
              >
                <div className="service-symbol" aria-hidden="true">
                  <span className="service-symbol-face">
                    <Icon size={32} strokeWidth={1.4} />
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="service-tags">{s.tags}</span>
              </article>
            );
          })}
          <div className="service-pills">
            <span>
              <Check size={17} /> {text.scope}
            </span>
            <span>
              <Check size={17} /> {text.communication}
            </span>
          </div>
        </div>
        <div className="text-center">
          <Link className="text-link" href="/contact">
            {text.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
