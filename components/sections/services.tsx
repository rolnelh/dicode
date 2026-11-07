"use client";
// La section "Comment je travaille avec vous" : elle réunit le déroulé
// d'un projet (les 3 étapes sur une piste en dégradé) et les services.
// Les textes sont dans lib/localized-content.ts (services et process)
// et lib/content.ts (services en français).
// Les styles sont dans app/styles/services.css
import Link from "next/link";
import { Code2, Lightbulb, PenTool, Rocket, Wrench, Check, ArrowUpRight } from "lucide-react";
import { copy, getLocalizedServices } from "@/lib/localized-content";
import { useLanguage } from "@/components/language-provider";

export function Services() {
  const { language } = useLanguage();
  const text = copy[language].services;
  const steps = copy[language].process.steps;
  const services = getLocalizedServices(language);
  const stepIcons = [Lightbulb, PenTool, Rocket]; // une icône par étape
  const serviceIcons = [Code2, PenTool, Wrench]; // une icône par service

  return (
    <section id="services" className="wk section-anchor">
      <div className="wrap">
        <div className="wk-head">
          <h2>
            {text.title[0]} {text.title[1]}
          </h2>
          <p>
            {text.intro[0]} {text.intro[1]}
          </p>
        </div>

        {/* 1. La piste en dégradé, avec une pastille par étape */}
        <div className="wk-track" aria-hidden="true">
          {stepIcons.map((Icon, i) => (
            <span key={i} className={i === stepIcons.length - 1 ? "last" : ""}>
              <Icon size={24} strokeWidth={1.7} />
            </span>
          ))}
        </div>

        {/* 2. Les étapes, chacune sous sa pastille */}
        <ol className="wk-steps">
          {steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p className="wk-label">{step.label}</p>
              <ul className="wk-tags">
                {step.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p className="wk-text">{step.text}</p>
            </li>
          ))}
        </ol>

        {/* 3. Les services */}
        <div className="wk-offer">
          <h3>{text.offerTitle}</h3>
          <ul>
            {services.map((service, i) => {
              const Icon = serviceIcons[i];
              return (
                <li key={service.title}>
                  <span className="wk-offer-icon">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h4>{service.title}</h4>
                    <p>{service.text}</p>
                    <span className="wk-offer-tags">{service.tags}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="wk-footer">
          <span>
            <Check size={16} /> {text.scope}
          </span>
          <span>
            <Check size={16} /> {text.communication}
          </span>
          <Link href="/contact" className="wk-cta">
            {text.contact.replace(" ↗", "")} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
